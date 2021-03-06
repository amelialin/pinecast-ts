import * as React from 'react';

import PaddingInput from '@pinecast/common/PaddingInput';

export default {
  name: 'Padding input',
  examples: [
    {
      title: 'Basic use',
      render: () => (
        <PaddingInput
          onChange={() => {}}
          value={{top: 0, right: 0, bottom: 0, left: 0}}
        />
      ),
    },
    {
      title: 'As percent',
      render: () => (
        <PaddingInput
          onChange={() => {}}
          unit="%"
          value={{top: 0, right: 0, bottom: 0, left: 0}}
        />
      ),
    },
    {
      title: 'Disabled',
      render: () => (
        <PaddingInput
          disabled
          onChange={() => {}}
          value={{top: 0, right: 0, bottom: 0, left: 0}}
        />
      ),
    },
    {
      title: 'Invalid (all)',
      render: () => (
        <PaddingInput
          invalid
          onChange={() => {}}
          value={{top: 0, right: 0, bottom: 0, left: 0}}
        />
      ),
    },
    {
      title: 'Invalid (some)',
      render: () => (
        <PaddingInput
          invalid={{top: false, right: false, bottom: true, left: true}}
          onChange={() => {}}
          value={{top: 0, right: 0, bottom: 0, left: 0}}
        />
      ),
    },
  ],
};
