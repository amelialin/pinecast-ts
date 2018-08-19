import * as React from 'react';

import {gettext} from '@pinecast/i18n';

import Label from '@pinecast/common/Label';
import * as currencies from '../currencies';
import Select from '@pinecast/common/Select';
import stripe from '../stripe';
import {InputWrapper} from '@pinecast/common/TextInput';

const cardStyle = {
  base: {},
};

export default class DebitCard extends React.Component {
  props: {
    country: string;
  };
  state: {
    complete: boolean;
    currency: string;
  };

  // TODO: Type these
  elements: any = null;
  card: any = null;

  cardEl: HTMLDivElement | null = null;

  constructor(props: DebitCard['props']) {
    super(props);
    this.state = {
      complete: false,
      currency: currencies.countriesToCurrencies[props.country][0],
    };

    this.elements = stripe.elements();
    this.card = null;
  }

  componentDidMount() {
    this.card = this.elements.create('card', {style: cardStyle});
    this.card.mount(this.cardEl);
    this.card.on('change', (e: {complete: boolean}) => {
      this.setState({complete: e.complete});
    });
    (this.cardEl!.firstChild as HTMLElement).style.flex = '1 1';
    setTimeout(() => {
      this.card.update({style: {base: {fontSize: '13px'}}});
    }, 0);
  }

  isReady() {
    return this.state.complete;
  }

  getToken() {
    return stripe.createToken(this.card, {currency: this.state.currency});
  }

  handleCardRef = (ref: HTMLDivElement | null) => {
    this.cardEl = ref;
  };
  handleChangeCurrency = (currency: string) => {
    this.setState({currency});
  };

  render() {
    const availableCurrencies =
      currencies.countriesToCurrencies[this.props.country];
    return (
      <React.Fragment>
        <p>
          {gettext(
            'Visa and MasterCard debit cards are accepted. Credit cards are not supported.',
          )}
        </p>
        <Label text={gettext('Card details')}>
          <InputWrapper
            style={{
              borderRadius: 4,
              boxShadow: '0 0 0 1px #c6caca, 0 0 0 0 #c9d9e0',
              paddingLeft: 8,
            }}
          >
            <div ref={this.handleCardRef} />
          </InputWrapper>
        </Label>
        {availableCurrencies.length > 1 && (
          <Label text={gettext('Currency')}>
            <Select
              onChange={this.handleChangeCurrency}
              options={availableCurrencies.map(cur => ({
                label: currencies.names[cur],
                key: cur,
              }))}
              value={this.state.currency}
            />
          </Label>
        )}
      </React.Fragment>
    );
  }
}
