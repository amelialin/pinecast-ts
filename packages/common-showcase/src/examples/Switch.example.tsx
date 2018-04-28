import * as React from 'react';

import Switch from '@pinecast/common/Switch';

import Toggler from '@pinecast/common/Toggler';

export default {
  name: 'Switch',
  examples: [
    {
      title: 'Basic use',
      render: () => (
        <Toggler>
          {({open, toggle}) => (
            <Switch checked={open} onChange={toggle} text="This is a switch." />
          )}
        </Toggler>
      ),
    },
    {
      title: 'Disabled on',
      render: () => (
        <Switch checked disabled onChange={() => {}} text="This is a switch." />
      ),
    },
    {
      title: 'Disabled off',
      render: () => (
        <Switch
          checked={false}
          disabled
          onChange={() => {}}
          text="This is a switch."
        />
      ),
    },
  ],
};
