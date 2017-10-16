import * as React from 'react';

import {alignment} from '../styleMixins';
import {ComponentContext, getsContext} from '../componentContext';
import {Episode, LayoutConfig} from '../primitives';
import {formatColor} from '../helpers';
import {getsItemSource, ItemSourceContext} from '../itemSourceContext';
import renderN from './util';
import styled from '../styles';

const Wrapper = styled('section');
const WrapperInner = styled('div');

export default getsContext(
  getsItemSource(function<T>(
    {
      children: childRenderer,
      config,
    }: {
      children: (index: number, item: T, style: Object) => JSX.Element;
      config: LayoutConfig;
    },
    {
      ctx,
      itemSource,
    }: {ctx: ComponentContext; itemSource: ItemSourceContext<T>},
  ) {
    const widthBasis = config.width === 'full' ? 1000 : config.width || 1000;
    return (
      <Wrapper
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
            justifyContent: 'center',
            maxWidth: config.width === 'full' ? '100%' : config.width || 'auto',
            padding: config.padding,
          }}
        >
          {renderN(config.consumeCount, itemSource, (item: T, i: number) => {
            const basis = widthBasis / config.maxItemsAcross;
            return childRenderer(i, item, {
              display: 'flex',
              flex: `0 1 ${basis}px`,
              marginBottom: config.itemSpacing,
              maxWidth: basis,
              paddingLeft: config.itemSpacing / 2,
              paddingRight: config.itemSpacing / 2,
            });
          })}
        </WrapperInner>
      </Wrapper>
    );
  }),
);
