import * as React from 'react';

import atom from './atom';
import {Element} from '../primitives';
import expandElementStyles from './globalElementOptions';
import {extractProps} from './extractor';


export default (
    {element, item, style = {}}: {element: Element, item: Object, style: Object}
) => {
    const Container = atom('iframe');
    return <Container
        {...element.props}
        {...extractProps(item, element.propPaths)}
        height={60}
        item={item}
        seamless
        style={{
            borderWidth: 0,
            width: '100%',
            ...expandElementStyles({...style, ...element.styles}, element.elementOptions),
        }}
    />;
};
