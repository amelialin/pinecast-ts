import * as React from 'react';

import Button from '@pinecast/common/Button';
import Collapser from '@pinecast/common/Collapser';

import Toggler from '../helpers/Toggler';

export default {
  name: 'Collapser',
  examples: [
    {
      title: 'Basic use',
      render: () => (
        <Toggler>
          {({toggle, open}) => (
            <div>
              <Button onClick={toggle}>Toggle collapser</Button>
              <Collapser open={open} shave={0}>
                This is the collapsed content!<br />It can be as long as you
                want.
              </Collapser>
            </div>
          )}
        </Toggler>
      ),
    },
    {
      title: 'Shave',
      render: () => (
        <Toggler>
          {({toggle, open}) => (
            <div>
              <Button onClick={toggle}>Toggle collapser</Button>
              <Collapser open={open} shave={8}>
                We are shaving the last 8px<br />from the content of this
                collapser
              </Collapser>
            </div>
          )}
        </Toggler>
      ),
    },
  ],
};
