import * as React from 'react';

import styled, {CSS} from '@pinecast/styles';

import {Children} from './types';

const StackedSection = styled(
  'div',
  {
    border: '1px solid #dee1df',
    borderRadius: 4,
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 2,
    padding: 12,

    ':not(:empty) ~ .StackedSection--outerWrapper': {
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
    },
    ':not(:last-of-type)': {
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
    },
  },
  {className: 'StackedSection--outerWrapper'},
);

export default StackedSection as React.ComponentType<{
  children: Children;
  className?: string;
  style?: CSS;
}>;
