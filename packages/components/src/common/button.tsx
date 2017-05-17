import * as React from 'react';
import {styled} from 'styletron-react';

import {ComponentContext, getsContext} from '../componentContext';
import {ButtonStyle} from '../primitives';
import {formatColor} from '../helpers';


const Button = styled('a', (props: {bgColor: string, borderRadius: number, padding: string, textColor: string, textSize: number}) => ({
    backgroundColor: props.bgColor,
    border: 0,
    borderRadius: props.borderRadius,
    boxShadow: '0 2px 0.5px rgba(0, 0, 0, 0.15)',
    color: props.textColor,
    display: 'inline-block',
    fontSize: props.textSize || 'inherit',
    lineHeight: '1em',
    padding: props.padding,
    textDecoration: 'none',
}));


export default getsContext(
    (props: ButtonStyle & {href: string, children?: any, style?: Object}, {ctx}: {ctx: ComponentContext}) =>
        <Button
            bgColor={formatColor(props.bgColor, ctx) || 'transparent'}
            borderRadius={props.roundedCorners ? 3 : 0}
            href={props.href}
            padding={`${props.paddingY}em ${props.paddingX}em`}
            style={props.style}
            textColor={formatColor(props.textColor, ctx)}
            textSize={props.textSize}
        >
            {props.children}
        </Button>
);
