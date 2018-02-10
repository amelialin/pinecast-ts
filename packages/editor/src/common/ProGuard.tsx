import {connect} from 'react-redux';
import * as React from 'react';

import styled from '@pinecast/sb-styles';

const Guard = styled('div', {
  opacity: 0.25,
  pointerEvents: 'none',
});

const ProGuard = ({children, isPro}: {children: any; isPro: boolean}) => {
  if (isPro) {
    return React.Children.only(children);
  }

  return <Guard>{children}</Guard>;
};

export default connect(state => ({isPro: state.isPro}))(ProGuard);