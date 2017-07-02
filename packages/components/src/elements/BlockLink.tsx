import * as React from 'react';

import atom from './atom';
import {blockChildren} from './children';
import {Element} from '../primitives';
import expandElementStyles from './globalElementOptions';
import {extractProps} from './extractor';


const Link = atom('a');

export default (
    {element, item, style}: {element: Element, item: Object, style: Object}
) => {
    return <Link
        {...element.props}
        {...extractProps(item, element.propPaths)}
        children={blockChildren(item, element)}
        item={item}
        style={{
            display: 'block',
            color: 'inherit',
            textDecoration: 'none',
            ...expandElementStyles({...style, ...element.styles}, element.elementOptions),
        }}
    />;
};
