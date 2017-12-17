import * as React from 'react';

import styled from '@pinecast/sb-styles';

import Spinner from './Spinner';

const Wrapper = styled('div', {
  padding: '40px 0',
  textAlign: 'center',
});
const TextWrapper = styled('div');

const LoadingState = ({title}: {title: JSX.Element | string}) => (
  <Wrapper>
    <Spinner type="focus" style={{marginBottom: 20}} />
    <TextWrapper>{title}</TextWrapper>
  </Wrapper>
);

export default LoadingState;
