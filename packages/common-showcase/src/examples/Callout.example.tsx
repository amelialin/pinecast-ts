import * as React from 'react';

import Button from '@pinecast/common/Button';
import Callout from '@pinecast/common/Callout';

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
    {
      title: 'With action',
      render: () => (
        <React.Fragment>
          <Callout
            action={<Button size="small">Okay thanks</Button>}
            type="info"
          >
            Info callout
          </Callout>
          <Callout
            action={<Button size="small">Fix it</Button>}
            type="negative"
          >
            Oh no
          </Callout>
          <Callout
            action={<Button size="small">Do something</Button>}
            type="positive"
          >
            Positive callout
          </Callout>
        </React.Fragment>
      ),
    },
  ],
};
