import * as React from 'react';

import styled from '@pinecast/styles';

import Button from './Button';
import ErrorIcon from './icons/ErrorIcon';

const Wrapper = styled('div', {
  padding: '40px 0',
  textAlign: 'center',
});
const TextWrapper = styled('div');

const ErrorState = ({
  actionLabel,
  onAction,
  title,
}: {
  actionLabel?: JSX.Element | string;
  onAction?: () => void;
  title: JSX.Element | string;
}) => (
  <Wrapper>
    <ErrorIcon size={40} style={{marginBottom: 10}} />
    <TextWrapper>{title}</TextWrapper>
    {actionLabel &&
      onAction && (
        <Button onClick={onAction} size="small" style={{marginTop: 20}}>
          {actionLabel}
        </Button>
      )}
  </Wrapper>
);

export default ErrorState;
