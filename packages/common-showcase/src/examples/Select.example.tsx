import * as React from 'react';

import Label from '@pinecast/common/Label';
import Select from '@pinecast/common/Select';

export default {
  name: 'Select',
  examples: [
    {
      title: 'Basic use',
      render: () => (
        <Label text="What would you like to import?">
          <Select
            onChange={() => {}}
            options={{
              podcast: 'Podcast',
              network: 'Network',
              site: 'Site',
              blog: 'Blog',
            }}
            value="podcast"
          />
        </Label>
      ),
    },
  ],
};
