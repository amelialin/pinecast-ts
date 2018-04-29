import * as React from 'react';

import ProBadge from '@pinecast/common/ProBadge';

import DowngradeOffer from './components/DowngradeOffer';
import Headline from './components/Headline';
import OfferPro from './components/offers/OfferPro';
import State from './State';
import {UpgradeOfferWithModal} from './components/UpgradeOffer';

const ViewStarter = () => (
  <State>
    {({onDowngraded, onUpgraded}) => (
      <div style={{paddingBottom: 150}}>
        <Headline>
          Ready to go <ProBadge style={{fontSize: '1em', paddingRight: 7}} />?
        </Headline>
        <OfferPro>
          <UpgradeOfferWithModal
            canUseCoupon={false}
            chargeCard={false}
            currentPlan="starter"
            onUpgrade={onUpgraded}
            toPlan="pro"
          />
        </OfferPro>
        <DowngradeOffer currentPlan="starter" onDowngrade={onDowngraded} />
      </div>
    )}
  </State>
);

export default ViewStarter;
