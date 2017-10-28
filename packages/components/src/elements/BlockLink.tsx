import * as React from 'react';

import atom from './atom';
import {blockChildren} from './children';
import {Element} from '../primitives';
import expandElementStyles from './globalElementOptions';
import {extractProps} from './extractor';

const Link = atom('a');

export default ({
  element,
  item,
  style,
}: {
  element: Element;
  item: Object;
  style: Object;
}) => {
  const props = {...element.props, ...extractProps(item, element.propPaths)};
  return (
    <Link
      {...props}
      data-link="true"
      item={item}
      style={{
        display: 'block',
        color: 'links',
        textDecoration: 'none',
        ...expandElementStyles(
          {...style, ...element.styles},
          element.elementOptions,
        ),
      }}
    >
      {blockChildren(item, element)}
    </Link>
  );
};
