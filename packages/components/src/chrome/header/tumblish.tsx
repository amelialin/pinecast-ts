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
    color: '#fff',
    margin: '0 auto',
    padding: '100px 30px',
    textAlign: 'center',
    width: 960,
}));


export default getsContext(
    (
        {layout}:
            {
                layout: {
                    bgColor: string,
                    bgImage?: BackgroundImage,

                    logo?: Image,
                    heading: Text,
                    subHeading: Text,
                },
            },
        {ctx}: {ctx: ComponentContext}
    ) =>
        <Wrapper
            bgColor={ctx.colors[layout.bgColor]}
            bgImage={backgroundImage(layout.bgImage, ctx)}
        >
            {layout.logo && <ImageRenderer {...layout.logo} />}
            <h1>
                <a href={ctx.url('home')} style={{fontSize: 40}}>
                    <TextRenderer {...layout.heading} />
                </a>
            </h1>
            <h2>
                {layout.subHeading && <TextRenderer {...layout.subHeading} />}
            </h2>
        </Wrapper>
);
