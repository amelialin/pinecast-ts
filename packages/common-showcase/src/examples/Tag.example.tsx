import * as React from 'react';

import Group from '@pinecast/common/Group';
import Tag from '@pinecast/common/Tag';

export default {
  name: 'Tag',
  examples: [
    {
      title: 'Basic use',
      render: () => (
        <Group spacing={12}>
          <Tag $color="gray">Gray</Tag>
          <Tag $color="green">Green</Tag>
          {/*<Tag $color="blue">Blue</Tag>*/}
          {/*<Tag $color="yellow">Yellow</Tag>*/}
          <Tag $color="red">Red</Tag>
        </Group>
      ),
    },
  ],
};
