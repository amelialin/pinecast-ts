import * as React from 'react';

import ErrorState from '@pinecast/common/ErrorState';

export default {
  name: 'Error state',
  examples: [
    {
      title: 'Basic use',
      render: () => (
        <ErrorState title="There was a problem doing the thing you asked to do." />
      ),
    },
    {
      title: 'With action',
      render: () => (
        <ErrorState
          actionLabel="Retry"
          title="Oopsie-daisy!"
          onAction={() => {}}
        />
      ),
    },
  ],
};
