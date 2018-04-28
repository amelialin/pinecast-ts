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
  return (
    <Wrapper style={{backgroundColor: config.bgColor}}>
      <WrapperInner
        style={{
          ...alignment(config.alignment || 'center'),
          backgroundColor: config.fgColor,
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          maxWidth: config.width === 'full' ? '100%' : 'var(--fixedWidthMax)',
        }}
      >
        {renderN(config.consumeCount, itemSource, (item: T, i: number) => {
          const basis = `calc(var(--fixedWidthMax) / ${
            config.maxItemsAcross
          } + ${config.itemSpacing}px)`;
          return childRenderer(i, item, {
            display: 'flex',
            flex: `0 1`,
            flexBasis: basis,
            marginBottom: config.itemSpacing,
            paddingLeft: (config.itemSpacing || 0) / 2,
            paddingRight: (config.itemSpacing || 0) / 2,
          });
        })}
      </WrapperInner>
    </Wrapper>
  );
});
