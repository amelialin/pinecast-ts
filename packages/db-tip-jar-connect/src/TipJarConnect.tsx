import * as React from 'react';

import Button from '@pinecast/common/Button';
import Callout from '@pinecast/common/Callout';
import Form from '@pinecast/common/Form';
import {gettext} from '@pinecast/i18n';
import Spinner from '@pinecast/common/Spinner';
import xhr from '@pinecast/xhr';

import BankDetails from './BankDetails';
import ExternalAccount from './ExternalAccount';
import NewAccountForm from './NewAccountForm';

declare var Rollbar: any;

export default class TipJarConnect extends React.Component {
  static selector = '.tip-jar-connect';

  static propExtraction = {};

  props: {};
  state: {
    settings: any | null;
    settingsError: React.ReactNode | null;

    savingExtAcct: boolean;
    updateExtAcctError: React.ReactNode | null;
    extAccountSuccess: boolean;
  } = {
    settings: null,
    settingsError: null,

    savingExtAcct: false,
    updateExtAcctError: null,
    extAccountSuccess: false,
  };

  updateExtAcct: {
    getToken(): Promise<{token: {id: string}}>;
  } | null = null;

  componentDidMount() {
    this.refreshSettings();
  }

  refreshSettings = async () => {
    this.setState({settings: null, settingsError: null});

    try {
      const response = await xhr({
        method: 'GET',
        url: '/payments/services/tip_jar/get_settings',
      });
      this.setState({settings: JSON.parse(response), settingsError: null});
    } catch {
      this.setState({
        settingsError: gettext('There was a problem submitting the form.'),
      });
    }
  };

  handleUpdateExtAcctRef = (el: TipJarConnect['updateExtAcct']) => {
    this.updateExtAcct = el;
  };

  async extAcctSubmit() {
    this.setState({
      updateExtAcctError: null,
      savingExtAcct: true,
      extAccountSuccess: false,
    });

    let token;
    try {
      token = await this.updateExtAcct!.getToken();
      if (!token || !token.token) {
        Rollbar.error('No success response from Stripe token API', token);
        throw new Error();
      }
    } catch (e) {
      console.error(e);
      this.setState({
        updateExtAcctError: gettext(
          'There was a problem sending your account information to Stripe.',
        ),
        savingExtAcct: false,
      });
      return;
    }

    const body = new FormData();
    body.append('token', token.token.id);

    const req = xhr({
      method: 'POST',
      url: '/payments/services/tip_jar/update/external_account',
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
          error = JSON.parse(req.xhr.responseText).error;
        } catch (e) {}
      }
      this.setState({
        updateExtAcctError: error,
        savingExtAcct: false,
      });
      return;
    }
    this.setState({
      updateExtAcctError: null,
      savingExtAcct: false,
      extAccountSuccess: true,
    });
  }

  handleUpdateExtAcctSubmit = () => {
    if (!this.updateExtAcct || this.state.savingExtAcct) {
      return;
    }
    this.extAcctSubmit();
  };

  renderSpinner() {
    return (
      <div style={{padding: 40, display: 'flex', justifyContent: 'center'}}>
        <Spinner />
      </div>
    );
  }

  render() {
    const {
      extAccountSuccess,
      savingExtAcct,
      settings,
      settingsError,
      updateExtAcctError,
    } = this.state;
    if (settingsError) {
      return (
        <React.Fragment>
          <strong>
            {gettext('There was a problem loading your bank information')}
          </strong>
          <p>{settingsError}</p>
        </React.Fragment>
      );
    }

    if (!settings) {
      return this.renderSpinner();
    }

    if (!settings.setup) {
      return (
        <React.Fragment>
          <strong style={{display: 'block', marginBottom: '1em'}}>
            {gettext('Add tip jar information')}
          </strong>
          <p>
            {gettext(
              'Adding a bank account will allow your podcasts to begin accepting tips. All information provided will stored securely by our payment processor and will never pass through Pinecast servers.',
            )}
          </p>
          <NewAccountForm onAccountCreated={this.refreshSettings} />
        </React.Fragment>
      );
    }

    return (
      <React.Fragment>
        <strong style={{display: 'block', marginBottom: '1em'}}>
          {gettext('Existing tip jar information')}
        </strong>
        <p>
          {gettext(
            'A payout account is already linked to your Pinecast account. You are all set to accept tips for your podcast!',
          )}
        </p>
        <BankDetails externalAccount={settings.external_account} />
        <hr />
        <Form onSubmit={this.handleUpdateExtAcctSubmit}>
          <strong style={{display: 'block', marginBottom: '1em'}}>
            {gettext('Update payout account')}
          </strong>

          {extAccountSuccess && (
            <Callout type="positive">
              {gettext('Your account was updated successfully')}
            </Callout>
          )}
          {updateExtAcctError && (
            <Callout type="negative">{updateExtAcctError}</Callout>
          )}
          {savingExtAcct && this.renderSpinner()}
          <div
            style={{
              display: savingExtAcct || extAccountSuccess ? 'none' : undefined,
            }}
          >
            <ExternalAccount
              country={settings.country.toLowerCase()}
              isUpdate
              ref={this.handleUpdateExtAcctRef}
            />
            <Button $isPrimary type="submit">
              {gettext('Save')}
            </Button>
          </div>
        </Form>
      </React.Fragment>
    );
  }
}
