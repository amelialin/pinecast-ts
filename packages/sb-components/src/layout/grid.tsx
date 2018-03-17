import * as React from 'react';

import {alignment} from '../styleMixins';
import atom from '../elements/atom';
import {ComponentContext, getsContext} from '../componentContext';
import {Episode, LayoutConfig} from '../primitives';
import {getsItemSource, ItemSourceContext} from '../itemSourceContext';
import renderN from './util';

const Wrapper = atom('section');
const WrapperInner = atom('div');

export default getsItemSource(function<T>(
  {
    children: childRenderer,
    config,
  }: {
    children: (index: number, item: T, style: Object) => JSX.Element;
    config: LayoutConfig;
  },
  {itemSource}: {itemSource: ItemSourceContext<T>},
) {
  const widthBasis =
    config.width === 'full'
      ? 'var(--fixedWidthMax)'
      : config.width || 'var(--fixedWidthMax)';
  return (
    <Wrapper
      style={{
        backgroundColor: config.bgColor,
      }}
    >
      <WrapperInner
        style={{
          ...alignment(config.alignment),
          backgroundColor: config.fgColor,
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          margin: '0 auto',
          maxWidth:
            config.width === 'full'
              ? '100%'
              : config.width || 'var(--fixedWidthMax)',
          padding: config.padding,
        }}
      >
        {renderN(config.consumeCount, itemSource, (item: T, i: number) => {
          const basis = `calc(${widthBasis} / ${config.maxItemsAcross} + ${
            config.itemSpacing
          }px)`;
          return childRenderer(i, item, {
            display: 'flex',
            flex: `0 1`,
            flexBasis: basis,
            marginBottom: config.itemSpacing,
            // maxWidth: basis,
            paddingLeft: config.itemSpacing / 2,
            paddingRight: config.itemSpacing / 2,
          });
        })}
      </WrapperInner>
    </Wrapper>
  );
});
