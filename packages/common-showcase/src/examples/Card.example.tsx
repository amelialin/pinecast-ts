import * as React from 'react';

import Card from '@pinecast/common/Card';

export default {
  name: 'Card',
  examples: [
    {
      title: 'Basic use',
      render: () => <Card>This is a card.</Card>,
    },
    {
      title: 'White back',
      render: () => <Card whiteBack>This is a card.</Card>,
    },
    {
      title: 'No shadow',
      render: () => (
        <Card shadow={false} whiteBack>
          This is a card.
        </Card>
      ),
    },
  ],
};
