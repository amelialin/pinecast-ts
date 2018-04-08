import * as React from 'react';

import styled from '@pinecast/styles';

import Example from './Example';

import components from './components';

const Surface = styled('div', {
  backgroundColor: '#f5f5f5',
  height: '100%',
  overflow: 'auto',
  padding: 20,
});

export default class Renderer extends React.Component {
  props: {selected: string};

  render() {
    return (
      <Surface>
        {components[this.props.selected].examples.map(
          ({dark = false, title, render}, i) => (
            <Example dark={dark} key={i} title={title}>
              {render}
            </Example>
          ),
        )}
      </Surface>
    );
  }
}
