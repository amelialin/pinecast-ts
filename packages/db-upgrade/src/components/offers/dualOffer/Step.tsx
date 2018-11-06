import * as React from 'react';

import styled, {CSS} from '@pinecast/styles';

const Wrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  padding: '36px 0',
});

const Label = styled('strong', {
  color: '#4e7287',
  flex: '0 0 0',
  fontSize: 16,
  fontWeight: 500,
  marginBottom: 28,
  textAlign: 'center',
});
const Container = styled('div', {
  flex: '1 1',
});

const Step = ({
  children,
  innerStyle,
  name,
  outerStyle,
}: {
  children: React.ReactNode;
  innerStyle?: CSS;
  name: string;
  outerStyle?: CSS;
}) => (
  <Wrapper style={outerStyle}>
    <Label>{name}</Label>
    <Container style={innerStyle}>{children}</Container>
  </Wrapper>
);

export default Step;
