import * as React from 'react';

import styled from '@pinecast/sb-styles';

const NativeLabel = styled('label', {display: 'block'});
const Text = styled('span', {
  display: 'block',
  fontFamily: 'Fira Mono',
  fontSize: 13,
  fontWeight: 500,
  margin: 0,
});

const Label = ({
  children,
  style,
  text,
}: {
  children: JSX.Element | string | Array<JSX.Element | Array<JSX.Element>>;
  style?: React.CSSProperties;
  text: JSX.Element | string;
}) => (
  <NativeLabel _style={style}>
    <Text>{text}</Text>
    {children}
  </NativeLabel>
);

export default Label;
