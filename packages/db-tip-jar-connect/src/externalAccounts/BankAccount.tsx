import * as React from 'react';

import Label from '@pinecast/common/Label';
import {
  defineMessages,
  FormattedMessage,
  I18n,
  InjectedIntlProps,
} from '@pinecast/i18n';
import Group from '@pinecast/common/Group';
import {nullThrows} from '@pinecast/common/helpers';
import Select from '@pinecast/common/Select';
import TextInput from '@pinecast/common/TextInput';

import CheckImage from './CheckImage';
import * as constants from '../constants';
import * as currencies from '../currencies';
import stripe from '../stripe';

const messages = defineMessages({
  currency: {
    id: 'db-tip-jar-connect.BankAccount.currency.label',
    description: 'Label for currency dropdown',
    defaultMessage: 'Currency',
  },
  bankCountry: {
    id: 'db-tip-jar-connect.BankAccount.bankCountry.label',
    description: 'Label for bank account country dropdown',
    defaultMessage: 'Bank country',
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

function getDefaultCountryAndCurrency(
  country: string,
  currency: string | null = null,
): [string, string] {
  const c = currencies.countriesToCurrencies[country];
  if (currency && c[currency]) {
    if (c[currency].includes(country)) {
      return [country, currency];
    } else {
      return [c[currency][0], currency];
    }
  }
  const defCurrency = currencies.defaultCurrency[country];
  if (defCurrency && c[defCurrency]) {
    if (c[defCurrency].includes(country)) {
      return [country, defCurrency];
    } else {
      return [c[defCurrency][0], defCurrency];
    }
  }

  const fallbackCurrency = Object.keys(c)[0];
  return [c[fallbackCurrency][0], fallbackCurrency];
}

export default class BankAccount extends React.Component {
  props: {
    country: string;
  };
  state: {
    complete: boolean;
    selected: 'acct' | 'routing' | null;
    values: {
      currency: string;
      country: string;
      account_number: string;
      routing_number?: string;
    };
  };
  constructor(props: BankAccount['props']) {
    super(props);

    const [country, currency] = getDefaultCountryAndCurrency(props.country);

    this.state = {
      complete: false,
      selected: null,
      values: {
        currency,
        country,
        account_number: '',
      },
    };
  }

  componentWillReceiveProps(newProps: BankAccount['props']) {
    if (newProps.country !== this.props.country) {
      const [country, currency] = getDefaultCountryAndCurrency(
        newProps.country,
      );
      this.setState({
        values: {
          ...this.state.values,
          currency,
          country,
        },
      });
    }
  }

  isReady() {
    const {
      values: {account_number, country, currency, routing_number},
    } = this.state;
    return Boolean(
      account_number &&
        country &&
        currency &&
        (currency === 'eur' || routing_number),
    );
  }

  getToken() {
    return stripe.createToken('bank_account', {
      ...this.state.values,
      account_holder_type: 'individual',
    });
  }

  updateValue(key: keyof BankAccount['state']['values'], value: string) {
    const updatedValues = {...this.state.values, [key]: value || undefined};
    if (key === 'currency' && value && value.toUpperCase() === 'EUR') {
      delete updatedValues.routing_number;
    }
    return new Promise(resolve => {
      this.setState(
        {
          values: updatedValues,
        },
        resolve,
      );
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

  handleChangeCurrency = async (value: string) => {
    const [bankCountry, currency] = getDefaultCountryAndCurrency(
      this.props.country,
      value,
    );
    await this.updateValue('currency', currency);
    this.updateValue('country', bankCountry);
  };
  handleChangeBankCountry = (value: string) => {
    this.updateValue('country', value);
  };

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

  renderCurrencies(
    availableCurrencies: {[currency: string]: Array<string>},
    values: BankAccount['state']['values'],
  ) {
    const currencyList = Object.keys(availableCurrencies);
    return (
      <Group spacing={12}>
        <Label text={<FormattedMessage {...messages.currency} />}>
          <I18n>
            {({intl}: InjectedIntlProps) => (
              <Select
                disabled={currencyList.length < 2}
                onChange={this.handleChangeCurrency}
                options={currencyList.map(cur => ({
                  label: intl.formatMessage(currencies.names[cur]),
                  key: cur,
                }))}
                value={values.currency}
              />
            )}
          </I18n>
        </Label>
        {availableCurrencies[values.currency].length > 1 && (
          <Label text={<FormattedMessage {...messages.bankCountry} />}>
            <Select
              disabled={currencyList.length < 2}
              onChange={this.handleChangeBankCountry}
              options={availableCurrencies[values.currency].map(country =>
                nullThrows(
                  constants.countryOptions.find(x => x.key === country),
                ),
              )}
              value={values.country}
            />
          </Label>
        )}
      </Group>
    );
  }

  render() {
    const {
      props: {country},
      state: {selected, values},
    } = this;
    const availableCurrencies = currencies.countriesToCurrencies[country];
    const isEuro = values.currency.toUpperCase() === 'EUR';
    const usesIBAN =
      isEuro ||
      ['EUR', 'DKK', 'CHF', 'NOK', 'SEK'].includes(
        values.currency.toUpperCase(),
      );
    return (
      <React.Fragment>
        {this.renderCurrencies(availableCurrencies, values)}
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
              {...(usesIBAN ? messages.iban : messages.accountNumber)}
            />
          }
        >
          <TextInput
            nativeEvents={{
              onBlur: this.handleBlurAcctNum,
              onFocus: this.handleFocusAcctNum,
            }}
            onChange={this.handleAcctNumChange}
            placeholder={usesIBAN ? 'XX000123456789' : '000123456789'}
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
