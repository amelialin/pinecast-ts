import * as React from 'react';

import styled from '@pinecast/sb-styles';

const Link = styled('a', {
  color: '#4e7287',

  ':hover': {
    color: '#708d9e',
  },
  ':visited': {
    color: '#8aa3b1',
  },
  ':hover:visited': {
    color: '#9eb4c0',
  },
}) as React.ComponentType<{href: string}>;

export default Link;
