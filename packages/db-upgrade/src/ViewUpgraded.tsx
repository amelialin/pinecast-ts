import * as React from 'react';

import Card from '@pinecast/common/Card';
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

const ViewUpgraded = ({
  currentPlan,
  previousPlan,
}: {
  currentPlan: Plan;
  previousPlan: Plan;
}) => (
  <div style={{paddingBottom: 150}}>
    <Headline>Your account has been upgraded!</Headline>
    {currentPlan === 'starter' && (
      <Subheading>You're now on the Starter plan.</Subheading>
    )}
    {currentPlan === 'pro' && (
      <Subheading>You're now on the Pro plan.</Subheading>
    )}
    <Copy>
      {previousPlan === 'demo' &&
        'We will charge your card every month on this date. '}
      If you have any questions or concerns, please don't hesitate to reach out
      through the chat box in the lower right corner of every page.
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

export default ViewUpgraded;
