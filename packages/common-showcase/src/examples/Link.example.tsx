import * as React from 'react';

import {default as Link} from '@pinecast/common/Link';

export default {
  name: 'Link',
  examples: [
    {
      title: 'Basic use',
      render: () => (
        <Link href="https://pinecast.com">This is the link text.</Link>
      ),
    },
  ],
};
