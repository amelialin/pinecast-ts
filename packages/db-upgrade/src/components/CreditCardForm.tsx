import {CardElement} from 'react-stripe-elements';
import * as React from 'react';

import {DEFAULT_FONT} from '@pinecast/common/constants';
import styled from '@pinecast/styles';

import State from '../State';

const cardStyles = {
  base: {
    color: '#44484d',
    fontFamily: DEFAULT_FONT,
    fontSize: '18px',
    fontSmoothing: 'antialiased',
    lineHeight: '36px',

    '::placeholder': {
      color: '#dee1df',
    },
  },
};

const invalidBoxShadow = '0 0 0 1px #bf1d1d, 0 0 0 0 #c9d9e0';

const Wrapper = styled('div', ({$invalid}) => ({
  backgroundColor: '#fff',
  borderRadius: 4,
  maxWidth: 400,
  margin: '0 auto',

  ':not(:empty) .StripeElement': {
    borderRadius: 3,
    boxShadow: $invalid
      ? invalidBoxShadow
      : '0 0 0 1px #c6caca, 0 0 0 0 #c9d9e0',
    padding: '0 8px',
    transition: 'box-shadow 0.2s',
  },
  ':not(:empty) .StripeElement--focus': {
    boxShadow: $invalid
      ? '0 0 0 1px #bf1d1d, 0 0 0 4px #FEDEDE !important'
      : '0 0 0 1px #c6caca, 0 0 0 4px #c9d9e0',
  },
  ':not(:empty) .StripeElement--invalid': {
    boxShadow: '0 0 0 1px #bf1d1d, 0 0 0 0 #c9d9e0',
  },
  ':not(:empty) .StripeElement--invalid.StripeElement--focus': {
    boxShadow: '0 0 0 1px #bf1d1d, 0 0 0 4px #FEDEDE',
  },
}));

class CreditCardForm extends React.PureComponent {
  props: {
    invalid?: boolean;
    onReadyChange: (ready: boolean) => void;
  };

  handleReady = (change: {complete: boolean}) => {
    this.props.onReadyChange(change.complete);
  };

  render() {
    return (
      <Wrapper $invalid={this.props.invalid}>
        <CardElement onChange={this.handleReady} style={cardStyles} />
      </Wrapper>
    );
  }
}

export default CreditCardForm;
