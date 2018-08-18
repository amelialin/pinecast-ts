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
          <Tag color="gray">Gray</Tag>
          <Tag color="green">Green</Tag>
          <Tag color="blue">Blue</Tag>
          <Tag color="red">Red</Tag>
        </Group>
      ),
    },
    {
      title: 'Sizes',
      render: () => (
        <Group spacing={12}>
          <Tag color="green" size="small">
            Small
          </Tag>
          <Tag color="green" size="medium">
            Medium
          </Tag>
          <Tag color="green" size="large">
            Large
          </Tag>
        </Group>
      ),
    },
    {
      title: 'With delete button',
      render: () => (
        <React.Fragment>
          <div style={{marginBottom: 12}}>
            <Group spacing={12}>
              <Tag color="gray" deleteButton size="small" onDelete={() => {}}>
                Gray
              </Tag>
              <Tag color="green" deleteButton size="small" onDelete={() => {}}>
                Green
              </Tag>
              <Tag color="blue" deleteButton size="small" onDelete={() => {}}>
                Blue
              </Tag>
              <Tag color="red" deleteButton size="small" onDelete={() => {}}>
                Red
              </Tag>
            </Group>
          </div>
          <div style={{marginBottom: 12}}>
            <Group spacing={12}>
              <Tag color="gray" deleteButton size="medium" onDelete={() => {}}>
                Gray
              </Tag>
              <Tag color="green" deleteButton size="medium" onDelete={() => {}}>
                Green
              </Tag>
              <Tag color="blue" deleteButton size="medium" onDelete={() => {}}>
                Blue
              </Tag>
              <Tag color="red" deleteButton size="medium" onDelete={() => {}}>
                Red
              </Tag>
            </Group>
          </div>
          <div style={{marginBottom: 12}}>
            <Group spacing={12}>
              <Tag color="gray" deleteButton size="large" onDelete={() => {}}>
                Gray
              </Tag>
              <Tag color="green" deleteButton size="large" onDelete={() => {}}>
                Green
              </Tag>
              <Tag color="blue" deleteButton size="large" onDelete={() => {}}>
                Blue
              </Tag>
              <Tag color="red" deleteButton size="large" onDelete={() => {}}>
                Red
              </Tag>
            </Group>
          </div>
        </React.Fragment>
      ),
    },
  ],
};
