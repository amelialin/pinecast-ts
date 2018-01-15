import * as React from 'react';

import atom from './atom';
import {blockChildren} from './children';
import {Element} from '../primitives';
import expandElementStyles from './globalElementOptions';
import {extractProps} from './extractor';

function getEO(el: Element, eo: string, def: any = null): any {
  return (el.elementOptions && el.elementOptions[eo]) || def;
}

export default ({
  element,
  item,
  style = {},
}: {
  element: Element;
  item: Object;
  style: Object;
}) => {
  if (element.extendsStyles) {
    throw new Error('Cannot extend styles on fixed wrappers');
  }
  const OuterWrapper = atom(element.tagName || 'div');
  const InnerWrapper = atom(getEO(element, 'innerTagName', 'div'));

  return (
    <OuterWrapper
      {...element.props}
      {...extractProps(item, element.propPaths)}
      item={item}
      style={{
        ...style,
        backgroundColor: getEO(element, 'bgColor'),
        padding: getEO(element, 'outerPadding'),
      }}
    >
      <InnerWrapper
        children={blockChildren(item, element)}
        style={{
          backgroundColor: getEO(element, 'fgColor'),
          margin: '0 auto',
          maxWidth: getEO(element, 'maxWidth'),
          padding: getEO(element, 'innerPadding'),
          ...element.styles,
        }}
      />
    </OuterWrapper>
  );
};
