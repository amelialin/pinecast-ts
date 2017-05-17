import * as React from 'react';
import {styled} from 'styletron-react';

import {backgroundImage} from '../../styleMixins';
import {ButtonStyle, Text} from '../../primitives';
import ButtonRenderer from '../../common/button';
import {ComponentContext, getsContext} from '../../componentContext';
import {formatColor} from '../../helpers';
import ImageRenderer from '../../common/image';
import TextRenderer from '../../common/text';


const Wrapper = styled('nav', ({bgColor}: {bgColor: string}) => ({
    alignItems: 'center',
    backgroundColor: bgColor,
    color: '#fff',
    display: 'flex',
    justifyContent: 'space-around',
    margin: '0 auto',
    padding: '40px 0',
    maxWidth: 960,
}));


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
        <Wrapper bgColor={formatColor(layout.bgColor, ctx)}>
            {layout.text &&
                <TextRenderer {...layout.text} style={{flex: '1 1'}} />}

            {ctx.data.site.itunes_url &&
                <ButtonRenderer {...layout.buttonStyle} href={ctx.data.site.itunes_url} style={{marginLeft: '0.5em'}}>
                    Apple Podcasts
                </ButtonRenderer>}
            {ctx.data.site.google_play_url &&
                <ButtonRenderer {...layout.buttonStyle} href={ctx.data.site.google_play_url} style={{marginLeft: '0.5em'}}>
                    Google Play
                </ButtonRenderer>}
            {ctx.data.site.stitcher_url &&
                <ButtonRenderer {...layout.buttonStyle} href={ctx.data.site.stitcher_url} style={{marginLeft: '0.5em'}}>
                    Stitcher
                </ButtonRenderer>}
            <ButtonRenderer {...layout.buttonStyle} href={`https://pinecast.com/feed/${encodeURIComponent(ctx.data.podcast.slug)}`} style={{marginLeft: '0.5em'}}>
                RSS
            </ButtonRenderer>
        </Wrapper>
);
