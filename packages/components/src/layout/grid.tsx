import * as React from 'react';

import {alignment} from '../styleMixins';
import {ComponentContext, getsContext} from '../componentContext';
import {Episode, EpisodeStyle, LayoutConfig, PostStyle} from '../primitives';
import {formatColor} from '../helpers';
import {getsItemSource, ItemSourceContext} from '../itemSourceContext';
import renderN from './util';
import styled from '../styles';


const Wrapper = styled('section');
const WrapperInner = styled('div');


export default getsContext(
    getsItemSource(
        function<T>(
            {children, config}: {
                children: (item: T, style: Object) => JSX.Element,
                config: LayoutConfig,
            },
            {ctx, itemSource}: {ctx: ComponentContext, itemSource: ItemSourceContext<T>}
        ) {
            return <Wrapper
                style={{
                    backgroundColor: formatColor(config.bgColor, ctx),
                }}
            >
                <WrapperInner
                    style={{
                        ...alignment(config.alignment),
                        backgroundColor: formatColor(config.fgColor, ctx),
                        display: 'flex',
                        flexWrap: 'wrap',
                        maxWidth: config.width === 'full' ? '100%' : config.width || 'auto',
                        padding: config.padding,
                    }}
                >
                    {renderN(config.consumeCount, itemSource, (item: T) => children(item, config.itemStyle))}
                </WrapperInner>
            </Wrapper>
        }
    )
);
