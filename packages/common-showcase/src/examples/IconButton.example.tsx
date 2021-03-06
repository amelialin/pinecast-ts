import * as React from 'react';

import {Check} from '@pinecast/common/icons';
import IconButton from '@pinecast/common/IconButton';

export default {
  name: 'Icon button',
  examples: [
    {
      title: 'Basic use',
      render: () => <IconButton Component={Check} onClick={() => {}} />,
    },
  ],
};
