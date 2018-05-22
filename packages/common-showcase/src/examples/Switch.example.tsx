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
      title: 'Off text',
      render: () => (
        <Toggler>
          {({open, toggle}) => (
            <Switch
              checked={open}
              offText="Disabled"
              onChange={toggle}
              text="Enabled"
            />
          )}
        </Toggler>
      ),
    },
    {
      title: 'Active color',
      render: () => (
        <Toggler>
          {({open, toggle}) => (
            <Switch
              activeColor="#8aa3b1"
              checked={open}
              offText="Line"
              onChange={toggle}
              text="Area"
            />
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
