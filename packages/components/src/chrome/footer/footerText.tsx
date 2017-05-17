import * as React from 'react';
import {styled} from 'styletron-react';

import {backgroundImage} from '../../styleMixins';
import {ButtonStyle, Text} from '../../primitives';
import ButtonRenderer from '../../common/button';
import {ComponentContext, getsContext} from '../../componentContext';
import {formatColor} from '../../helpers';
import ImageRenderer from '../../common/image';
import TextRenderer from '../../common/text';


const OuterWrapper = styled('footer', ({bgColor}: {bgColor: string}) => ({
    backgroundColor: bgColor,
}));
const Wrapper = styled(
    'div',
    (
        {bgColor, justification, padding}:
        {
            bgColor: string,
            justification: 'center' | 'left' | 'right',
            padding: number | null
        }
    ) =>
        ({
            backgroundColor: bgColor,
            color: '#fff',
            margin: '0 auto',
            maxWidth: 960,
            padding: padding !== null ? `${padding}px 0` : '20px 0',
            textAlign: justification,
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
        <OuterWrapper bgColor={formatColor(layout.bgColor, ctx)}>
            <Wrapper bgColor={formatColor(layout.fgColor, ctx)} padding={layout.padding} justification={layout.justification}>
                <TextRenderer {...layout.text} />
            </Wrapper>
        </OuterWrapper>
);
