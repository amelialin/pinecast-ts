import * as React from 'react';

import styled from '@pinecast/styles';

import Button from './Button';
import ErrorIcon from './icons/ErrorIcon';
import Spinner from './Spinner';

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
});

const EmptyState = ({
  actionLabel,
  copy,
  onAction,
  title,
}: {
  actionLabel?: JSX.Element | string;
  copy: JSX.Element | string;
  onAction?: () => void;
  title: JSX.Element | string;
}) => (
  <Wrapper>
    <TitleWrapper>{title}</TitleWrapper>
    {copy && <TextWrapper>{copy}</TextWrapper>}
    {actionLabel &&
      onAction && <Button onClick={onAction}>{actionLabel}</Button>}
  </Wrapper>
);

export default EmptyState;
