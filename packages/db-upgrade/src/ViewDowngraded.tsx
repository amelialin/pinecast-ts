import * as React from 'react';

import styled from '@pinecast/styles';

import Headline from './components/Headline';
import DowngradeOffer from './components/DowngradeOffer';
import {Plan} from './types';

const Copy = styled('p', {
  fontSize: 16,
  lineHeight: 32,
  margin: '0 auto 20px',
  maxWidth: 500,
  textAlign: 'left',
});

const ViewDowngraded = ({
  currentPlan,
  onDowngrade,
}: {
  currentPlan: Plan;
  onDowngrade: (newPlan: Plan) => void;
}) => (
  <div style={{paddingBottom: 150}}>
    <Headline>Your subscription has been updated.</Headline>
    <Copy>
      We've updated your subscription to the Starter plan, as you've requested.
      Any unused credit from your previous subscription has been applied as
      prorated credit to your Starter subscription.
    </Copy>
    <Copy>
      If there's anything we can help you to adjust to the changes, please don't
      hesitate to let us know.
    </Copy>
    <DowngradeOffer currentPlan={currentPlan} onDowngrade={onDowngrade} />
  </div>
);

export default ViewDowngraded;
