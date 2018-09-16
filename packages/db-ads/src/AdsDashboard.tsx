import * as React from 'react';

import styled from '@pinecast/styles';
import {UpgradeAdvertisements} from '@pinecast/db-upgrade';

import UsageCard from './UsageCard';

const Wrapper = styled('div', {
  display: 'grid',
  gap: 12,
  gridTemplateAreas: '"sidebar main"',
  gridTemplateColumns: '30% 70%',
  marginTop: 20,
});

export default class AdsDashboard extends React.Component {
  static selector = '.placeholder-db-ads';

  static propExtraction = {
    stripeKey: (e: HTMLElement) =>
      e.getAttribute('data-stripe-publishable-key'),
    usageSwaps: (e: HTMLElement) =>
      parseFloat(e.getAttribute('data-usage-swaps') || '0'),
    usageCost: (e: HTMLElement) =>
      parseFloat(e.getAttribute('data-usage-cost') || '0'),
  };

  props: {
    stripeKey: string;
    usageSwaps: number;
    usageCost: number;
  };

  render() {
    return (
      <Wrapper>
        <div>
          <UsageCard
            cost={this.props.usageCost}
            swaps={this.props.usageSwaps}
          />
          <UpgradeAdvertisements
            hasSubscription
            stripeKey={this.props.stripeKey}
          />
        </div>
      </Wrapper>
    );
  }
}
