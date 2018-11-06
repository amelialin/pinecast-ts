import * as React from 'react';

import Card from '@pinecast/common/Card';
import HorizontalRule from '@pinecast/common/HorizontalRule';
import Tabs, {Tab} from '@pinecast/common/Tabs';
import {UpgradeAdvertisements} from '@pinecast/db-upgrade';

import InventoryPanel from './dashboards/InventoryPanel';
import PodcastsPanel from './dashboards/PodcastsPanel';
import TagsPanel from './dashboards/TagsPanel';
import UsageCard from './UsageCard';

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
      <Card style={{marginTop: 20}} whiteBack>
        <Tabs>
          <Tab name="Inventory">
            <InventoryPanel />
          </Tab>
          <Tab name="Podcasts">
            <PodcastsPanel />
          </Tab>
          <Tab name="Tags">
            <TagsPanel />
          </Tab>
          <Tab name="Subscription">
            <UsageCard
              cost={this.props.usageCost}
              swaps={this.props.usageSwaps}
            />
            <HorizontalRule />
            <UpgradeAdvertisements
              hasSubscription
              stripeKey={this.props.stripeKey}
            />
          </Tab>
        </Tabs>
      </Card>
    );
  }
}
