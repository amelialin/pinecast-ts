import * as React from 'react';

import DualOffer from './components/offers/DualOffer';
import Headline from './components/Headline';
import State from './State';

const ViewDemo = () => (
  <State>
    {({onUpgraded}) => (
      <div>
        <Headline>Is your podcast ready for the good stuff?</Headline>
        <DualOffer onUpgraded={onUpgraded} />
      </div>
    )}
  </State>
);

export default ViewDemo;
