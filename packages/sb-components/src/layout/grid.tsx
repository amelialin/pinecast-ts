import * as React from 'react';

import {alignment} from '../styleMixins';
import atom from '../elements/atom';
import {ComponentContext, getsContext} from '../componentContext';
import {LayoutConfig} from '../primitives';
import {getsItemSource, ItemSourceContext} from '../itemSourceContext';
import renderN from './util';

const Wrapper = atom('section');
const WrapperInner = atom('div');

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
    const inner = (
      <WrapperInner
        style={{
          ...alignment(config.alignment || 'center'),
          backgroundColor: config.fgColor,
          display: 'grid',
          gridAutoRows: 'auto',
          gridTemplateColumns: `repeat(auto-fill, minmax(${config.minimumItemWidth ||
            250}px, 1fr))`,
          maxWidth: config.width === 'full' ? '100%' : 'var(--fixedWidthMax)',
        }}
      >
        {renderN(config.consumeCount, itemSource, (item: T, i: number) => {
          return childRenderer(i, item, {
            display: 'flex',
            justifyContent: 'center',
            margin: `0 0 ${config.itemSpacing || 0}px`,
            minWidth: config.minimumItemWidth || 250,
            paddingLeft: (config.itemSpacing || 0) / 2,
            paddingRight: (config.itemSpacing || 0) / 2,
          });
        })}
      </WrapperInner>
    );
    if (!config.bgColor) {
      return inner;
    }
    return <Wrapper style={{backgroundColor: config.bgColor}}>{inner}</Wrapper>;
  }),
);
