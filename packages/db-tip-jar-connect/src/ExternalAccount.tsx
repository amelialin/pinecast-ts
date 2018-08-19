import * as React from 'react';

import Callout from '@pinecast/common/Callout';
import {gettext} from '@pinecast/i18n';
import {nullThrows} from '@pinecast/common/helpers';
import Label from '@pinecast/common/Label';
import Radio from '@pinecast/common/Radio';

import BankAccount from './externalAccounts/BankAccount';
import DebitCard from './externalAccounts/DebitCard';

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
        <Label componentType="div" text={gettext('Bank details')}>
          {error && <Callout type="negative">{error}</Callout>}
          <BankAccount country={country} ref={this.handleRefBank} />
        </Label>
      );
    }

    return (
      <Label
        componentType="div"
        text={
          isUpdate
            ? gettext(
                'What type of account would you like to send tip payouts to?',
              )
            : gettext('Where should we send your tips?')
        }
      >
        {error && <Callout type="negative">{error}</Callout>}
        <Radio
          checked={type === 'debit_card'}
          onChange={this.handleSetDebit}
          text={gettext('Debit card')}
        />
        <Radio
          checked={type === 'bank_account'}
          onChange={this.handleSetBank}
          text={gettext('Bank account')}
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
