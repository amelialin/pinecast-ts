import * as React from 'react';

import styled from '@pinecast/sb-styles';

const NativeLabel = styled('label', {display: 'block'});
const Text = styled('span', {
  display: 'block',
  fontFamily: 'Fira Mono',
  fontSize: 13,
  fontWeight: 500,
});

const Label = ({
  children,
  labelStyle,
  style,
  text,
}: {
  children: JSX.Element | string | Array<JSX.Element | Array<JSX.Element>>;
  labelStyle?: React.CSSProperties;
  style?: React.CSSProperties;
  text: JSX.Element | string;
}) => (
  <NativeLabel style={style}>
    <Text style={labelStyle}>{text}</Text>
    {children}
  </NativeLabel>
);

export default Label;
