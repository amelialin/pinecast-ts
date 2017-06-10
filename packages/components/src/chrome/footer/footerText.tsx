import * as React from 'react';

import {backgroundImage} from '../../styleMixins';
import {ButtonStyle, Text} from '../../primitives';
import ButtonRenderer from '../../common/button';
import {ComponentContext, getsContext} from '../../componentContext';
import {formatColor} from '../../helpers';
import ImageRenderer from '../../common/image';
import styled from '../../styles';
import TextRenderer from '../../common/text';


const OuterWrapper = styled('footer', null);
const Wrapper = styled(
    'div',
    ({padding}: {padding: number | null}) =>
        ({
            color: '#fff',
            margin: '0 auto',
            maxWidth: 960,
            padding: padding !== null ? `${padding}px 0` : '20px 0',
        })
);


export default getsContext(
    (
        {layout}:
            {
                layout: {
                    bgColor: string,
                    buttonStyle: ButtonStyle,
                    fgColor?: string | null,
                    justification: 'center' | 'left' | 'right';
                    padding: number | null,
                    text?: Text,
                },
            },
        {ctx}: {ctx: ComponentContext}
    ) =>
        <OuterWrapper style={{backgroundColor: formatColor(layout.bgColor, ctx)}}>
            <Wrapper style={{backgroundColor: formatColor(layout.fgColor, ctx), textAlign: layout.justification}} padding={layout.padding}>
                <TextRenderer {...layout.text} />
            </Wrapper>
        </OuterWrapper>
);
