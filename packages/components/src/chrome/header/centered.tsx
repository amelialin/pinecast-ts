import * as React from 'react';

import {backgroundImage} from '../../styleMixins';
import {BackgroundImage, Image, Text} from '../../primitives';
import {ComponentContext, getsContext} from '../../componentContext';
import {formatColor} from '../../helpers';
import ImageRenderer from '../../common/image';
import styled from '../../styles';
import TextRenderer from '../../common/text';


const Wrapper = styled('header', {
    padding: '200px 25%',
});

const Link = styled('a', ({text}: {text: Text}) => ({
    display: 'block',
    fontSize: text && text.size || 80,
    lineHeight: '1.025em',
    textAlign: 'center',
    textDecoration: 'none',

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
                    bgImage?: BackgroundImage,

                    type: 'text' | 'image',
                    text?: Text,
                    image?: Image,
                },
            },
        {ctx}: {ctx: ComponentContext}
    ) =>
        <Wrapper style={{...backgroundImage(layout.bgImage, ctx), backgroundColor: formatColor(layout.bgColor, ctx)}}>
            <Link
                href={ctx.url('home')}
                style={{
                    fontFamily: layout.text && layout.text.font && ctx.fonts[layout.text.font] || ctx.fonts.logo,
                    color: layout.text ? ctx.colors[layout.text.color] : '#fff',
                }}
                text={layout.text}
            >
                {layout.type === 'text' ?
                    <TextRenderer {...layout.text} /> :
                    <ImageRenderer {...layout.image} />}
            </Link>
        </Wrapper>
);
