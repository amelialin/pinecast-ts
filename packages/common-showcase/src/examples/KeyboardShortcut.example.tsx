import * as React from 'react';

import {default as KeyboardShortcut} from '@pinecast/common/KeyboardShortcut';

export default {
  name: 'Keyboard shortcut',
  examples: [
    {
      title: 'Letter only',
      render: () => <KeyboardShortcut letter="esc" />,
    },
    {
      title: 'Letter and meta',
      render: () => <KeyboardShortcut letter="s" metaKey />,
    },
    {
      title: 'Letter and option',
      render: () => <KeyboardShortcut letter="s" optionKey />,
    },
    {
      title: 'Letter and option and meta',
      render: () => <KeyboardShortcut letter="s" metaKey optionKey />,
    },
  ],
};
