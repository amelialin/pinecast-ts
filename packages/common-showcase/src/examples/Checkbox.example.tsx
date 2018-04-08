import * as React from 'react';

import Checkbox from '@pinecast/common/Checkbox';

export default {
  name: 'Checkbox',
  examples: [
    {
      title: 'Unchecked',
      render: () => (
        <Checkbox checked={false} onChange={() => {}} text="Unchecked" />
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
