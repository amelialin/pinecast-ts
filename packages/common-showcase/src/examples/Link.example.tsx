import * as React from 'react';

import Link from '@pinecast/common/Link';

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
