import * as React from 'react';

import Label from '@pinecast/common/Label';
import {
  defineMessages,
  FormattedMessage,
  I18n,
  InjectedIntlProps,
} from '@pinecast/i18n';
import Select from '@pinecast/common/Select';
import TextInput from '@pinecast/common/TextInput';

import CheckImage from './CheckImage';
import * as currencies from '../currencies';
import stripe from '../stripe';

const messages = defineMessages({
  currency: {
    id: 'db-tip-jar-connect.BankAccount.currency.label',
    description: 'Label for currency dropdown',
    defaultMessage: 'Currency',
  },
  iban: {
    id: 'db-tip-jar-connect.BankAccount.iban.label',
    description: 'Label for IBAN field',
    defaultMessage: 'IBAN',
  },
  accountNumber: {
    id: 'db-tip-jar-connect.BankAccount.accountNumber.label',
    description: 'Label for account number field',
    defaultMessage: 'Account number',
  },
  sortCode: {
    id: 'db-tip-jar-connect.BankAccount.sortCode.label',
    description: 'Label for sort code field',
    defaultMessage: 'Sort code',
  },
  routingNumber: {
    id: 'db-tip-jar-connect.BankAccount.routingNumber.label',
    description: 'Label for routing number field',
    defaultMessage: 'Routing number',
  },
});

export default class BankAccount extends React.Component {
  props: {
    country: string;
  };
  state: {
    complete: boolean;
    selected: 'acct' | 'routing' | null;
    values: {
      currency: string;
      account_number: string;
      routing_number: string;
    };
  };
  constructor(props: BankAccount['props']) {
    super(props);
    this.state = {
      complete: false,
      selected: null,
      values: {
        currency: currencies.countriesToCurrencies[props.country][0],
        account_number: '',
        routing_number: '',
      },
    };
  }

  componentWillReceiveProps(newProps: BankAccount['props']) {
    if (newProps.country !== this.props.country) {
      this.setState({
        values: {
          ...this.state.values,
          currency: currencies.countriesToCurrencies[newProps.country][0],
        },
      });
    }
  }

  isReady() {
    const {
      values: {account_number, currency, routing_number},
    } = this.state;
    return Boolean(account_number && currency && routing_number);
  }

  getToken() {
    const {country} = this.props;
    return stripe.createToken('bank_account', {
      ...this.state.values,
      country,
      account_holder_type: 'individual',
    });
  }

  updateValue(key: keyof BankAccount['state']['values'], value: string) {
    const updatedValues = {...this.state.values, [key]: value || undefined};
    if (key === 'currency' && value && value.toUpperCase() === 'EUR') {
      delete updatedValues.routing_number;
    }
    this.setState({
      values: updatedValues,
    });
  }

  getRoutingNumberLabel() {
    switch (this.state.values.currency.toUpperCase()) {
      case 'GBP':
        return <FormattedMessage {...messages.sortCode} />;
      default:
        return <FormattedMessage {...messages.routingNumber} />;
    }
  }

  handleChangeCurrency = (value: string) => this.updateValue('currency', value);

  handleFocusAcctNum = () => {
    this.setState({selected: 'acct'});
  };
  handleBlurAcctNum = () => {
    this.setState({selected: null});
  };

  handleFocusRoutingNum = () => {
    this.setState({selected: 'routing'});
  };
  handleBlurRoutingNum = () => {
    this.setState({selected: null});
  };

  handleAcctNumChange = (value: string) =>
    this.updateValue('account_number', value);
  handleRoutingNumChange = (value: string) =>
    this.updateValue('routing_number', value);

  render() {
    const {
      props: {country},
      state: {selected, values},
    } = this;
    const availableCurrencies = currencies.countriesToCurrencies[country];
    const isEuro = values.currency.toUpperCase() === 'EUR';
    return (
      <React.Fragment>
        {availableCurrencies.length > 1 && (
          <Label text={<FormattedMessage {...messages.currency} />}>
            <I18n>
              {({intl}: InjectedIntlProps) => (
                <Select
                  onChange={this.handleChangeCurrency}
                  options={availableCurrencies.map(cur => ({
                    label: intl.formatMessage(currencies.names[cur]),
                    key: cur,
                  }))}
                  value={values.currency}
                />
              )}
            </I18n>
          </Label>
        )}
        {values.currency.toUpperCase() === 'USD' && (
          <div>
            <CheckImage
              highlightAcctNum={selected === 'acct'}
              highlightRoutingNum={selected === 'routing'}
            />
          </div>
        )}
        <Label
          text={
            <FormattedMessage
              {...(isEuro ? messages.iban : messages.accountNumber)}
            />
          }
        >
          <TextInput
            nativeEvents={{
              onBlur: this.handleBlurAcctNum,
              onFocus: this.handleFocusAcctNum,
            }}
            onChange={this.handleAcctNumChange}
            placeholder={isEuro ? 'XX000123456789' : '000123456789'}
            value={values.account_number}
          />
        </Label>
        {!isEuro && (
          <Label text={this.getRoutingNumberLabel()}>
            <TextInput
              nativeEvents={{
                onBlur: this.handleBlurRoutingNum,
                onFocus: this.handleFocusRoutingNum,
              }}
              onChange={this.handleRoutingNumChange}
              placeholder="110000000"
              value={values.routing_number || ''}
            />
          </Label>
        )}
      </React.Fragment>
    );
  }
}
