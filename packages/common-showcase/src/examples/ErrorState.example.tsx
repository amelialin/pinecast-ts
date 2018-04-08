import * as React from 'react';

import {default as ErrorState} from '@pinecast/common/ErrorState';

export default {
  name: 'Error state',
  examples: [
    {
      title: 'Basic use',
      render: () => (
        <ErrorState title="There was a problem doing the thing you asked to do." />
      ),
    },
  ],
};
