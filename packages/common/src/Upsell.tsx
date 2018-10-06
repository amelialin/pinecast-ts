import * as React from 'react';

import styled from '@pinecast/styles';

import Button from './Button';

const Wrapper = styled('div', {
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'column',
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
});

const Upsell = ({
  actionLabel,
  copy,
  onAction,
  title,
}: {
  actionLabel?: React.ReactNode;
  copy: React.ReactNode;
  onAction?: () => void;
  title: React.ReactNode;
}) => (
  <Wrapper>
    <TitleWrapper>{title}</TitleWrapper>
    {copy && <TextWrapper>{copy}</TextWrapper>}
    {actionLabel &&
      onAction && <Button onClick={onAction}>{actionLabel}</Button>}
  </Wrapper>
);

export default Upsell;
