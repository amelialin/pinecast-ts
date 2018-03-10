import * as React from 'react';

import atom from '../elements/atom';
import {ComponentContext, getsContext} from '../componentContext';

const Button = atom('a', {
  border: 0,
  borderRadius: 0,
  display: 'inline-flex',
  lineHeight: '1em',
  textDecoration: 'none',
});

export default getsContext(
  (
    props: {
      href: string;
      children?: any;
      rel?: string;
      style?: Object;
      target?: '_blank';
    },
    {ctx}: {ctx: ComponentContext},
  ) => {
    return (
      <Button
        data-link={
          typeof props.href !== 'string' || props.href.startsWith('/')
            ? true
            : null
        }
        href={props.href}
        rel={props.rel}
        style={{
          backgroundColor: 'buttons',
          color: 'buttonsText',
          ...(ctx.styling && ctx.styling.buttons),
          ...props.style,
        }}
        target={props.target}
      >
        {props.children}
      </Button>
    );
  },
);
