import * as React from 'react';

import {ComponentContext, getsContext} from '../componentContext';
import {ButtonStyle} from '../primitives';
import {formatColor} from '../helpers';
import styled from '../styles';


const Button = styled('a', {
    border: 0,
    boxShadow: '0 2px 0.5px rgba(0, 0, 0, 0.15)',
    display: 'inline-block',
    lineHeight: '1em',
    textDecoration: 'none',
});


export default getsContext(
    (props: ButtonStyle & {href: string, children?: any, style?: Object}, {ctx}: {ctx: ComponentContext}) =>
        <Button
            href={props.href}
            style={{
                ...props.style,
                backgroundColor: formatColor(props.bgColor, ctx) || 'transparent',
                borderRadius: props.roundedCorners ? 3 : 0,
                color: formatColor(props.textColor, ctx),
                fontSize: props.textSize || 'inherit',
                padding: `${props.paddingY}em ${props.paddingX}em`,
            }}
        >
            {props.children}
        </Button>
);
