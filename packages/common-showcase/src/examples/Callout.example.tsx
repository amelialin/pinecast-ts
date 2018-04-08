import * as React from 'react';

import {default as Callout} from '@pinecast/common/Callout';

export default {
  name: 'Callout',
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
