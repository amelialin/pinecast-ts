import * as React from 'react';

import Button from '@pinecast/common/Button';
import ContextMenu from '@pinecast/common/ContextMenu';

import Toggler from '@pinecast/common/Toggler';

export default {
  name: 'Context menu',
  examples: [
    {
      title: 'Basic use at fixed point',
      render: () => (
        <Toggler>
          {({toggle, open}) => (
            <div>
              <Button onClick={toggle}>Toggle menu</Button>
              <ContextMenu
                open={open}
                onClose={() => toggle(false)}
                onSelect={() => {}}
                options={[
                  {name: 'First option', slug: 'first'},
                  {name: 'Second option', slug: 'second'},
                ]}
                x={350}
                y={200}
              />
            </div>
          )}
        </Toggler>
      ),
    },
    {
      title: 'Pre-selected at fixed point',
      render: () => (
        <Toggler>
          {({toggle, open}) => (
            <div>
              <Button onClick={toggle}>Toggle menu</Button>
              <ContextMenu
                open={open}
                onClose={() => toggle(false)}
                onSelect={() => {}}
                options={[
                  {name: 'First option', slug: 'first'},
                  {name: 'Second option', slug: 'second'},
                ]}
                toSelect="second"
                x={350}
                y={200}
              />
            </div>
          )}
        </Toggler>
      ),
    },
  ],
};
