import * as React from 'react';

import Tabs, {Tab} from '@pinecast/common/Tabs';

export default {
  name: 'Tabs',
  callout: [
    {type: 'negative', value: 'Unstyled focus states'},
    {type: 'negative', value: 'Needs polish'},
  ],
  examples: [
    {
      title: 'Basic use',
      render: () => (
        <Tabs>
          <Tab name="Tab 1">First tab content</Tab>
          <Tab name="Tab 2">Second tab content</Tab>
        </Tabs>
      ),
    },
  ],
};
