import * as React from 'react';

import Button from '@pinecast/common/Button';
import Callout from '@pinecast/common/Callout';
import Card from '@pinecast/common/Card';
import {defineMessages, FormattedMessage} from '@pinecast/i18n';
import Form from '@pinecast/common/Form';
import Spinner from '@pinecast/common/Spinner';
import xhr from '@pinecast/xhr';

import BankDetails from './BankDetails';
import ExternalAccount from './ExternalAccount';
import NewAccountForm from './NewAccountForm';

declare var Rollbar: any;

const messages = defineMessages({
  titleUpdate: {
    id: 'db-tip-jar-connect.TipJarConnect.title.update',
    description:
      'Title of the bank account form when a bank account is already present',
    defaultMessage: 'Update payout account',
  },
  copyUpdate: {
    id: 'db-tip-jar-connect.TipJarConnect.copy.update',
    description: 'Page description when a bank account is already present',
    defaultMessage: 'Account information is stored securely on Stripe.',
  },

  successUpdated: {
    id: 'db-tip-jar-connect.TipJarConnect.success.updated',
    description: 'Success message when the bank account details are updated',
    defaultMessage: 'Your account was updated successfully.',
  },
  ctaSave: {
    id: 'db-tip-jar-connect.TipJarConnect.cta.save',
    description: 'Save button for bank account details',
    defaultMessage: 'Save',
  },

  copyNewAccount: {
    id: 'db-tip-jar-connect.TipJarConnect.copy.newAccount',
    description: 'Copy when the user has not set up a tip jar',
    defaultMessage:
      'We need some information before we can accept tips on your behalf.',
  },
  errorLoadingBankDetails: {
    id: 'db-tip-jar-connect.TipJarConnect.error.loading',
    description: 'Error loading bank account details',
    defaultMessage: 'There was a problem loading your bank information.',
  },
  errorSavingPinecast: {
    id: 'db-tip-jar-connect.TipJarConnect.error.saving.pinecast',
    description: 'Error when saving bank details to Pinecast',
    defaultMessage:
      'There was a problem adding your payout account to Pinecast.',
  },
  errorSavingStripe: {
    id: 'db-tip-jar-connect.TipJarConnect.error.saving.stripe',
    description: 'Error when saving bank details to Stripe',
    defaultMessage: 'There was a problem sending your bank details to Stripe.',
  },
  errorLoading: {
    id: 'db-tip-jar-connect.TipJarConnect.error.loading',
    description: 'Error when loading bank information',
    defaultMessage: 'There was a problem loading your account status.',
  },
});

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
        settingsError: <FormattedMessage {...messages.errorLoading} />,
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
        updateExtAcctError: (
          <FormattedMessage {...messages.errorSavingStripe} />
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
      let error = <FormattedMessage {...messages.errorSavingPinecast} />;
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
            <FormattedMessage {...messages.errorLoadingBankDetails} />
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
          <p>
            <FormattedMessage {...messages.copyNewAccount} />
          </p>
          <NewAccountForm onAccountCreated={this.refreshSettings} />
        </React.Fragment>
      );
    }

    return (
      <React.Fragment>
        <BankDetails externalAccount={settings.external_account} />
        <Card style={{maxWidth: 500}} whiteBack>
          <Form onSubmit={this.handleUpdateExtAcctSubmit}>
            <strong style={{display: 'block', marginBottom: '1em'}}>
              <FormattedMessage {...messages.titleUpdate} />
            </strong>

            <p>
              <FormattedMessage {...messages.copyUpdate} />
            </p>

            {extAccountSuccess && (
              <Callout type="positive">
                <FormattedMessage {...messages.successUpdated} />
              </Callout>
            )}
            {updateExtAcctError && (
              <Callout type="negative">{updateExtAcctError}</Callout>
            )}
            {savingExtAcct && this.renderSpinner()}
            <div
              style={{
                display:
                  savingExtAcct || extAccountSuccess ? 'none' : undefined,
              }}
            >
              <ExternalAccount
                country={settings.country.toUpperCase()}
                isUpdate
                ref={this.handleUpdateExtAcctRef}
              />
              <Button $isPrimary type="submit">
                <FormattedMessage {...messages.ctaSave} />
              </Button>
            </div>
          </Form>
        </Card>
      </React.Fragment>
    );
  }
}
