import * as React from 'react';

import styled from '@pinecast/sb-styles';

import {DEFAULT_FONT} from './constants';

const Text = styled('span', {
  display: 'block',
  fontFamily: DEFAULT_FONT,
  fontWeight: 500,
  marginBottom: 5,
});
const SubText = styled('span', {
  display: 'block',
  fontFamily: DEFAULT_FONT,
  fontWeight: 400,
  marginBottom: 5,
});

const nativeLabelMap = new Map<string, React.ComponentType<any>>();
nativeLabelMap.set('label', styled('label', {display: 'block', fontSize: 14}));
nativeLabelMap.set('div', styled('div', {display: 'block', fontSize: 14}));

const Label = ({
  children,
  componentType = 'label',
  labelStyle,
  style,
  subText,
  text,
}: {
  children: JSX.Element | string | Array<JSX.Element | Array<JSX.Element>>;
  componentType?: string;
  labelStyle?: React.CSSProperties;
  style?: React.CSSProperties;
  subText?: JSX.Element | string;
  text: JSX.Element | string;
}) => {
  if (!nativeLabelMap.has(componentType)) {
    nativeLabelMap.set(
      componentType,
      styled(componentType, {display: 'block', fontSize: 14}),
    );
  }
  const NativeLabel = nativeLabelMap.get(componentType);
  if (!NativeLabel) {
    throw new Error(`Could not build styled component for ${componentType}`);
  }
  return (
    <NativeLabel style={style}>
      <Text style={!subText && labelStyle}>{text}</Text>
      {subText && <SubText style={labelStyle}>{subText}</SubText>}
      {children}
    </NativeLabel>
  );
};

export default Label;
