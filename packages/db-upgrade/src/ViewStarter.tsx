import * as React from 'react';

import ProBadge from '@pinecast/common/ProBadge';

import CurrentPlan from './components/CurrentPlan';
import DowngradeOffer from './components/DowngradeOffer';
import Headline from './components/Headline';
import {Plan} from './types';
import UpgradeOffer from './components/UpgradeOffer';

const ViewPro = ({
  onPlanDowngraded,
  onPlanUpgraded,
}: {
  onPlanDowngraded: (newPlan: Plan) => void;
  onPlanUpgraded: (newPlan: Plan) => void;
}) => (
  <div style={{paddingBottom: 150}}>
    <Headline>
      Ready to go <ProBadge style={{fontSize: '1em', paddingRight: 7}} />?
    </Headline>
    <UpgradeOffer
      canUseCoupon={false}
      currentPlan="starter"
      onUpgrade={onPlanUpgraded}
      toPlan="pro"
    />
    <DowngradeOffer currentPlan="starter" onDowngrade={onPlanDowngraded} />
  </div>
);

export default ViewPro;
