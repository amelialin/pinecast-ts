import * as React from 'react';

import Label from '@pinecast/common/Label';
import Range from '@pinecast/common/Range';

export default {
  name: 'Range',
  callout: [
    {type: 'negative', value: 'No appropriate focus states'},
    {type: 'negative', value: 'Style guidelines not followed'},
  ],
  examples: [
    {
      title: 'Basic use',
      render: () => (
        <Label text="Text input field">
          <Range onChange={() => {}} max={100} min={0} value={10} />
        </Label>
      ),
    },
  ],
};
