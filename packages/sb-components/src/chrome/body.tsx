import * as React from 'react';

import styled from '@pinecast/styles';

import block from './block';
import {ComponentContext, getsContext} from '../componentContext';
import {prepareStyle} from '../elements/atom'; // TODO: Move this to someplace generic

const Body = styled('body');

const BodyComponent = getsContext(
  ({children}: {children?: any}, {ctx}: {ctx: ComponentContext}) => (
    <Body style={prepareStyle(ctx.styling.page, ctx) || undefined}>
      {block(ctx.layout.header)}
      {children}
      {block(ctx.layout.footer)}
    </Body>
  ),
);

export default BodyComponent;
