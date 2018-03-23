import * as React from 'react';

import CurrentPlan from './components/CurrentPlan';
import DowngradeOffer from './components/DowngradeOffer';
import Headline from './components/Headline';
import {Plan} from './types';

const ViewPro = ({
  onPlanDowngraded,
}: {
  onPlanDowngraded: (newPlan: Plan) => void;
}) => (
  <div>
    <Headline>You've got the best we offer.</Headline>
    <CurrentPlan plan="pro" />
    <DowngradeOffer currentPlan="pro" onDowngrade={onPlanDowngraded} />
  </div>
);

export default ViewPro;
