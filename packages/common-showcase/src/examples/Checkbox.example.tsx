import * as React from 'react';

import Checkbox from '@pinecast/common/Checkbox';
import Toggler from '@pinecast/common/Toggler';

export default {
  name: 'Checkbox',
  examples: [
    {
      title: 'Unchecked',
      render: () => (
        <Toggler>
          {({open, toggle}) => (
            <Checkbox checked={open} onChange={toggle} text="Unchecked" />
          )}
        </Toggler>
      ),
    },
    {
      title: 'Checked',
      render: () => <Checkbox checked onChange={() => {}} text="Checked" />,
    },
    {
      title: 'Disabled',
      render: () => (
        <Checkbox checked disabled onChange={() => {}} text="Checked" />
      ),
    },
  ],
};
