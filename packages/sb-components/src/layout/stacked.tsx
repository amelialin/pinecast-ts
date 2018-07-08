import * as React from 'react';

import {alignment} from '../styleMixins';
import atom from '../elements/atom';
import {LayoutConfig} from '../primitives';
import {getsItemSource, ItemSourceContext} from '../itemSourceContext';
import renderN from './util';

const Wrapper = atom('section');
const WrapperInner = atom('div');

export default getsItemSource(function<T>(
  {
    children: childRenderer,
    config,
  }: {
    children: (index: number, item: T, style: Object | null) => JSX.Element;
    config: LayoutConfig;
  },
  {itemSource}: {itemSource: ItemSourceContext<T>},
) {
  const wrapperStyle = {
    ...alignment(config.alignment || 'center'),
    backgroundColor: config.fgColor,
    maxWidth: config.width === 'full' ? '100%' : 'var(--fixedWidthMax)',
  };
  const inner = renderN(config.consumeCount, itemSource, (item: T, i: number) =>
    childRenderer(i, item, null),
  );

  if (!config.bgColor) {
    return <Wrapper style={wrapperStyle}>{inner}</Wrapper>;
  }
  return (
    <Wrapper style={{backgroundColor: config.bgColor}}>
      <WrapperInner style={wrapperStyle}>{inner}</WrapperInner>
    </Wrapper>
  );
});
