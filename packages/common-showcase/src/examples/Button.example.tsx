import * as React from 'react';

import {ButtonGroup, default as Button} from '@pinecast/common/Button';

export default {
  name: 'Button',
  examples: [
    {
      title: 'Sizes',
      render: () => (
        <React.Fragment>
          <div>
            <Button size="small">Small</Button>
          </div>
          <div>
            <Button size="normal">Normal</Button>
          </div>
          <div>
            <Button size="large">Large</Button>
          </div>
        </React.Fragment>
      ),
    },
    {
      title: 'Primary',
      render: () => <Button $isPrimary>Primary</Button>,
    },
    {
      title: 'Button Group',
      render: () => (
        <ButtonGroup>
          <Button>Cancel</Button>
          <Button $isPrimary>Submit</Button>
        </ButtonGroup>
      ),
    },
    {
      title: 'Disabled',
      render: () => <Button disabled>Disabled</Button>,
    },
    {
      title: 'Shortcut key',
      render: () => (
        <ButtonGroup>
          <Button shortcut={{letter: 'esc'}}>Cancel</Button>
          <Button shortcut={{letter: 's', metaKey: true}}>Save</Button>
        </ButtonGroup>
      ),
    },
  ],
};
