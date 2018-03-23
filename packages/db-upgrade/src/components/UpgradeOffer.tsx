import * as React from 'react';

import Button from '@pinecast/common/Button';
import styled from '@pinecast/styles';
import xhr from '@pinecast/xhr';

import CouponModal from './CouponModal';
import OfferStarter from './offers/OfferStarter';
import OfferPro from './offers/OfferPro';
import {Plan} from '../types';

const ErrorMessage = styled('span', {
  color: '#EF6B6B',
  display: 'flex',
  fontSize: 12,
  marginBottom: 20,
  textAlign: 'center',
});
const Warning = styled('span', {
  color: '#b0b5b5',
  display: 'flex',
  fontSize: 12,
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

export default class UpgradeOffer extends React.PureComponent {
  props: {
    canUseCoupon: boolean;
    currentPlan: Plan;
    onUpgrade: (newPlan: Plan) => void;
    toPlan: Plan;
  };
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
    this.setState({error: null, pending: true});
    const data = new FormData();
    data.append('new_plan', toPlan);
    if (this.state.coupon) {
      data.append('coupon', this.state.coupon);
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
          case 'card_error':
            this.setError(
              'We were unable to charge the card associated with your account.',
            );
            return;
          case 'coupon':
            this.setError(
              'The coupon code you provided is not able to be used.',
            );
            return;
          default:
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
    const {props: {currentPlan, toPlan}, state: {error, pending}} = this;

    const errorMessage = error ? <ErrorMessage>{error}</ErrorMessage> : null;
    const warning = <Warning>Upgrading takes effect immediately.</Warning>;

    if (toPlan === 'starter') {
      return (
        <OfferStarter>
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
        </OfferStarter>
      );
    } else if (toPlan === 'pro') {
      return (
        <OfferPro>
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
        </OfferPro>
      );
    }

    throw new Error(
      `Unexpected plan ${currentPlan} when rendering upgrade offer`,
    );
  }
}
