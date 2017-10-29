import * as React from 'react';

import styled from '@pinecast/sb-styles';

import {ComponentContext, getsContext} from '../componentContext';
import {ButtonStyle} from '../primitives';
import {prepareStyle} from '../elements/atom';

const Button = styled('a', {
  border: 0,
  borderRadius: 0,
  display: 'inline-flex',
  lineHeight: '1em',
  textDecoration: 'none',
});

export default getsContext(
  (
    props: {href: string; children?: any; style?: Object},
    {ctx}: {ctx: ComponentContext},
  ) => {
    const buttonStyle = ctx.styling.buttons || ({} as ButtonStyle);
    return (
      <Button
        href={props.href}
        style={{
          backgroundColor: ctx.colors.buttons || 'transparent',
          color: ctx.colors.buttonsText || '#000',
          ...prepareStyle({...buttonStyle, ...props.style}, ctx),
        }}
      >
        {props.children}
      </Button>
    );
  },
);
