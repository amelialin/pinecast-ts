import * as React from 'react';

import DeleteButton from '@pinecast/common/DeleteButton';

export default {
  name: 'Delete button',
  callout: [
    {
      type: 'negative',
      value: 'Focus state is weird',
    },
  ],
  examples: [
    {
      title: 'Basic use',
      render: () => <DeleteButton onClick={() => {}} />,
    },
  ],
};
