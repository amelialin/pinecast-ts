import * as React from 'react';

import styled from '@pinecast/styles';

const Guard = styled('div', {
  opacity: 0.25,
  pointerEvents: 'none',
});

const ProGuard = ({children, isPro}: {children: any; isPro: boolean}) => {
  if (isPro) {
    return React.Children.only(children);
  }

  return <Guard>{React.Children.only(children)}</Guard>;
};

export default ProGuard;
