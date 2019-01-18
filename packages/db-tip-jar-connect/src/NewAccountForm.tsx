import * as React from 'react';

import Button from '@pinecast/common/Button';
import Callout from '@pinecast/common/Callout';
import Card from '@pinecast/common/Card';
import Form from '@pinecast/common/Form';
import {gettext} from '@pinecast/i18n';
import Label from '@pinecast/common/Label';
import Select from '@pinecast/common/Select';
import xhr from '@pinecast/xhr';

import {countryOptions} from './constants';
import ExternalAccount from './ExternalAccount';

declare var Rollbar: any;

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
        gettext('You must fill out all fields completely.'),
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
        bankError.message ||
          gettext(
            'There was a problem submitting your payout account details.',
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
          <Label text={gettext('Where do you live?')}>
            <Select
              onChange={this.handleChangeCountry}
              options={countryOptions}
              value={country}
            />
          </Label>

          <ExternalAccount country={country} ref={this.handleEARef} />

          <Button pending={saving} type="submit">
            {gettext('Continue setup')}
          </Button>
        </Form>
      </Card>
    );
  }
}
