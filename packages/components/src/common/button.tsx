import * as React from 'react';

import atom from '../elements/atom';
import {ComponentContext, getsContext} from '../componentContext';

const Button = atom(
  'a',
  {
    border: 0,
    borderRadius: 0,
    display: 'inline-flex',
    lineHeight: '1em',
    textDecoration: 'none',
  },
  {'data-link': true},
);

export default getsContext(
  (
    props: {href: string; children?: any; style?: Object},
    {ctx}: {ctx: ComponentContext},
  ) => {
    return (
      <Button
        href={props.href}
        style={{
          backgroundColor: 'buttons',
          color: 'buttonsText',
          ...(ctx.styling && ctx.styling.buttons),
          ...props.style,
        }}
      >
        {props.children}
      </Button>
    );
  },
);
