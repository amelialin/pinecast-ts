import * as React from 'react';

import Headline from './components/Headline';
import {Plan} from './types';
import Subheading from './components/Subheading';
import UpgradeOffer from './components/UpgradeOffer';

const ViewDemoPrevious = ({
  onPlanUpgraded,
}: {
  onPlanUpgraded: (newPlan: Plan) => void;
}) => (
  <div style={{paddingBottom: 150}}>
    <Headline>Hey there, stranger.</Headline>
    <Subheading>
      Any interest in giving our Starter plan another shot?
    </Subheading>
    <UpgradeOffer
      canUseCoupon={false}
      currentPlan="demo"
      toPlan="starter"
      onUpgrade={onPlanUpgraded}
    />
  </div>
);

export default ViewDemoPrevious;
