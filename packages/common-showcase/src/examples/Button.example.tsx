import * as React from 'react';

import {ButtonGroup, default as Button} from '@pinecast/common/Button';

export default {
  name: 'Button',
  examples: [
    {
      title: 'Sizes',
      render: () => (
        <ButtonGroup>
          <Button size="small">Small</Button>
          <Button size="normal">Normal</Button>
          <Button size="large">Large</Button>
        </ButtonGroup>
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
          <Button size="large" shortcut={{letter: 'esc'}}>
            Cancel
          </Button>
          <Button
            $isPrimary
            size="large"
            shortcut={{letter: 's', metaKey: true}}
          >
            Save
          </Button>
          <Button shortcut={{letter: 'esc'}}>Cancel</Button>
          <Button $isPrimary shortcut={{letter: 's', metaKey: true}}>
            Save
          </Button>
          <Button size="small" shortcut={{letter: 'esc'}}>
            Cancel
          </Button>
          <Button
            $isPrimary
            size="small"
            shortcut={{letter: 's', metaKey: true}}
          >
            Save
          </Button>
        </ButtonGroup>
      ),
    },
  ],
};
