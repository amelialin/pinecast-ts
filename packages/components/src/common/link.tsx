import * as React from 'react';

import styled from '@pinecast/sb-styles';

import {ComponentContext, getsContext} from '../componentContext';
import {computeTextStyle} from './text';
import {TextStyle} from '../primitives';

const Link = styled('a');

export default getsContext(
  (
    {
      children,
      href,
      params,
      style,
      textStyle,
      targetPage,
      ...rest,
    }: {
      children?: any;
      href?: string;
      params?: {[param: string]: string};
      style?: Object;
      textStyle?: TextStyle;
      targetPage?: string;
    },
    {ctx}: {ctx: ComponentContext},
  ) => (
    <Link
      {...rest}
      href={href || ctx.url(targetPage, params)}
      style={{
        ...textStyle ? computeTextStyle(textStyle, ctx) : null,
        ...style,
      }}
    >
      {children}
    </Link>
  ),
);
