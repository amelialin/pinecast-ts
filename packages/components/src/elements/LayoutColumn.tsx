import * as React from 'react';

import {CSS} from '@pinecast/sb-styles';

import atom from './atom';
import {blockChildren} from './children';
import {Element} from '../primitives';
import expandElementStyles from './globalElementOptions';
import {extractProps} from './extractor';

export default ({
  element,
  item,
  style = {},
}: {
  element: Element;
  item: Object;
  style: CSS;
}) => {
  const Container = atom(element.tagName || 'div');
  return (
    <Container
      {...element.props}
      {...extractProps(item, element.propPaths)}
      children={blockChildren(item, element)}
      item={item}
      style={{
        ...expandElementStyles(
          {...style, ...element.styles},
          element.elementOptions || {},
        ),
        display: 'flex',
        flexDirection: 'column',
      }}
    />
  );
};
