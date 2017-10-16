import * as React from 'react';

import {ComponentContext, getsContext} from '../componentContext';
import {formatColor} from '../helpers';
import styled from '../styles';
import {Text, TextStyle} from '../primitives';

function getContent(token: string, ctx: ComponentContext): string {
  switch (token.substr(1)) {
    case 'podcast.name':
      return ctx.data.podcast.name;
    case 'podcast.subtitle':
      return ctx.data.podcast.subtitle;
    case 'podcast.description':
      return ctx.data.podcast.description;
    case 'podcast.copyright':
      return ctx.data.podcast.copyright;
  }
  return token;
}

const Span = styled('span');

export function computeTextStyle(textStyle: TextStyle, ctx: ComponentContext) {
  return {
    color: formatColor(textStyle.color, ctx),
    fontFamily: (textStyle.font && ctx.fonts[textStyle.font]) || ctx.fonts.body,
    fontSize: textStyle.size,
    fontWeight: textStyle.weight || 400,
    textTransform: textStyle.transform,
  };
}

export default getsContext(
  (props: Text & {style?: Object}, {ctx}: {ctx: ComponentContext}) => (
    <Span
      style={{
        ...computeTextStyle(
          {
            color: 'text',
            ...props,
          } as TextStyle,
          ctx,
        ),
        ...props.style,
      }}
    >
      {props.content[0] === '$'
        ? getContent(props.content, ctx)
        : props.content}
    </Span>
  ),
);
