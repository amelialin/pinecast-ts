import * as React from 'react';

import {CSS} from '@pinecast/styles';

import atom from '../elements/atom';
import {ComponentContext, getsContext} from '../componentContext';

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

export default getsContext(
  (
    props: {
      content: string;
      style?: CSS;
      element?: string;
      extends?: CSS;
      [key: string]: any;
    },
    {ctx}: {ctx: ComponentContext},
  ) => {
    const {content, element, extends: extends_, style, ...rest} = props;
    const Span = atom(element || 'span');
    return (
      <Span
        {...rest}
        style={{
          ...extends_,
          ...style,
        }}
      >
        {content[0] === '$' ? getContent(content, ctx) : content}
      </Span>
    );
  },
);
