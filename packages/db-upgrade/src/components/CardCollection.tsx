import * as React from 'react';

import Button from '@pinecast/common/Button';

type PublicCheckoutSettings = {
  amount?: number;
  description?: string;
  email?: string;
  label?: string;
  name?: string;
  panelLabel?: string;
};
type StripeCheckoutSettings = PublicCheckoutSettings & {
  allowRememberMe?: boolean;
  billingAddress?: boolean;
  closed?: () => void;
  currency?: string;
  image?: string;
  key: string;
  locale?: string;
  opened?: () => void;
  shippingAddress?: boolean;
  token: (token: {id: string; email: string}) => void;
  zipCode?: boolean;
};
declare const StripeCheckout: {
  configure: (
    settings: StripeCheckoutSettings,
  ) => {
    close: () => void;
    open: (settings?: Partial<StripeCheckoutSettings>) => void;
  };
};

export default class CardCollection extends React.Component {
  props: {
    config?: PublicCheckoutSettings;
    label?: string;
    onGotToken: (token: string) => void;
    stripeKey: string;
  };

  static defaultProps = {
    label: 'Add a payment card',
  };

  handleToken = (token: {id: string}) => {
    this.props.onGotToken(token.id);
  };

  handleClick = () => {
    const handler = StripeCheckout.configure({
      key: this.props.stripeKey,
      image: '/static/img/256x256.png',
      token: this.handleToken,
      zipCode: true,
    });
    handler.open(this.props.config);
  };

  render() {
    return <Button onClick={this.handleClick}>{this.props.label}</Button>;
  }
}
