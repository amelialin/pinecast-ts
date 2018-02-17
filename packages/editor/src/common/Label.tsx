import * as React from 'react';

import styled from '@pinecast/sb-styles';

import {DEFAULT_FONT} from './constants';

const Text = styled('span', ({$oneLine}) => ({
  display: 'block',
  flex: $oneLine ? '0 0 20%' : null,
  fontFamily: DEFAULT_FONT,
  fontSize: 14,
  fontWeight: 500,
  marginBottom: 4,
  marginRight: 8,
  textAlign: $oneLine ? 'right' : null,
}));
const SubText = styled('span', {
  display: 'block',
  fontFamily: DEFAULT_FONT,
  fontWeight: 400,
  marginBottom: 4,
});

const nativeLabelMap = new Map<string, React.ComponentType<any>>();
nativeLabelMap.set('label', styled('label', {display: 'block', fontSize: 14}));
nativeLabelMap.set('div', styled('div', {display: 'block', fontSize: 14}));

const Label = ({
  $oneLine,
  children,
  componentType = 'label',
  labelStyle,
  style,
  subText,
  text,
}: {
  $oneLine?: boolean;
  children:
    | JSX.Element
    | string
    | Array<JSX.Element | Array<JSX.Element> | string | false | null>;
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
  if ($oneLine && subText) {
    throw new Error('Cannot have both subText and $oneLine');
  }
  return (
    <NativeLabel
      style={
        style || $oneLine
          ? {
              ...style,
              ...($oneLine
                ? {alignItems: 'center', display: 'flex', marginBottom: 20}
                : null),
            }
          : null
      }
    >
      <Text $oneLine={$oneLine} style={!subText && labelStyle}>
        {text}
      </Text>
      {subText && <SubText style={labelStyle}>{subText}</SubText>}
      {$oneLine
        ? React.Children.map(
            children,
            (child, i) =>
              React.isValidElement(child)
                ? React.cloneElement(child as any, {
                    style: {
                      flex: '1 1',
                      marginTop: 0,
                      marginBottom: 0,
                    },
                  })
                : child,
          )
        : children}
    </NativeLabel>
  );
};

export default Label;
