import * as React from 'react';

import {Check} from '@pinecast/common/icons';
import Group from '@pinecast/common/Group';

export default {
  name: 'Group',
  examples: [
    {
      title: 'Basic use',
      render: () => (
        <div>
          <Group spacing={20}>
            <Check />
            <Check />
            <Check />
            <Check />
          </Group>
          <Group spacing={40}>
            <Check />
            <Check />
            <Check />
            <Check />
          </Group>
        </div>
      ),
    },
    {
      title: 'Style prop',
      render: () => (
        <div>
          <Group spacing={20} style={{background: 'red'}}>
            <div style={{height: 20, width: 20}} />
            <div style={{height: 20, width: 20}} />
            <div style={{height: 20, width: 20}} />
            <div style={{height: 20, width: 20}} />
          </Group>
        </div>
      ),
    },
  ],
};
