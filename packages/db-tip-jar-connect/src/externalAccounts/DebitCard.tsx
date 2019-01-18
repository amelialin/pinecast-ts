import * as React from 'react';

import {defineMessages, FormattedMessage} from '@pinecast/i18n';

import Label from '@pinecast/common/Label';
import stripe from '../stripe';
import {InputWrapper} from '@pinecast/common/TextInput';

const messages = defineMessages({
  debitCardWarning: {
    id: 'db-tip-jar-connect.DebitCard.warning',
    description: 'Warning for debit card use',
    defaultMessage:
      'Visa and MasterCard debit cards are accepted. Credit cards are not supported.',
  },
  cardDetails: {
    id: 'db-tip-jar-connect.DebitCard.cardDetails.label',
    description: 'Label for card details field',
    defaultMessage: 'Card details',
  },
});

const cardStyle = {
  base: {},
};

export default class DebitCard extends React.Component {
  props: {
    country: string;
  };
  state: {
    complete: boolean;
  };

  // TODO: Type these
  elements: any = null;
  card: any = null;

  cardEl: HTMLDivElement | null = null;

  constructor(props: DebitCard['props']) {
    super(props);
    this.state = {
      complete: false,
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
    return stripe.createToken(this.card, {currency: 'usd'});
  }

  handleCardRef = (ref: HTMLDivElement | null) => {
    this.cardEl = ref;
  };
  handleChangeCurrency = (currency: string) => {
    this.setState({currency});
  };

  render() {
    return (
      <React.Fragment>
        <p>
          <FormattedMessage {...messages.debitCardWarning} />
        </p>
        <Label text={<FormattedMessage {...messages.cardDetails} />}>
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
      </React.Fragment>
    );
  }
}
