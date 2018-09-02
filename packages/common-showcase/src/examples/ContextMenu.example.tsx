import * as React from 'react';

import Button from '@pinecast/common/Button';
import Group from '@pinecast/common/Group';
import ContextMenu, {
  KebabIconMenu,
  MeatballIconMenu,
} from '@pinecast/common/ContextMenu';

import Toggler from '@pinecast/common/Toggler';

export default {
  name: 'Context menu',
  examples: [
    {
      title: 'Basic use',
      render: () => (
        <Toggler>
          {({toggle, open}) => (
            <ContextMenu
              open={open}
              onClose={() => toggle(false)}
              onSelect={() => {}}
              options={[
                {name: 'First option', slug: 'first'},
                {name: 'Second option', slug: 'second'},
              ]}
            >
              <Button onClick={toggle}>Toggle menu</Button>
            </ContextMenu>
          )}
        </Toggler>
      ),
    },
    {
      title: 'Pre-selected',
      render: () => (
        <Toggler>
          {({toggle, open}) => (
            <ContextMenu
              open={open}
              onClose={() => toggle(false)}
              onSelect={() => {}}
              options={[
                {name: 'First option', slug: 'first'},
                {name: 'Second option', slug: 'second'},
              ]}
              toSelect="second"
            >
              <Button onClick={toggle}>Toggle menu</Button>
            </ContextMenu>
          )}
        </Toggler>
      ),
    },
    {
      title: 'Icon menus',
      render: () => (
        <Group spacing={16}>
          <KebabIconMenu
            onSelect={() => {}}
            options={[
              {name: 'First option', slug: 'first'},
              {name: 'Second option', slug: 'second'},
            ]}
          />
          <MeatballIconMenu
            onSelect={() => {}}
            options={[
              {name: 'First option', slug: 'first'},
              {name: 'Second option', slug: 'second'},
            ]}
          />
        </Group>
      ),
    },
  ],
};
