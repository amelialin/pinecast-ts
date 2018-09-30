import * as React from 'react';

import Label from '@pinecast/common/Label';
import Range from '@pinecast/common/Range';

export default {
  name: 'Range',
  examples: [
    {
      title: 'Basic use',
      render: () => (
        <Label text="Text input field">
          <Range onChange={() => {}} max={100} min={0} value={10} />
        </Label>
      ),
    },
    {
      title: 'Labels',
      render: () => (
        <Label text="Text input field">
          <Range
            onChange={() => {}}
            max={100}
            maxLabel="High"
            min={0}
            minLabel="Low"
            value={10}
          />
        </Label>
      ),
    },
  ],
};
