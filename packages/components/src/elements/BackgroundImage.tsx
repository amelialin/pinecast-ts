import * as React from 'react';

import atom from './atom';
import {blockChildren} from './children';
import {Element} from '../primitives';
import {extractPath, extractProps} from './extractor';
import expandElementStyles from './globalElementOptions';

export default ({
  element,
  item,
  style = {},
}: {
  element: Element;
  item: Object;
  style: Object;
}) => {
  const ImageContainer = atom(element.tagName || 'div');
  const props = {
    ...element.props,
    ...extractProps(item, element.propPaths),
  };
  const styles = expandElementStyles(
    {
      backgroundImage: `url(${props.image})`,
      backgroundPosition: props.position || 'center',
      backgroundSize: props.size || 'cover',
      ...style,
      ...element.styles,
    },
    element.elementOptions,
  );
  return (
    <ImageContainer
      children={blockChildren(item, element)}
      item={item}
      style={styles}
    />
  );
};
