import * as React from 'react';

import Group from '@pinecast/common/Group';
import styled, {CSS} from '@pinecast/styles';
import Tag from '@pinecast/common/Tag';

import {Children} from './types';
import {DEFAULT_FONT} from './constants';
import {ErrorFlag} from './icons';

const Text = styled(
  'span',
  ({
    $oneLine,
    $oneLineCollapse,
  }: {
    $oneLine: boolean;
    $oneLineCollapse: boolean;
  }) => ({
    alignItems: 'center',
    alignSelf: $oneLine ? 'stretch' : undefined,
    display: 'flex',
    flex: $oneLine ? `0 0 ${$oneLineCollapse ? '' : '30%'}` : undefined,
    fontFamily: DEFAULT_FONT,
    fontSize: 14,
    fontWeight: 500,
    justifyContent: $oneLine ? 'flex-end' : 'flex-start',
    paddingBottom: $oneLine ? 0 : 8,
    paddingRight: 8,
    maxHeight: $oneLine ? 35 : undefined,
    textAlign: $oneLine ? 'right' : undefined,
    whiteSpace: $oneLineCollapse ? 'nowrap' : undefined,
  }),
);
const SubText = styled('span', {
  display: 'block',
  fontFamily: DEFAULT_FONT,
  fontWeight: 400,
  marginBottom: 8,
  marginTop: -4,
});

const OneLineInputWrap = styled('div', {
  display: 'flex',
  flex: '1 1',
  flexDirection: 'column',
});

const ErrorWrap = styled('div', {
  alignItems: 'center',
  color: '#d24242',
  display: 'flex',
  padding: '4px 0',
});

function renderError(error: JSX.Element | string | null): JSX.Element | null {
  if (!error) {
    return null;
  }
  return (
    <ErrorWrap>
      <ErrorFlag color="#d24242" height={20} style={{marginRight: 8}} />
      {error}
    </ErrorWrap>
  );
}

const nativeLabelStyles: CSS = {
  display: 'block',
  flex: '1 1',
  fontSize: 14,
  marginBottom: 20,
};

const nativeLabelMap = new Map<string, React.ComponentType<any>>();
nativeLabelMap.set('label', styled('label', nativeLabelStyles));
nativeLabelMap.set('div', styled('div', nativeLabelStyles));

const Label = ({
  $oneLine,
  $oneLineCollapse,
  children,
  componentType = 'label',
  error,
  labelStyle,
  optional,
  style,
  subText,
  text,
}: {
  $oneLine?: boolean;
  $oneLineCollapse?: boolean;
  children: Children;
  componentType?: string;
  error?: JSX.Element | string | null;
  labelStyle?: React.CSSProperties;
  optional?: boolean;
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
  const contents = optional ? (
    <Group spacing={8}>
      {text}
      <Tag>Optional</Tag>
    </Group>
  ) : (
    text
  );
  return (
    <NativeLabel
      className="Label--NativeLabel"
      style={
        style || $oneLine
          ? {
              ...style,
              ...($oneLine ? {alignItems: 'center', display: 'flex'} : null),
            }
          : null
      }
    >
      <Text
        $oneLine={$oneLine || false}
        $oneLineCollapse={$oneLineCollapse || false}
        style={(!subText && labelStyle) || undefined}
      >
        {contents}
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
