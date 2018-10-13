import * as React from 'react';

import {defineMessages, FormattedMessage} from '@pinecast/i18n';
import Group from '@pinecast/common/Group';
import styled, {CSS} from '@pinecast/styles';
import Tag from '@pinecast/common/Tag';

import {Children} from './types';
import {DEFAULT_FONT} from './constants';
import InlineError from './InlineError';

const messages = defineMessages({
  optional: {
    id: 'common.Label.optional',
    description: 'Optional tag text for labels',
    defaultMessage: 'Optional',
  },
});

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
  error?: React.ReactNode;
  labelStyle?: React.CSSProperties;
  optional?: boolean;
  style?: React.CSSProperties;
  subText?: React.ReactNode;
  text: React.ReactNode;
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
      <Tag size="small">
        <FormattedMessage {...messages.optional} />
      </Tag>
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
          {Boolean(error) && <InlineError error={error} />}
        </OneLineInputWrap>
      ) : (
        children
      )}
      {!$oneLine && Boolean(error) && <InlineError error={error} />}
    </NativeLabel>
  );
};

export default Label;
