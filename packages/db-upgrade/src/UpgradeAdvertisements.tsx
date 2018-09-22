import * as React from 'react';
import {
  injectStripe,
  ReactStripeElements,
  StripeProvider,
} from 'react-stripe-elements';

import Callout from '@pinecast/common/Callout';
import Card from '@pinecast/common/Card';
import Button from '@pinecast/common/Button';
import {DashboardTitle, P} from '@pinecast/common/Text';
import Group from '@pinecast/common/Group';
import xhr from '@pinecast/xhr';

import MinorPrice from './components/MinorPrice';
import UpgradeModal, {PaymentRequest} from './components/UpgradeModal';

type Props = {
  hasSubscription: boolean;
  stripeKey: string;
};
type InjectedProps = Props &
  ReactStripeElements.InjectedStripeProps & {
    makePaymentToken: boolean;
    onRequestPayment: PaymentRequest;
    onUpgrade: () => void;
  };

class UpgradeAdvertisements_ extends React.Component {
  props: InjectedProps;
  state: {
    error: React.ReactNode | null;
    hasSubscription: boolean;
    pending: boolean;
    wasSubscribed: boolean;
    wasUnsubscribed: boolean;
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      error: null,
      hasSubscription: props.hasSubscription,
      pending: false,
      wasSubscribed: false,
      wasUnsubscribed: false,
    };
  }

  doSubscribe = async (): Promise<void> => {
    this.setState({error: null, pending: true});

    const data = new FormData();
    if (this.props.makePaymentToken) {
      try {
        const {token} = await this.props.stripe!.createToken();
        if (!token) {
          throw new Error('Token was undefined');
        }
        this.props.onUpgrade();
        data.append('token', token.id);
      } catch (e) {
        this.props.onUpgrade();
        console.error(e);
        this.setState({
          error: 'We could not contact our payments provider.',
          pending: false,
        });
        return;
      }
    }

    let response;
    try {
      const req = xhr({
        method: 'POST',
        url: '/payments/services/ads/subscribe',
        body: data,
      });
      response = JSON.parse(await req);
    } catch {
      this.setState({
        error: 'There was a problem creating a subscription.',
        pending: false,
      });
      return;
    }

    if (response.error) {
      if (response.error === 'card') {
        this.setState({error: null, pending: false});
        try {
          await this.props.onRequestPayment('badCard');
          return this.doSubscribe();
        } catch (e) {
          console.error(e);
          this.setState({
            error: 'There was a problem processing your payment.',
          });
        }
      } else if (response.error === 'invalid') {
        this.setState({
          error:
            'We cannot create a subscription. Please contact Pinecast support.',
          pending: false,
        });
      } else {
        this.setState({
          error: 'An unknown error occurred. Please try again later.',
          pending: false,
        });
      }
      return;
    }
    this.setState({error: null, pending: false, wasSubscribed: true});
  };
  doUnsubscribe = async () => {
    this.setState({error: null, pending: true});
    try {
      const req = xhr({
        method: 'POST',
        url: '/payments/services/ads/unsubscribe',
      });
      const response = JSON.parse(await req);
      if (response.error) {
        this.setState({error: response.error});
      }
      this.setState({error: null, pending: false, wasUnsubscribed: true});
      window.location.reload();
    } catch {
      this.setState({
        error:
          'There was a problem canceling your subscription. Please contact Pinecast support.',
      });
    }
  };

  renderWasSubscribed() {
    return (
      <Callout
        action={
          <Button onClick={() => window.location.reload()} size="small">
            Continue
          </Button>
        }
        type="positive"
      >
        We successfully created your subscription.
      </Callout>
    );
  }
  renderWasUnsubscribed() {
    return (
      <Callout type="info">We successfully canceled your subscription.</Callout>
    );
  }

  render() {
    const {
      error,
      hasSubscription,
      pending,
      wasSubscribed,
      wasUnsubscribed,
    } = this.state;

    if (wasSubscribed) {
      return this.renderWasSubscribed();
    }
    if (wasUnsubscribed) {
      return this.renderWasUnsubscribed();
    }

    let content;
    if (!hasSubscription) {
      content = (
        <Card
          style={{maxWidth: 450, textAlign: 'center', width: '100%'}}
          whiteBack
        >
          <DashboardTitle>
            Simple pricing to enable Advertisements
          </DashboardTitle>
          <Group
            spacing={12}
            wrapperStyle={{justifyContent: 'center', margin: '0 0 24px'}}
          >
            <MinorPrice amount={500} size={26} unit="mo" />
            <span>+</span>
            <MinorPrice amount={2} size={26} unit="swap" />
          </Group>
          <P style={{paddingRight: 0}}>
            You'll only pay when advertisements are swapped out of your
            episodes. A swap is an update to one episode.
          </P>
          <Button
            $isPrimary
            onClick={this.doSubscribe}
            pending={pending}
            size="large"
            style={{margin: '0 auto'}}
          >
            Create subscription
          </Button>
        </Card>
      );
    } else {
      content = (
        <Card whiteBack>
          <DashboardTitle>No longer need Advertisements?</DashboardTitle>
          <P style={{paddingRight: 0}}>
            Canceling your Advertisements subscription will not cancel your
            account's paid plan.
          </P>
          <Button
            onClick={this.doUnsubscribe}
            pending={pending}
            style={{margin: '0 auto 0 0'}}
          >
            Cancel subscription
          </Button>
        </Card>
      );
    }

    if (!error) {
      return content;
    }

    return (
      <React.Fragment>
        <Callout type="negative">{error}</Callout>
        {content}
      </React.Fragment>
    );
  }
}

const UpgradeAdvertisementsWrapped = injectStripe(
  UpgradeAdvertisements_ as React.ComponentType<InjectedProps>,
);

export default class UpgradeAdvertisements extends React.Component {
  static selector = '.placeholder-upgrade-ads';

  static propExtraction = {
    hasSubscription: (e: HTMLElement) =>
      e.getAttribute('data-has-subscription') == 'true',
    stripeKey: (e: HTMLElement) =>
      e.getAttribute('data-stripe-publishable-key'),
  };

  props: Props;

  render() {
    return (
      <StripeProvider apiKey={this.props.stripeKey}>
        <UpgradeModal>
          {({onRequestPayment, onUpgrade, showingCardModal}) => (
            <UpgradeAdvertisementsWrapped
              {...this.props}
              makePaymentToken={showingCardModal}
              onRequestPayment={onRequestPayment}
              onUpgrade={onUpgrade}
            />
          )}
        </UpgradeModal>
      </StripeProvider>
    );
  }
}
