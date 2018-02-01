import * as React from 'react';

import styled from '@pinecast/sb-styles';

import ErrorIcon from './icons/ErrorIcon';
import Spinner from './Spinner';

const Wrapper = styled('div', {
  marginBottom: 20,
  padding: '40px 0',
  textAlign: 'center',
});
const TitleWrapper = styled('div', {
  fontSize: 18,
  fontWeight: 500,
});
const TextWrapper = styled('div', {
  marginTop: 8,
});

const ErrorState = ({
  title,
  copy,
}: {
  title: JSX.Element | string;
  copy: JSX.Element | string;
}) => (
  <Wrapper>
    <TitleWrapper>{title}</TitleWrapper>
    {copy && <TextWrapper>{copy}</TextWrapper>}
  </Wrapper>
);

export default ErrorState;
