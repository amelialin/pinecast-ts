import * as React from 'react';

import styled from '@pinecast/sb-styles';

import ErrorIcon from './icons/ErrorIcon';
import Spinner from './Spinner';

const Wrapper = styled('div', {
  padding: '40px 0',
  textAlign: 'center',
});
const TextWrapper = styled('div');

const ErrorState = ({title}: {title: JSX.Element | string}) => (
  <Wrapper>
    <ErrorIcon size={40} style={{marginBottom: 10}} />
    <TextWrapper>{title}</TextWrapper>
  </Wrapper>
);

export default ErrorState;
