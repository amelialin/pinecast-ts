import * as React from 'react';

import Headline from './components/Headline';
import OfferStarter from './components/offers/OfferStarter';
import {Plan} from './types';
import Subheading from './components/Subheading';
import State from './State';
import UpgradeOffer from './components/UpgradeOffer';

const ViewDemoPrevious = () => (
  <State>
    {({onUpgraded, stripeKey}) => (
      <div style={{paddingBottom: 150}}>
        <Headline>Hey there, stranger.</Headline>
        <Subheading>
          Any interest in giving our Starter plan another shot?
        </Subheading>
        <OfferStarter>
          <UpgradeOffer
            canUseCoupon={false}
            currentPlan="demo"
            stripeKey={stripeKey}
            toPlan="starter"
            onUpgrade={onUpgraded}
          />
        </OfferStarter>
      </div>
    )}
  </State>
);

export default ViewDemoPrevious;
