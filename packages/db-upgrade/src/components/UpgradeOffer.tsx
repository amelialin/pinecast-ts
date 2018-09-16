import {injectStripe, ReactStripeElements} from 'react-stripe-elements';
import * as React from 'react';

import Button from '@pinecast/common/Button';
import styled from '@pinecast/styles';
import xhr from '@pinecast/xhr';

import CouponModal from './CouponModal';
import {Plan} from '../types';
import UpgradeModal, {PaymentRequest} from './UpgradeModal';

const ErrorMessage = styled('span', {
  color: '#EF6B6B',
  display: 'flex',
  fontSize: 12,
  marginBottom: 20,
  textAlign: 'center',
});

const FauxButtonGroup = styled('div', {
  display: 'flex',
  marginBottom: 20,
  justifyContent: 'center',

  ':not(:empty) > .Button-nativeButton:not(:first-child)': {
    marginLeft: 8,
  },
  '@media (max-width: 500px)': {
    alignItems: 'center',
    flexDirection: 'column',
    marginBottom: 8,
    ':not(:empty) > .Button-nativeButton:not(:first-child)': {
      marginBottom: 12,
      marginLeft: 0,
    },
  },
});

type SharedProps = {
  canUseCoupon: boolean;
  chargeCard: boolean;
  currentPlan: Plan;
  onUpgrade: (newPlan: Plan) => void;
  toPlan: Plan;
};

type RawProps = {
  onRequestPayment: PaymentRequest;
};

class UpgradeOffer_ extends React.PureComponent {
  props: SharedProps & RawProps & ReactStripeElements.InjectedStripeProps;
  state: {
    coupon: string | null;
    error: JSX.Element | string | null;
    pending: boolean;
  } = {
    coupon: null,
    error: null,
    pending: false,
  };

  setError(error: string) {
    this.setState({error, pending: false});
  }

  async doUpgrade(toPlan: Plan): Promise<void> {
    if (!this.props.stripe) {
      throw new Error('unreachable');
    }
    this.setState({error: null, pending: true});
    const data = new FormData();
    data.append('new_plan', toPlan);
    if (this.state.coupon) {
      data.append('coupon', this.state.coupon);
    }

    if (this.props.chargeCard) {
      try {
        const {token} = await this.props.stripe.createToken();
        if (!token) {
          throw new Error('Token was undefined');
        }
        data.append('token', token.id);
      } catch (e) {
        console.error(e);
        this.setError('We could not contact our payments provider.');
        return;
      }
    }

    try {
      const req = xhr({
        method: 'POST',
        url: '/payments/services/plan/upgrade',
        body: data,
      });
      const response = JSON.parse(await req);

      this.setState({pending: false});

      if (response.error) {
        switch (response.error) {
          case 'card':
            this.setState({error: null, pending: false});
            try {
              await this.props.onRequestPayment('badCard');
              return this.doUpgrade(toPlan);
            } catch (e) {
              console.error(e);
              this.setError(
                `There was a problem processing your payment: ${e}`,
              );
            }
            return;
          case 'coupon':
            this.setError(
              'The coupon code you provided is not able to be used.',
            );
            return;
          case 'too_often':
            this.setError(
              'Your account was downgraded too recently. Please contact Pinecast support.',
            );
            return;
          default:
            console.error(response.error);
            this.setError('There was a problem while processing your request.');
            return;
        }
      }

      this.setState({error: null, pending: false}, () => {
        this.props.onUpgrade(toPlan);
      });
    } catch (e) {
      this.setError('We could not contact Pinecast.');
    }
  }

  handleCouponChange = (newValue: string | null) => {
    if (!newValue) {
      this.setState({coupon: null});
      return;
    }
    this.setState({
      coupon: newValue.toLowerCase().replace(/[^a-z0-9-]/g, '') || null,
    });
  };

  renderCouponStuff() {
    if (!this.props.canUseCoupon) {
      return null;
    }
    return (
      <CouponModal
        coupon={this.state.coupon}
        onChangeCoupon={this.handleCouponChange}
      />
    );
  }

  handleUpgradeToStarter = () => {
    this.doUpgrade('starter');
  };
  handleUpgradeToPro = () => {
    this.doUpgrade('pro');
  };

  render() {
    const {
      props: {currentPlan, toPlan},
      state: {error, pending},
    } = this;

    const errorMessage = error ? <ErrorMessage>{error}</ErrorMessage> : null;

    if (toPlan === 'starter') {
      return (
        <React.Fragment>
          {errorMessage}
          <FauxButtonGroup>
            <Button
              onClick={this.handleUpgradeToStarter}
              pending={pending}
              size="large"
            >
              Upgrade to Starter
            </Button>
          </FauxButtonGroup>
          {this.renderCouponStuff()}
        </React.Fragment>
      );
    } else if (toPlan === 'pro') {
      return (
        <React.Fragment>
          {errorMessage}
          <FauxButtonGroup>
            <Button
              onClick={this.handleUpgradeToPro}
              pending={pending}
              size="large"
            >
              Upgrade to Pro
            </Button>
          </FauxButtonGroup>
          {this.renderCouponStuff()}
        </React.Fragment>
      );
    }

    throw new Error(
      `Unexpected plan ${currentPlan} when rendering upgrade offer`,
    );
  }
}

const UpgradeOffer = injectStripe(UpgradeOffer_) as React.ComponentType<
  SharedProps & RawProps
>;
export default UpgradeOffer;

export const UpgradeOfferWithModal = (props: SharedProps) => (
  <UpgradeModal>
    {({onRequestPayment, onUpgrade, showingCardModal}) => (
      <UpgradeOffer
        {...props}
        chargeCard={props.chargeCard || showingCardModal}
        onRequestPayment={onRequestPayment}
        onUpgrade={(...args) => {
          onUpgrade();
          props.onUpgrade(...args);
        }}
      />
    )}
  </UpgradeModal>
);
