import * as React from 'react';

import {backgroundImage} from '../../styleMixins';
import {ButtonStyle, Text} from '../../primitives';
import ButtonRenderer from '../../common/button';
import {ComponentContext, getsContext} from '../../componentContext';
import {formatColor} from '../../helpers';
import ImageRenderer from '../../common/image';
import styled from '../../styles';
import TextRenderer from '../../common/text';


const Wrapper = styled('nav', {
    alignItems: 'center',
    color: '#fff',
    display: 'flex',
    justifyContent: 'space-around',
    margin: '0 auto',
    padding: '40px 15px',
    maxWidth: 960,

    '@media (max-width: 700px)': {
        flexDirection: 'column',
    },
});


const marginStyles = {
    marginLeft: '0.5em',

    '@media (max-width: 700px)': {
        marginLeft: 0,
        marginTop: '0.5em',
    },
};


export default getsContext(
    (
        {layout}:
            {
                layout: {
                    bgColor: string,
                    text?: Text,
                    buttonStyle: ButtonStyle,
                },
            },
        {ctx}: {ctx: ComponentContext}
    ) =>
        <Wrapper style={{backgroundColor: formatColor(layout.bgColor, ctx)}}>
            {layout.text &&
                <TextRenderer {...layout.text} style={{flex: '1 1'}} />}

            {ctx.data.site.itunes_url &&
                <ButtonRenderer
                    {...layout.buttonStyle}
                    href={ctx.data.site.itunes_url}
                    style={marginStyles}
                >
                    Apple Podcasts
                </ButtonRenderer>}
            {ctx.data.site.google_play_url &&
                <ButtonRenderer
                    {...layout.buttonStyle}
                    href={ctx.data.site.google_play_url}
                    style={marginStyles}
                >
                    Google Play
                </ButtonRenderer>}
            {ctx.data.site.stitcher_url &&
                <ButtonRenderer
                    {...layout.buttonStyle}
                    href={ctx.data.site.stitcher_url}
                    style={marginStyles}
                >
                    Stitcher
                </ButtonRenderer>}
            <ButtonRenderer
                {...layout.buttonStyle}
                href={`https://pinecast.com/feed/${encodeURIComponent(ctx.data.podcast.slug)}`}
                style={marginStyles}
            >
                RSS
            </ButtonRenderer>
        </Wrapper>
);
