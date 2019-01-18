import * as React from 'react';

import {defineMessages, FormattedMessage} from '@pinecast/i18n';
import Spinner from '@pinecast/common/Spinner';
import xhr from '@pinecast/xhr';

import BankDetails from './BankDetails';
import ExternalAccountStatus from './ExternalAccountStatus';
import KYCStatus from './KYCStatus';
import NewAccountForm from './NewAccountForm';

const messages = defineMessages({
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
  } = {
    settings: null,
    settingsError: null,
  };

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

  renderSpinner() {
    return (
      <div style={{padding: 40, display: 'flex', justifyContent: 'center'}}>
        <Spinner />
      </div>
    );
  }

  render() {
    const {settings, settingsError} = this.state;
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
        <KYCStatus settings={settings} />
        <ExternalAccountStatus settings={settings} />
      </React.Fragment>
    );
  }
}
