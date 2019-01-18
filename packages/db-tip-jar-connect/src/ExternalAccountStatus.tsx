import * as React from 'react';

import Button from '@pinecast/common/Button';
import Card from '@pinecast/common/Card';
import {Check} from '@pinecast/common/icons';
import {defineMessages, FormattedMessage} from '@pinecast/i18n';

import UpdateExternalAccount from './UpdateExternalAccount';

const messages = defineMessages({
  bankAdded: {
    id: 'db-tip-jar-connect.ExternalAccountStatus.bankAdded',
    description: 'Title of the card that shows that a bank account was added',
    defaultMessage: 'Bank account added',
  },
  cta: {
    id: 'db-tip-jar-connect.ExternalAccountStatus.cta',
    description: 'Button to edit bank account',
    defaultMessage: 'Edit',
  },
});

export default class ExternalAccountStatus extends React.Component {
  props: {
    settings: any;
  };
  state: {
    updating: boolean;
  } = {updating: false};

  handleUpdate = () => {
    this.setState({updating: true});
  };

  render() {
    return this.state.updating ? (
      <UpdateExternalAccount settings={this.props.settings} />
    ) : (
      <Card
        whiteBack
        style={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'row',
          maxWidth: 500,
        }}
      >
        <Check color="#259461" height={20} />
        <span style={{margin: '0 8px', flex: '1 1'}}>
          <FormattedMessage {...messages.bankAdded} />
        </span>
        <Button onClick={this.handleUpdate} size="small">
          <FormattedMessage {...messages.cta} />
        </Button>
      </Card>
    );
  }
}
