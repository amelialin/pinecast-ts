import * as React from 'react';

import Button from '@pinecast/common/Button';
import Callout from '@pinecast/common/Callout';
import Card from '@pinecast/common/Card';
import {Check, Cross} from '@pinecast/common/icons';
import {defineMessages, FormattedMessage} from '@pinecast/i18n';
import xhr from '@pinecast/xhr';

const messages = defineMessages({
  infoProvided: {
    id: 'db-tip-jar-connect.KYCStatus.infoProvided',
    description: 'Title of the card that shows that KYC info was provided',
    defaultMessage: 'Required information provided',
  },
  ctaUpdate: {
    id: 'db-tip-jar-connect.KYCStatus.ctaUpdate',
    description: 'Button to update personal info',
    defaultMessage: 'Update',
  },
  infoNotProvided: {
    id: 'db-tip-jar-connect.KYCStatus.infoNotProvided',
    description: 'Title of the card that shows that KYC info is required',
    defaultMessage: 'More information is required',
  },
  ctaProvide: {
    id: 'db-tip-jar-connect.KYCStatus.ctaProvide',
    description: 'Button to update personal info',
    defaultMessage: 'Provide',
  },

  urlError: {
    id: 'db-tip-jar-connect.KYCStatus.error',
    description: 'Error shown when could not fetch a URL',
    defaultMessage: 'We could not contact Stripe.',
  },
});

export default class KYCStatus extends React.Component {
  props: {
    settings: any;
  };
  state: {
    error: React.ReactNode | null;
    fetching: boolean;
  } = {error: null, fetching: false};

  handleGetLinkUpdate = () => {
    this.setState({error: null, fetching: true});
    this.getURL('/payments/services/connect/hv/update');
  };
  handleGetLinkVerify = () => {
    this.setState({error: null, fetching: true});
    this.getURL('/payments/services/connect/hv/verification');
  };
  async getURL(endpoint: string) {
    try {
      const result = await xhr({
        method: 'GET',
        url: endpoint,
      });
      window.location.assign(JSON.parse(result).url);
    } catch (e) {
      this.setState({
        error: <FormattedMessage {...messages.urlError} />,
        fetching: false,
      });
      return;
    }
  }

  render() {
    const {has_requirements: needsSetup} = this.props.settings;

    let inner;
    if (needsSetup) {
      inner = (
        <React.Fragment>
          <Cross color="#bf1d1d" height={20} />
          <span style={{margin: '0 8px', flex: '1 1'}}>
            <FormattedMessage {...messages.infoNotProvided} />
          </span>
          <Button
            onClick={this.handleGetLinkVerify}
            size="small"
            $isPrimary
            pending={this.state.fetching}
          >
            <FormattedMessage {...messages.ctaProvide} />
          </Button>
        </React.Fragment>
      );
    } else {
      inner = (
        <React.Fragment>
          <Check color="#259461" height={20} />
          <span style={{margin: '0 8px', flex: '1 1'}}>
            <FormattedMessage {...messages.infoProvided} />
          </span>
          <Button
            onClick={this.handleGetLinkUpdate}
            size="small"
            pending={this.state.fetching}
          >
            <FormattedMessage {...messages.ctaUpdate} />
          </Button>
        </React.Fragment>
      );
    }
    return (
      <React.Fragment>
        {this.state.error && (
          <Callout type="negative">{this.state.error}</Callout>
        )}
        <Card
          whiteBack
          style={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'row',
            maxWidth: 500,
          }}
        >
          {inner}
        </Card>
      </React.Fragment>
    );
  }
}
