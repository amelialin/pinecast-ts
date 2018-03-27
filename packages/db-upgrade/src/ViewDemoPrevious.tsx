import * as React from 'react';

import Headline from './components/Headline';
import OfferStarter from './components/offers/OfferStarter';
import {Plan} from './types';
import Subheading from './components/Subheading';
import State from './State';
import {UpgradeOfferWithModal} from './components/UpgradeOffer';

const ViewDemoPrevious = () => (
  <State>
    {({onUpgraded}) => (
      <div style={{paddingBottom: 150}}>
        <Headline>Hey there, stranger.</Headline>
        <Subheading>
          Any interest in giving our Starter plan another shot?
        </Subheading>
        <OfferStarter>
          <UpgradeOfferWithModal
            canUseCoupon={false}
            chargeCard={false}
            currentPlan="demo"
            toPlan="starter"
            onUpgrade={onUpgraded}
          />
        </OfferStarter>
      </div>
    )}
  </State>
);

export default ViewDemoPrevious;
