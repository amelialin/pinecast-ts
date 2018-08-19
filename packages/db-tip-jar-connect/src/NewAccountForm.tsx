import * as React from 'react';

import Button from '@pinecast/common/Button';
import Callout from '@pinecast/common/Callout';
import Form from '@pinecast/common/Form';
import {gettext} from '@pinecast/i18n';
import Label from '@pinecast/common/Label';
import Select from '@pinecast/common/Select';
import xhr from '@pinecast/xhr';

import {countryOptions} from './constants';
import ExternalAccount from './ExternalAccount';
// import LEAddressCityField from './fields/LEAddressCityField';
// import LEAddressStateField from './fields/LEAddressStateField';
// import LEAddressSecondField from './fields/LEAddressSecondField';
// import LEAddressStreetField from './fields/LEAddressStreetField';
// import LEAddressZipField from './fields/LEAddressZipField';
import LEDOBField from './fields/LEDOBField';
import LEFirstNameField from './fields/LEFirstNameField';
import LELastNameField from './fields/LELastNameField';
import LESSNLastFourField from './fields/LESSNLastFourField';
import stripe from './stripe';

declare var Rollbar: any;

export default class NewAccountForm extends React.Component {
  props: {
    onAccountCreated: () => void;
  };
  state: {
    country: string;
    legalEntity: {
      type: 'individual';
      first_name?: string;
      last_name?: string;
      address?: {
        line1?: string;
        line2?: string;
        city?: string;
        state?: string;
        postal_code?: string;
      };
      dob?: {
        month?: string;
        day?: string;
        year?: string;
      };
      ssn_last_4?: string;
    };

    error: React.ReactNode | null;
    saving: boolean;
  } = {
    country: 'US',
    legalEntity: {type: 'individual'},

    error: null,
    saving: false,
  };

  externalAccount: ExternalAccount | null = null;

  submit = async () => {
    if (!this.externalAccount) {
      return;
    }

    if (!this.externalAccount.isReady()) {
      this.externalAccount.setError(
        gettext('You must fill out all fields completely.'),
      );
      return;
    }

    this.setState({saving: true, error: null});

    const [
      {error: acctError, token: acctToken},
      {error: bankError, token: bankToken},
    ] = await Promise.all([
      stripe.createToken('account', {
        legal_entity: this.state.legalEntity,
        tos_shown_and_accepted: true,
      }),
      this.externalAccount.getToken(),
    ]);

    if (bankError) {
      this.setState({saving: false});

      if (bankError.type !== 'invalid_request_error') {
        Rollbar.warning('Error during tip jar signup', bankError);
      }
      this.externalAccount.setError(
        bankError.message ||
          gettext(
            'There was a problem submitting your payout account details.',
          ),
      );
      return;
    }

    if (acctError) {
      Rollbar.warning('Error during tip jar signup', acctError);
      this.setState({
        saving: false,
        error:
          acctError.message ||
          gettext(
            'Your identity information could not be submitted. Please contact Pinecast support.',
          ),
      });
      return;
    }

    const body = new FormData();
    body.append('country', this.state.country);
    body.append('account_token', acctToken.id);
    body.append('bank_token', bankToken.id);
    const req = xhr({
      method: 'POST',
      url: '/payments/services/tip_jar/create',
      body,
    });
    try {
      await req;
    } catch {
      let error = gettext(
        'There was a problem adding your payout account to Pinecast.',
      );
      if (req.xhr.responseText) {
        try {
          const parsed = JSON.parse(req.xhr.responseText);
          error = parsed.error;
        } catch {
          Rollbar.error('Invalid response returned from tip jar API', {
            formData: Array.from(body.entries())
              .map(([key, value]) => `${key}=${value}`)
              .join('\n'),
          });
        }
      }
      this.setState({error, saving: false});
      return;
    }

    this.props.onAccountCreated();
  };

  handleChangeCountry = (country: string) => {
    this.setState({country});
  };

