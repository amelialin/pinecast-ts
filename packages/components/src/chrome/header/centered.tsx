import * as React from 'react';
import {styled} from 'styletron-react';

import {backgroundImage} from '../../styleMixins';
import {BackgroundImage, Image, Text} from '../../primitives';
import {ComponentContext, getsContext} from '../../componentContext';
import ImageRenderer from '../../common/image';
import TextRenderer from '../../common/text';


const Wrapper = styled('header', (props: {bgColor, bgImage}) => ({
    ...props.bgImage,
    backgroundColor: props.bgColor,
    padding: '200px 25%',
}));

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
        <Wrapper
            bgColor={ctx.colors[layout.bgColor]}
            bgImage={backgroundImage(layout.bgImage, ctx)}
        >
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
