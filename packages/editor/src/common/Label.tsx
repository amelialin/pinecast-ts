import * as React from 'react';

import styled from '@pinecast/sb-styles';

const Text = styled('span', {
  display: 'block',
  fontFamily: 'Fira Mono',
  fontSize: 15,
  fontWeight: 500,
});

const Label = ({
  children,
  componentType = 'label',
  labelStyle,
  style,
  text,
}: {
  children: JSX.Element | string | Array<JSX.Element | Array<JSX.Element>>;
  componentType?: string;
  labelStyle?: React.CSSProperties;
  style?: React.CSSProperties;
  text: JSX.Element | string;
}) => {
  const NativeLabel = styled(componentType, {display: 'block', fontSize: 13});
  return (
    <NativeLabel style={style}>
      <Text style={labelStyle}>{text}</Text>
      {children}
    </NativeLabel>
  );
};

export default Label;
