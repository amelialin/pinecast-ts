import * as React from 'react';

import Label from '@pinecast/common/Label';
import SelectCustom from '@pinecast/common/SelectCustom';

export default {
  name: 'Select custom',
  examples: [
    {
      title: 'Basic use',
      render: () => (
        <Label text="What would you like to import?">
          <SelectCustom
            onChange={() => {}}
            options={[
              {key: 'podcast', render: () => <b>Podcast</b>},
              {key: 'network', render: () => <i>Network</i>},
              {key: 'site', render: () => <u>Site</u>},
              {
                key: 'blog',
                render: () => <span style={{color: 'blue'}}>Blog</span>,
              },
            ]}
            value="podcast"
          />
        </Label>
      ),
    },
  ],
};
