import * as React from 'react';

import Button from '@pinecast/common/Button';
import Callout from '@pinecast/common/Callout';
import Card from '@pinecast/common/Card';
import Form from '@pinecast/common/Form';
import {defineMessages, FormattedMessage} from '@pinecast/i18n';
import Label from '@pinecast/common/Label';
import Select from '@pinecast/common/Select';
import xhr from '@pinecast/xhr';

import {countryOptions} from './constants';
import ExternalAccount from './ExternalAccount';

declare var Rollbar: any;

const messages = defineMessages({
  errorFields: {
    id: 'db-tip-jar-connect.NewAccountForm.errorFields',
    description: 'Error that all fields must be filled out',
    defaultMessage: 'You must fill out all fields completely.',
  },
  errorPayoutDetails: {
    id: 'db-tip-jar-connect.NewAccountForm.errorPayoutDetails',
    description: 'Error that payout details were not saved',
    defaultMessage:
      'There was a problem submitting your payout account details.',
  },
  errorPayoutSave: {
    id: 'db-tip-jar-connect.NewAccountForm.errorPayoutSave',
    description: 'Error that payout details were not saved to Pinecast',
    defaultMessage:
      'There was a problem adding your payout account to Pinecast.',
  },
  labelCountry: {
    id: 'db-tip-jar-connect.NewAccountForm.labelCountry',
    description: 'Label for the country field',
    defaultMessage: 'Where do you live?',
  },
  ctaContinue: {
    id: 'db-tip-jar-connect.NewAccountForm.ctaContinue',
    description: 'Button to create payout account',
    defaultMessage: 'Continue setup',
  },
});

export default class NewAccountForm extends React.Component {
  props: {
    onAccountCreated: () => void;
  };
  state: {
    country: string;

    error: React.ReactNode | null;
    saving: boolean;
  } = {
    country: 'US',

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
        <FormattedMessage {...messages.errorFields} />,
      );
      return;
    }

    this.setState({saving: true, error: null});

    const {
      error: bankError,
      token: bankToken,
    } = await this.externalAccount.getToken();

    if (bankError) {
      this.setState({saving: false});

      if (bankError.type !== 'invalid_request_error') {
        Rollbar.warning('Error during tip jar signup', bankError);
      }
      this.externalAccount.setError(
        bankError.message || (
          <FormattedMessage {...messages.errorPayoutDetails} />
        ),
      );
      return;
    }

    const body = new FormData();
    body.append('country', this.state.country);
    body.append('bank_token', bankToken.id);
    const req = xhr({
      method: 'POST',
      url: '/payments/services/tip_jar/create',
      body,
    });
    try {
      await req;
    } catch {
      let error = <FormattedMessage {...messages.errorPayoutSave} />;
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

  handleEARef = (ref: ExternalAccount | null) => {
    this.externalAccount = ref;
  };

  render() {
    const {
      state: {country, error, saving},
    } = this;

    return (
      <Card style={{maxWidth: 500}} whiteBack>
        <Form onSubmit={this.submit}>
          {error && <Callout type="negative">{error}</Callout>}
          <Label text={<FormattedMessage {...messages.labelCountry} />}>
            <Select
              onChange={this.handleChangeCountry}
              options={countryOptions}
              value={country}
            />
          </Label>

          <ExternalAccount country={country} ref={this.handleEARef} />

          <Button pending={saving} type="submit">
            <FormattedMessage {...messages.ctaContinue} />
          </Button>
        </Form>
      </Card>
    );
  }
}
