import * as React from 'react';

import {default as Callout} from '@pinecast/common/Callout';

export default {
  name: 'Callout',
  callout: [
    {
      type: 'negative',
      value: 'Low contrast on negative',
    },
    {
      type: 'negative',
      value: 'Low contrast on positive',
    },
  ],
  examples: [
    {
      title: 'Info',
      render: () => <Callout type="info">Info callout</Callout>,
    },
    {
      title: 'Negative',
      render: () => <Callout type="negative">Negative callout</Callout>,
    },
    {
      title: 'Positive',
      render: () => <Callout type="positive">Positive callout</Callout>,
    },
  ],
};
