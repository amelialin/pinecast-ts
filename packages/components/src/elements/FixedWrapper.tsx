import * as React from 'react';

import atom from './atom';
import {blockChildren} from './children';
import {Element} from '../primitives';
import expandElementStyles from './globalElementOptions';
import {extractProps} from './extractor';

function getEO(el: Element, eo: string, def: any = null): any {
  return (el.elementOptions && el.elementOptions[eo]) || def;
}

function empty(obj: Object | null | undefined) {
  if (!obj) {
    return true;
  }
  return Object.keys(obj).length === 0;
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
  const InnerWrapper = atom(getEO(element, 'innerTagName', 'div'));
  const innerWrapper = (
    <InnerWrapper
      children={blockChildren(item, element)}
      style={{
        backgroundColor: getEO(element, 'fgColor'),
        margin: '0 auto',
        maxWidth: getEO(element, 'maxWidth', 'var(--fixedWidthMax)'),
        padding: getEO(element, 'innerPadding'),
        ...element.styles,
      }}
    />
  );

  if (
    empty(element.props) &&
    empty(element.propPaths) &&
    empty(style) &&
    !(element.elementOptions && element.elementOptions.bgColor) &&
    !(element.elementOptions && element.elementOptions.outerPadding)
  ) {
    return innerWrapper;
  }

  const OuterWrapper = atom(element.tagName || 'div');
  return (
    <OuterWrapper
      // If you add anything here, update the check above.
      {...element.props}
      {...extractProps(item, element.propPaths)}
      item={item}
      style={{
        ...style,
        backgroundColor: getEO(element, 'bgColor'),
        padding: getEO(element, 'outerPadding'),
      }}
    >
      {innerWrapper}
    </OuterWrapper>
  );
};