  updateLegalEntityValue(
    key: keyof NewAccountForm['state']['legalEntity'],
    value: string,
  ) {
    this.setState({
      legalEntity: {
        ...this.state.legalEntity,
        [key]: value || undefined,
      },
    });
  }
  updateLegalEntitySubkeyValue(
    key: 'address',
    subkey: 'line1' | 'line2' | 'city' | 'state' | 'postal_code',
    value: string,
  ): void;
  updateLegalEntitySubkeyValue(
    key: 'dob',
    subkey: 'month' | 'day' | 'year',
    value: string,
  ): void;
  updateLegalEntitySubkeyValue(
    key: 'address' | 'dob',
    subkey: string,
    value: string,
  ): void {
    const parentkeyValue = this.state.legalEntity[key];
    if (!parentkeyValue && !value) {
      return;
    }
    const newParent = {
      ...parentkeyValue,
      [subkey]: value || undefined,
    };
    this.setState({
      legalEntity: {
        ...this.state.legalEntity,
        [key]: newParent,
      },
    });
  }
  handleFirstName = (value: string) =>
    this.updateLegalEntityValue('first_name', value);
  handleLastName = (value: string) =>
    this.updateLegalEntityValue('last_name', value);

  handleAddressLine1 = (value: string) =>
    this.updateLegalEntitySubkeyValue('address', 'line1', value);
  handleAddressLine2 = (value: string) =>
    this.updateLegalEntitySubkeyValue('address', 'line2', value);
  handleAddressCity = (value: string) =>
    this.updateLegalEntitySubkeyValue('address', 'city', value);
  handleAddressState = (value: string) =>
    this.updateLegalEntitySubkeyValue('address', 'state', value);
  handleAddressPostalCode = (value: string) =>
    this.updateLegalEntitySubkeyValue('address', 'postal_code', value);

  handleDob = (value: {month: string; day: string; year: string}) => {
    this.setState({
      legalEntity: {
        ...this.state.legalEntity,
        dob: value,
      },
    });
  };

  handleSSNLast4 = (value: string) =>
    this.updateLegalEntityValue('ssn_last_4', value);

  handleEARef = (ref: ExternalAccount | null) => {
    this.externalAccount = ref;
  };

  render() {
    const {
      state: {country, error, saving},
    } = this;

    return (
      <React.Fragment>
        <Form onSubmit={this.submit}>
          {error && <Callout type="negative">{error}</Callout>}
          <Label text={gettext('Country')}>
            <Select
              onChange={this.handleChangeCountry}
              options={countryOptions}
              value={country}
            />
          </Label>

          <hr />

          <aside>
            <p>
              {gettext(
                'This information should reflect the owner of the podcast. These details will be used for tax purposes, if necessary.',
              )}
            </p>
          </aside>

          <Label text="Legal name">
            <LEFirstNameField
              onChange={this.handleFirstName}
              value={this.state.legalEntity.first_name || ''}
            />
            <LELastNameField
              onChange={this.handleLastName}
              value={this.state.legalEntity.last_name || ''}
            />
          </Label>
          {/*
          <LEAddressStreetField onInput={this.handleAddressLine1} />
          <LEAddressSecondField onInput={this.handleAddressLine2} />
          <LEAddressCityField onInput={this.handleAddressCity} />
          <LEAddressStateField
            onInput={this.handleAddressState}
            country={country}
          />
          <LEAddressZipField
            onInput={this.handleAddressPostalCode}
            country={country}
          />
*/}
          <hr />

          <LEDOBField
            onChange={this.handleDob}
            value={this.state.legalEntity.dob || {}}
          />
          {country.toUpperCase() === 'US' && (
            <LESSNLastFourField
              onChange={this.handleSSNLast4}
              value={this.state.legalEntity.ssn_last_4 || ''}
            />
          )}

          <hr />

          <ExternalAccount country={country} ref={this.handleEARef} />

          <hr />

          <Button pending={saving} type="submit">
            {gettext('Create tip jar')}
          </Button>
        </Form>
      </React.Fragment>
    );
  }
}
