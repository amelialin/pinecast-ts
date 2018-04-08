import * as React from 'react';

import {default as Spinner} from '@pinecast/common/Spinner';

export default {
  name: 'Spinner',
  examples: [
    {
      title: 'Basic use',
      render: () => <Spinner />,
    },
    {
      title: 'Focus',
      render: () => <Spinner type="focus" />,
    },
    {
      title: 'Subtle',
      dark: true,
      render: () => <Spinner type="subtle" />,
    },
  ],
};
