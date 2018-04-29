import * as React from 'react';

import CurrentPlan from './components/CurrentPlan';
import DowngradeOffer from './components/DowngradeOffer';
import Headline from './components/Headline';
import State from './State';

const ViewPro = () => (
  <State>
    {({onDowngraded}) => (
      <div style={{paddingBottom: 150}}>
        <Headline>You've got the best we offer.</Headline>
        <CurrentPlan plan="pro" />
        <DowngradeOffer currentPlan="pro" onDowngrade={onDowngraded} />
      </div>
    )}
  </State>
);

export default ViewPro;
