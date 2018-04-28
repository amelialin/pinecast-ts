import * as React from 'react';

import Button from '@pinecast/common/Button';
import Progress from '@pinecast/common/Progress';
import styled from '@pinecast/styles';

import Toggler from '@pinecast/common/Toggler';

const Wrap = styled('div', {
  display: 'flex',
});

export default {
  name: 'Progress',
  examples: [
    {
      title: 'Basic use',
      render: () => (
        <Toggler>
          {({open, toggle}) => (
            <Wrap>
              <Button onClick={toggle} style={{marginRight: 12}}>
                Toggle progress
              </Button>
              <Progress percent={open ? 75 : 10} style={{flex: '1 1'}} />
            </Wrap>
          )}
        </Toggler>
      ),
    },
  ],
};
