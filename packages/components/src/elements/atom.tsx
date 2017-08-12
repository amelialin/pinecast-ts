import * as React from 'react';

import {AbstractURL} from '../primitives';
import {ComponentContext, getsContext} from '../componentContext';
import {extractPath} from './extractor';
import {formatColor} from '../helpers';
import {MOBILE_MEDIA_QUERY} from '../media';
import styled from '../styles';


export function prepareProps(item: any, props: Object, ctx: ComponentContext): Object {
    return Object.keys(props).reduce((acc, cur) => {
        switch (cur) {
            case 'href':
                const href: AbstractURL = props[cur];
                acc[cur] = ctx.url(
                    href.name,
                    Object.keys(href.params || {}).reduce((resolvedParams, param) => {
                        resolvedParams[param] = extractPath(item, href.params[param]);
                        return resolvedParams;
                    }, {})
                );
                break;
            case 'src':
                acc[cur] = ctx.resources[props[cur]] || props[cur];
                break;
            default:
                acc[cur] = props[cur];
        }
        return acc;
    }, {});
};

export function prepareStyle(style: Object, ctx: ComponentContext): Object {
    if (!style) {
        return null;
    }
    return Object.keys(style).reduce((acc, cur) => {
        if (cur[0] === ':' || cur[0] === '@') {
            const restyled = prepareStyle(style[cur], ctx);
            if (cur === '@mobile') {
                acc[MOBILE_MEDIA_QUERY] = restyled;
            } else {
                acc[cur] = restyled;
            }
            return acc;
        }
        switch (cur) {
            case 'backgroundColor':
            case 'borderBottomColor':
            case 'borderLeftColor':
            case 'borderRightColor':
            case 'borderTopColor':
            case 'color':
                acc[cur] = formatColor(style[cur], ctx);
                break;
            case 'backgroundImage':
                if (style[cur] in ctx.resources) {
                    acc[cur] = `url(${ctx.resources[style[cur]]})`;
                } else {
                    acc[cur] = style[cur];
                }
                break;
            case 'fontFamily':
                acc[cur] = ctx.fonts[style[cur]] || style[cur];
                break;
            default:
                acc[cur] = style[cur];
        }
        return acc;
    }, {});
};

export default elem => getsContext(
    (
        {children, item, style, ...rest}: {children?: any, item?: any, style: Object, [prop: string]: any},
        {ctx}: {ctx: ComponentContext}
    ) => {
        const Component = styled(elem, prepareStyle(style, ctx), prepareProps(item, rest, ctx));
        return <Component>{children}</Component>;
    }
);
