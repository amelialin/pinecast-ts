const {default: Confetti} = require('react-dom-confetti');
import * as React from 'react';

import Button from '@pinecast/common/Button';
import {Click, MovingTruck, Network, Pay} from '@pinecast/common/icons/medium';
import styled from '@pinecast/styles';

import Feature from './components/Feature';
import Headline from './components/Headline';
import Subheading from './components/Subheading';
import {Plan} from './types';

const Copy = styled('p', {
  fontSize: 16,
  lineHeight: 32,
  margin: '0 auto 20px',
  maxWidth: 500,
  textAlign: 'left',
});

const ButtonCenter = styled('div', {
  display: 'flex',
  justifyContent: 'center',
});

export default class ViewUpgraded extends React.PureComponent {
  props: {
    currentPlan: Plan;
    previousPlan: Plan;
  };
  state: {active: boolean} = {active: false};

  componentDidMount() {
    this.setState({active: true});
  }

  render() {
    const {currentPlan, previousPlan} = this.props;

    return (
      <div style={{paddingBottom: 150}}>
        <Headline>Your account has been upgraded!</Headline>
        <div style={{margin: '0 auto', width: 0}}>
          <Confetti
            active={this.state.active}
            config={{
              angle: 90,
              spread: 132,
              startVelocity: 20,
              elementCount: 40,
              decay: 0.91,
            }}
          />
        </div>
        {currentPlan === 'starter' && (
          <Subheading>You're now on the Starter plan.</Subheading>
        )}
        {currentPlan === 'pro' && (
          <Subheading>You're now on the Pro plan.</Subheading>
        )}
        <Copy>
          {previousPlan === 'demo' &&
            'We will charge your card every month on this date. '}
          If you have any questions or concerns, please don't hesitate to reach
          out through the chat box in the lower right corner of every page.
        </Copy>
        {currentPlan === 'starter' && (
          <Feature
            callToActionText="Import a podcast"
            description={`
          Use our podcast import tool to quickly and easily move your podcast
          to Pinecast. Our import tool will do all of the heavy lifting for
          you—after importing you only need to set up a feed redirect.
        `}
            icon={<MovingTruck />}
            link="/dashboard/new_podcast#import"
            title="Import a podcast to Pinecast"
          />
        )}
        {currentPlan === 'starter' && (
          <Feature
            description={`
          Once you've gotten your podcast settled in, set up a podcast website
          on the Site tab of your podcast dashboard. All of our sites are SEO
          optimized and come with HTTPS.
        `}
            icon={<Click />}
            iconRight
            title="Start a podcast homepage"
          />
        )}
        {currentPlan === 'pro' && (
          <Feature
            callToActionText="Create a network"
            description={`
          Bring all of your network's podcasts together, even if the other
          hosts don't have a Pro account themselves.
        `}
            icon={<Network />}
            iconRight
            link="/dashboard/network/new"
            title="Start collaborating"
          />
        )}
        <Feature
          callToActionText="Set up your tip jar"
          description={`
          Set up your tip jar to start receiving tips from your listeners.
          We can credit the funds to a debit card or deposit them into your
          bank account.
        `}
          icon={<Pay />}
          link="/dashboard#settings,tip-jar"
          title="Start getting paid"
        />
        <ButtonCenter>
          <Button
            onClick={() => {
              window.location.href = '/dashboard';
            }}
          >
            Go to my dashboard
          </Button>
        </ButtonCenter>
      </div>
    );
  }
}
