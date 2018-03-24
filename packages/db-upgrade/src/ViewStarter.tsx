import * as React from 'react';

import ProBadge from '@pinecast/common/ProBadge';

import CurrentPlan from './components/CurrentPlan';
import DowngradeOffer from './components/DowngradeOffer';
import Headline from './components/Headline';
import OfferPro from './components/offers/OfferPro';
import {Plan} from './types';
import State from './State';
import UpgradeOffer from './components/UpgradeOffer';

const ViewPro = () => (
  <State>
    {({onDowngraded, onUpgraded, stripeKey}) => (
      <div style={{paddingBottom: 150}}>
        <Headline>
          Ready to go <ProBadge style={{fontSize: '1em', paddingRight: 7}} />?
        </Headline>
        <OfferPro>
          <UpgradeOffer
            canUseCoupon={false}
            currentPlan="starter"
            onUpgrade={onUpgraded}
            stripeKey={stripeKey}
            toPlan="pro"
          />
        </OfferPro>
        <DowngradeOffer currentPlan="starter" onDowngrade={onDowngraded} />
      </div>
    )}
  </State>
);

export default ViewPro;
