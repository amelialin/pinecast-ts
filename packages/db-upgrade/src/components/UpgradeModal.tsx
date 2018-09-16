import {injectStripe, ReactStripeElements} from 'react-stripe-elements';
import * as React from 'react';

import Button from '@pinecast/common/Button';
import Dialog from '@pinecast/common/Dialog';
import ModalLayer from '@pinecast/common/ModalLayer';
import styled from '@pinecast/styles';

import CreditCardForm from './CreditCardForm';
import Elements from './Elements';

const ErrorWrapper = styled('div', {
  color: '#BF1D1D',
  fontSize: 12,
  margin: '12px auto',
  textAlign: 'center',
});

export type PaymentRequest = (reason: 'badCard' | 'noCard') => Promise<void>;

type Props = {
  children: (
    props: {
      showingCardModal: boolean;
      onRequestPayment: PaymentRequest;
      onUpgrade: () => void;
    },
  ) => React.ReactNode;
};

class UpgradeModal_ extends React.Component {
  props: Props & ReactStripeElements.InjectedStripeProps;
  state: {
    cardProvided: boolean;
    cardResolver: (() => void) | null;
    error: string | null;
    runningCard: boolean;
    showingCardModal: boolean;
  } = {
    cardProvided: false,
    cardResolver: null,
    error: null,
    runningCard: false,
    showingCardModal: false,
  };

  renderError() {
    if (!this.state.error) {
      return null;
    }
    return <ErrorWrapper>{this.state.error}</ErrorWrapper>;
  }

  handleCardReadyChange = (ready: boolean) => {
    this.setState({cardProvided: ready});
  };
  handleModalClose = () => {};
  handleRunCard = () => {
    this.setState({error: null, runningCard: true});
    if (this.state.cardResolver) {
      this.state.cardResolver();
    }
  };
  renderCardModal() {
    return (
      <ModalLayer
        canEscape={false}
        onClose={this.handleModalClose}
        open={this.state.showingCardModal}
      >
        <Dialog
          actions={
            <Button
              $isPrimary
              disabled={!this.state.cardProvided}
              onClick={this.handleRunCard}
              pending={this.state.runningCard}
            >
              Run card
            </Button>
          }
          size="small"
          title="We need an up-to-date credit card"
        >
          {this.renderError()}
          <CreditCardForm onReadyChange={this.handleCardReadyChange} />
        </Dialog>
      </ModalLayer>
    );
  }

  getError(reason: 'badCard' | 'noCard'): string {
    switch (reason) {
      case 'badCard':
        return 'Your bank declined our charge to your card.';
      case 'noCard':
        return "We don't hae an up-to-date card for your account.";
      default:
        return 'Something went wrong.';
    }
  }

  handleRequestPayment = (reason: 'badCard' | 'noCard'): Promise<void> => {
    return new Promise(resolve =>
      this.setState({
        cardResolver: resolve,
        error: this.getError(reason),
        runningCard: false,
        showingCardModal: true,
      }),
    );
  };
  handleUpgrade = () => {
    this.setState({error: null, showingCardModal: false});
  };

  render() {
    return (
      <React.Fragment>
        {this.renderError()}
        {this.renderCardModal()}
        {this.props.children({
          onRequestPayment: this.handleRequestPayment,
          onUpgrade: this.handleUpgrade,
          showingCardModal: this.state.showingCardModal,
        })}
      </React.Fragment>
    );
  }
}

const UpgradeModalStripe = injectStripe(UpgradeModal_) as React.ComponentType<
  Props
>;

export default (props: Props) => (
  <Elements>
    <UpgradeModalStripe {...props} />
  </Elements>
);
