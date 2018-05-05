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
            options={[
              {key: 'podcast', label: 'Podcast'},
              {key: 'network', label: 'Network'},
              {key: 'site', label: 'Site'},
              {key: 'blog', label: 'Blog'},
            ]}
            value="podcast"
          />
        </Label>
      ),
    },
  ],
};
