import * as React from 'react';

import styled from '@pinecast/sb-styles';

import {DEFAULT_FONT} from './constants';
import {ErrorFlag} from './icons';

const Text = styled('span', ({$oneLine}) => ({
  alignItems: $oneLine ? 'center' : null,
  alignSelf: $oneLine ? 'stretch' : null,
  display: 'flex',
  flex: $oneLine ? '0 0 20%' : null,
  fontFamily: DEFAULT_FONT,
  fontSize: 14,
  fontWeight: 500,
  justifyContent: $oneLine ? 'flex-end' : 'flex-start',
  marginBottom: $oneLine ? 0 : 4,
  marginRight: 8,
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
  color: '#bf1d1d',
  display: 'flex',
  padding: '4px 0',
});

function renderError(error: JSX.Element | string | null): JSX.Element | null {
  if (!error) {
    return null;
  }
  return (
    <ErrorWrap>
      <ErrorFlag color="#EF6B6B" style={{marginRight: 8}} />
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
  children:
    | JSX.Element
    | string
    | Array<JSX.Element | Array<JSX.Element> | string | false | null>;
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
