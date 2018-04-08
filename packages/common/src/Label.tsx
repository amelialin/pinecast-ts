import * as React from 'react';

import styled from '@pinecast/styles';

import {Children} from './types';
import {DEFAULT_FONT} from './constants';
import {ErrorFlag} from './icons';

const Text = styled('span', ({$oneLine}: {$oneLine: boolean}) => ({
  alignItems: 'center',
  alignSelf: $oneLine ? 'stretch' : null,
  display: 'flex',
  flex: $oneLine ? '0 0 20%' : null,
  fontFamily: DEFAULT_FONT,
  fontSize: 14,
  fontWeight: 500,
  justifyContent: $oneLine ? 'flex-end' : 'flex-start',
  paddingBottom: $oneLine ? 0 : 4,
  paddingRight: 8,
  maxHeight: $oneLine ? 35 : null,
  textAlign: $oneLine ? 'right' : null,
}));
const SubText = styled('span', {
  display: 'block',
  fontFamily: DEFAULT_FONT,
  fontWeight: 400,
  marginBottom: 4,
});

const OneLineInputWrap = styled('div', {
  display: 'flex',
  flex: '1 1',
  flexDirection: 'column',
});

const ErrorWrap = styled('div', {
  alignItems: 'center',
  color: '#EF6B6B',
  display: 'flex',
  padding: '4px 0',
});

function renderError(error: JSX.Element | string | null): JSX.Element | null {
  if (!error) {
    return null;
  }
  return (
    <ErrorWrap>
      <ErrorFlag color="#EF6B6B" height={20} style={{marginRight: 8}} />
      {error}
    </ErrorWrap>
  );
}

const nativeLabelMap = new Map<string, React.ComponentType<any>>();
nativeLabelMap.set('label', styled('label', {display: 'block', fontSize: 14}));
nativeLabelMap.set('div', styled('div', {display: 'block', fontSize: 14}));

const Label = ({
  $oneLine,
  children,
  componentType = 'label',
  error,
  labelStyle,
  style,
  subText,
  text,
}: {
  $oneLine?: boolean;
  children: Children;
  componentType?: string;
  error?: JSX.Element | string | null;
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
                ? {alignItems: 'center', display: 'flex', paddingBottom: 20}
                : null),
            }
          : null
      }
    >
      <Text $oneLine={$oneLine} style={(!subText && labelStyle) || undefined}>
        {text}
      </Text>
      {subText && <SubText style={labelStyle}>{subText}</SubText>}
      {$oneLine ? (
        <OneLineInputWrap>
          {React.cloneElement(React.Children.only(children), {
            style: {
              margin: 0,
            },
          })}
          {renderError(error || null)}
        </OneLineInputWrap>
      ) : (
        children
      )}
      {!$oneLine && renderError(error || null)}
    </NativeLabel>
  );
};

export default Label;
