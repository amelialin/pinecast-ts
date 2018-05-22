import * as React from 'react';

import styled, {CSS} from '@pinecast/styles';

const Link = styled('a', {
  color: '#4e7287',

  ':hover': {
    color: '#708d9e',
  },
  ':visited': {
    color: '#7f8486',
  },
  ':hover:visited': {
    color: '#708d9e',
  },
}) as React.ComponentType<{
  href: string;
  rel?: string;
  style?: CSS;
  target?: '_blank';
}>;

export default Link;
