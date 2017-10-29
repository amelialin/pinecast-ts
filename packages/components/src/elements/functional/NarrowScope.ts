import * as React from 'react';

import {Element} from '../../primitives';
import {extractPath} from '../extractor';
import {layoutElements} from '../index';

export default ({
  element,
  item,
  style = {},
}: {
  element: Element;
  item: Object;
  style: React.CSSProperties;
}) => {
  const newScope = extractPath(item, (element.elementOptions || {}).path || []);
  if (!newScope) {
    throw new Error('Scope could not be narrowed');
  }
  if (!element.children) {
    throw new Error('Expected child on NarrowScope element');
  }
  return layoutElements(newScope, element.children.slice(0, 1), style)[0];
};
