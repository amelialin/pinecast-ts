import * as React from 'react';

import {ComponentContext, getsContext} from '../../componentContext';
import {formatColor} from '../../helpers';
import {Image, Text} from '../../primitives';
import ImageRenderer from '../../common/image';
import styled from '../../styles';
import TextRenderer from '../../common/text';


const Wrapper = styled('header', null);
const InnerWrapper = styled('div', {
    height: 100,
    lineHeight: 100,
    margin: '0 auto',
    maxWidth: 960,
});

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
        <Wrapper style={{backgroundColor: formatColor(layout.bgColor, ctx)}}>
            <InnerWrapper>
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
            </InnerWrapper>
        </Wrapper>
);
