import * as React from 'react';

import styled from '@pinecast/sb-styles';

import {ComponentContext, getsContext} from '../componentContext';
import {Image} from '../primitives';

const Img = styled('img');

export default getsContext(
  (props: Image & {style?: Object}, {ctx}: {ctx: ComponentContext}) => (
    <Img
      alt={props.alt || ''}
      src={props.resourceId ? ctx.resources[props.resourceId] : props.src}
      style={{
        ...!props.dimensions
          ? null
          : {width: props.dimensions[0], height: props.dimensions[1]},
        ...props.style,
      }}
    />
  ),
);
