import * as React from 'react';

import Button from '@pinecast/common/Button';
import Card from '@pinecast/common/Card';
import Toggler from '@pinecast/common/Toggler';
import {CloseableLayer} from '@pinecast/common/Layer';

export default {
  name: 'Layer',
  examples: [
    {
      title: 'Closeable layer',
      render: () => (
        <Toggler>
          {({open, toggle}) => (
            <React.Fragment>
              <Button onClick={toggle}>Toggle</Button>
              {open && (
                <CloseableLayer onClose={toggle} x={300} y={300}>
                  <Card whiteBack>Press ESC to close</Card>
                </CloseableLayer>
              )}
            </React.Fragment>
          )}
        </Toggler>
      ),
    },
  ],
};
