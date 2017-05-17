import * as React from 'react';
import {styled} from 'styletron-react';

import {ComponentContext, getsContext} from '../../componentContext';
import {formatColor} from '../../helpers';
import {Image, Text} from '../../primitives';
import ImageRenderer from '../../common/image';
import TextRenderer from '../../common/text';


const Wrapper = styled('header', () => ({
    height: 100,
    lineHeight: '100px',
    margin: '0 auto',
    maxWidth: 960,
}));

const Link = styled('a', ({text}: {text: Text}) => ({
    display: 'inline-block',
    fontSize: text && text.size || 36,
    lineHeight: '1em',
    textDecoration: 'none',
    verticalAlign: 'middle',

    ':hover': {
        textDecoration: 'underline',
    },
}));


export default getsContext(
    (
        {layout}:
            {
                layout: {
                    bgColor: string,

                    type: 'text' | 'image',
                    text?: Text,
                    image?: Image,
                }
            },
        {ctx}: {ctx: ComponentContext}
    ) =>
        <div style={{backgroundColor: formatColor(layout.bgColor, ctx)}}>
            <Wrapper>
                <Link
                    href={ctx.url('home')}
                    style={{
                        color: layout.text ? formatColor(layout.text.color, ctx) : ctx.colors.accent,
                    }}
                    text={layout.text}
                >
                    {layout.type === 'text' ?
                        <TextRenderer {...layout.text} /> :
                        <ImageRenderer {...layout.image} />}
                </Link>
            </Wrapper>
        </div>
);
