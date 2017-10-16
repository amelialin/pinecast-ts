import * as React from 'react';

import {ComponentContext, getsContext} from '../componentContext';
import {ButtonStyle} from '../primitives';
import {formatColor} from '../helpers';
import {prepareStyle} from '../elements/atom';
import styled from '../styles';

const Button = styled('a', {
  border: 0,
  boxShadow: '0 2px 0.5px rgba(0, 0, 0, 0.15)',
  display: 'inline-block',
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
          ...prepareStyle(props.style, ctx),
          backgroundColor:
            formatColor(buttonStyle.bgColor, ctx) || 'transparent',
          borderRadius: buttonStyle.roundedCorners ? 3 : 0,
          color: formatColor(buttonStyle.textColor, ctx),
          fontSize: buttonStyle.textSize || 'inherit',
          padding: `${buttonStyle.paddingY}em ${buttonStyle.paddingX}em`,
        }}
      >
        {props.children}
      </Button>
    );
  },
);
