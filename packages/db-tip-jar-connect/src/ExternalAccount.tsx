import * as React from 'react';

import Callout from '@pinecast/common/Callout';
import {defineMessages, FormattedMessage} from '@pinecast/i18n';
import {nullThrows} from '@pinecast/common/helpers';
import Label from '@pinecast/common/Label';
import Radio from '@pinecast/common/Radio';

import BankAccount from './externalAccounts/BankAccount';
import DebitCard from './externalAccounts/DebitCard';

const messages = defineMessages({
  bankDetails: {
    id: 'db-tip-jar-connect.ExternalAccount.bankDetails',
    description: 'Heading for bank details',
    defaultMessage: 'Bank details',
  },
  accountType: {
    id: 'db-tip-jar-connect.ExternalAccount.accountType',
    description: 'Question of where user wants their payouts sent',
    defaultMessage:
      'What type of account would you like to send tip payouts to?',
  },
  destination: {
    id: 'db-tip-jar-connect.ExternalAccount.destination',
    description: 'Question of where user wants their payouts sent to',
    defaultMessage: 'Where should we send your tips?',
  },
  typeDebit: {
    id: 'db-tip-jar-connect.ExternalAccount.type.debitCard',
    description: 'Label for debit card option',
    defaultMessage: 'Debit card',
  },
  typeBank: {
    id: 'db-tip-jar-connect.ExternalAccount.type.bank',
    description: 'Label for bank account option',
    defaultMessage: 'Bank account',
  },
});

export default class ExternalAccount extends React.Component {
  props: {
    country: string;
    isUpdate?: boolean;
  };
  state: {
    error: React.ReactNode | null;
    type: 'debit_card' | 'bank_account';
  };

  debitForm: DebitCard | null = null;
  bankForm: BankAccount | null = null;

  constructor(props: ExternalAccount['props']) {
    super(props);
    this.state = {
      type:
        props.country.toUpperCase() === 'US' ? 'debit_card' : 'bank_account',
      error: null,
    };
  }

  static getDerivedStateFromProps(
    newProps: ExternalAccount['props'],
    state: ExternalAccount['state'],
  ) {
    if (newProps.country.toUpperCase() !== 'US') {
      return {type: 'bank_account'};
    }
    return state;
  }

  isReady() {
    return nullThrows(this.debitForm || this.bankForm).isReady();
  }
  getToken() {
    return nullThrows(this.debitForm || this.bankForm).getToken();
  }

  setError(error: React.ReactNode | null) {
    this.setState({error});
  }

  handleSetDebit = (checked: boolean) => {
    if (!checked) {
      return;
    }
    this.setState({type: 'debit_card'});
  };
  handleSetBank = (checked: boolean) => {
    if (!checked) {
      return;
    }
    this.setState({type: 'bank_account'});
  };

  handleRefDebit = (ref: DebitCard | null) => {
    this.debitForm = ref;
  };
  handleRefBank = (ref: BankAccount | null) => {
    this.bankForm = ref;
  };

  render() {
    const {
      props: {country, isUpdate},
      state: {error, type},
    } = this;

    if (country.toUpperCase() !== 'US') {
      return (
        <Label
          componentType="div"
          text={<FormattedMessage {...messages.bankDetails} />}
        >
          {error && <Callout type="negative">{error}</Callout>}
          <BankAccount country={country} ref={this.handleRefBank} />
        </Label>
      );
    }

    return (
      <Label
        componentType="div"
        text={
          isUpdate ? (
            <FormattedMessage {...messages.accountType} />
          ) : (
            <FormattedMessage {...messages.destination} />
          )
        }
      >
        {error && <Callout type="negative">{error}</Callout>}
        <Radio
          checked={type === 'debit_card'}
          onChange={this.handleSetDebit}
          text={<FormattedMessage {...messages.typeDebit} />}
        />
        <Radio
          checked={type === 'bank_account'}
          onChange={this.handleSetBank}
          text={<FormattedMessage {...messages.typeBank} />}
        />
        {type === 'debit_card' && (
          <DebitCard country={country} ref={this.handleRefDebit} />
        )}
        {type === 'bank_account' && (
          <BankAccount country={country} ref={this.handleRefBank} />
        )}
      </Label>
    );
  }
}
