import * as React from 'react';

import {ButtonGroup, default as Button} from '@pinecast/common/Button';
import ButtonLabel from '@pinecast/common/ButtonLabel';

export default {
  name: 'Button label',
  examples: [
    {
      title: 'Sizes',
      render: () => (
        <React.Fragment>
          <div style={{marginBottom: 8}}>
            <ButtonLabel message="This is a label">
              <Button size="small">Small</Button>
            </ButtonLabel>
          </div>
          <div style={{marginBottom: 8}}>
            <ButtonLabel message="This is a label">
              <Button>Normal</Button>
            </ButtonLabel>
          </div>
          <div>
            <ButtonLabel message="This is a label">
              <Button size="large">Large</Button>
            </ButtonLabel>
          </div>
        </React.Fragment>
      ),
    },
    {
      title: 'Types',
      render: () => (
        <React.Fragment>
          <div style={{marginBottom: 8}}>
            <ButtonLabel message="This is a label">
              <Button>Normal</Button>
            </ButtonLabel>
          </div>
          <div style={{marginBottom: 8}}>
            <ButtonLabel message="This is a label" type="negative">
              <Button>Negative</Button>
            </ButtonLabel>
          </div>
          <div>
            <ButtonLabel message="This is a label" type="positive">
              <Button>Positive</Button>
            </ButtonLabel>
          </div>
        </React.Fragment>
      ),
    },
    {
      title: 'With button group',
      render: () => (
        <ButtonLabel message="This is a label">
          <ButtonGroup>
            <Button>Click</Button>
            <Button>Click</Button>
            <Button>Click</Button>
          </ButtonGroup>
        </ButtonLabel>
      ),
    },
    {
      title: 'Sides',
      render: () => (
        <React.Fragment>
          <div style={{marginBottom: 8}}>
            <ButtonLabel message="This is a label" position="right">
              <Button>Right</Button>
            </ButtonLabel>
          </div>
          <div>
            <ButtonLabel message="This is a label" position="left">
              <Button>Left</Button>
            </ButtonLabel>
          </div>
        </React.Fragment>
      ),
    },
  ],
};
