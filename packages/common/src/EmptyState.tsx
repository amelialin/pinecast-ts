import * as React from 'react';

import styled, {CSS} from '@pinecast/styles';

import Button from './Button';

const Wrapper = styled('div', {
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'column',
  marginBottom: 20,
  padding: '40px 0',
  textAlign: 'center',
});
const TitleWrapper = styled('div', {
  fontSize: 18,
  fontWeight: 500,
});
const TextWrapper = styled('div', {
  marginBottom: 16,
  marginTop: 8,

  ':last-child': {
    marginBottom: 0,
  },
});

const EmptyState = ({
  actionLabel,
  copy,
  onAction,
  style,
  title,
}: {
  actionLabel?: React.ReactNode;
  copy?: React.ReactNode;
  onAction?: () => void;
  style?: CSS;
  title: React.ReactNode;
}) => (
  <Wrapper style={style}>
    <TitleWrapper style={copy ? undefined : {fontSize: 14}}>
      {title}
    </TitleWrapper>
    {copy && <TextWrapper>{copy}</TextWrapper>}
    {actionLabel &&
      onAction && (
        <Button
          onClick={onAction}
          style={{margin: copy ? undefined : '16px 0 0'}}
        >
          {actionLabel}
        </Button>
      )}
  </Wrapper>
);

export default EmptyState;
