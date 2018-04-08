import * as React from 'react';

import Callout from '@pinecast/common/Callout';
import styled from '@pinecast/styles';

import components from './components';
import Example from './Example';

const Title = styled('h1', {
  fontSize: 24,
  margin: '0 0 20px',
});

export default class Renderer extends React.Component {
  props: {selected: string};

  render() {
    const inst = components[this.props.selected];
    return (
      <React.Fragment>
        <Title>{inst.name}</Title>
        {inst.callout &&
          inst.callout.map((callout, i) => (
            <Callout key={i} type={callout.type}>
              {callout.value}
            </Callout>
          ))}
        {inst.examples.map(({dark = false, title, render}, i) => (
          <Example dark={dark} key={i} title={title}>
            {render}
          </Example>
        ))}
      </React.Fragment>
    );
  }
}
