import * as React from 'react';

import LoadingState from '@pinecast/common/LoadingState';

export default {
  name: 'Loading state',
  examples: [
    {
      title: 'Basic use',
      render: () => <LoadingState title="Hold on, just a minute." />,
    },
  ],
};
