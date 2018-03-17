import * as React from 'react';

import styled from '@pinecast/styles';

import './Spinner.css';

const typeStyles = {
  default: null,
  focus: {
    backgroundColor: '#8d52d1',
  },
  subtle: {
    backgroundColor: '#fff',
  },
};

const Container = styled('div', {
  alignItems: 'center',
  display: 'flex',
  justifyContent: 'center',
});
const Dot = styled('i', {
  animationName: 'waiting-bounce',
  animationDuration: '1s',
  animationIterationCount: 'infinite',
  backgroundColor: '#aaa',
  borderRadius: 20,
  height: 10,
  margin: '0 2px',
  width: 10,
});

const Spinner = ({
  style,
  type = 'default',
}: {
  style?: React.CSSProperties;
  type: 'default' | 'focus' | 'subtle';
}) => (
  <Container style={style}>
    <Dot style={{...typeStyles[type], animationDelay: '0s'}} />
    <Dot style={{...typeStyles[type], animationDelay: '0.33s'}} />
    <Dot style={{...typeStyles[type], animationDelay: '0.66s'}} />
  </Container>
);

export default Spinner;
