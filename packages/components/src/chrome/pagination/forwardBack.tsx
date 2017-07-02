import * as React from 'react';

import {backgroundImage} from '../../styleMixins';
import {BackgroundImage, ButtonStyle} from '../../primitives';
import Button from '../../common/button';
import {ComponentContext, getsContext} from '../../componentContext';
import {formatColor} from '../../helpers';
import styled from '../../styles';


const Wrapper = styled('nav', {
    margin: '0 auto',
    padding: '50px 0',
    textAlign: 'center',
    maxWidth: 960,
});


export default getsContext(
    (
        {layout}:
            {
                layout: {
                    bgColor?: string,
                    bgImage?: BackgroundImage,

                    nextText: string,
                    previousText: string,
                },
            },
        {ctx}: {ctx: ComponentContext}
    ) =>
        ctx.pagination ?
            <Wrapper style={{...backgroundImage(layout.bgImage, ctx), backgroundColor: formatColor(layout.bgColor, ctx)}}>
                {ctx.pagination.has_previous &&
                    <Button
                        {...ctx.styling.buttons}
                        href={ctx.url('home') + (ctx.pagination.previous_page_number !== 1 ? `?page=${ctx.pagination.previous_page_number}` : '')}
                    >
                        {layout.previousText}
                    </Button>}
                {ctx.pagination.has_next &&
                    <Button
                        {...ctx.styling.buttons}
                        href={ctx.url('home') + `?page=${ctx.pagination.next_page_number}`}
                        style={{marginLeft: '0.5em'}}
                    >
                        {layout.nextText}
                    </Button>}
            </Wrapper> :
            null
);
