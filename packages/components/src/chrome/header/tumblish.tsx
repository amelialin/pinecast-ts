import * as React from 'react';

import {backgroundImage} from '../../styleMixins';
import {BackgroundImage, Image, Text} from '../../primitives';
import {ComponentContext, getsContext} from '../../componentContext';
import {formatColor} from '../../helpers';
import ImageRenderer from '../../common/image';
import styled from '../../styles';
import TextRenderer from '../../common/text';


const Wrapper = styled('header', {
    color: '#fff',
    margin: '0 auto',
    padding: '100px 30px',
    textAlign: 'center',
    maxWidth: 960,
});


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
        <Wrapper style={{...backgroundImage(layout.bgImage, ctx), backgroundColor: formatColor(layout.bgColor, ctx)}}>
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
