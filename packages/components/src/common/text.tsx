import * as React from 'react';

import {ComponentContext, getsContext} from '../componentContext';
import {formatColor} from '../helpers';
import {Text} from '../primitives';


function getContent(token: string, ctx: ComponentContext): string {
    switch (token.substr(1)) {
        case 'podcast.name':
            return ctx.data.podcast.name;
        case 'podcast.subtitle':
            return ctx.data.podcast.subtitle;
        case 'podcast.copyright':
            return ctx.data.podcast.copyright;
    }
    return token;
}

export default getsContext(
    (props: Text & {style?: Object}, {ctx}: {ctx: ComponentContext}) =>
        <span
            style={{
                color: formatColor(props.color, ctx),
                fontFamily: props.font && ctx.fonts[props.font] || ctx.fonts.body,
                fontSize: props.size,
                fontWeight: props.weight || 400,
                textTransform: props.transform,

                ...props.style,
            }}
        >
            {
                props.content[0] === '$' ?
                    getContent(props.content, ctx) :
                    props.content
            }
        </span>
);
