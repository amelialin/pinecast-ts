import * as React from 'react';

import atom from '../atom';
import {Element} from '../../primitives';
import expandElementStyles from '../globalElementOptions';
import {extractProps} from '../extractor';
import {layoutElements} from '../index';
import {Page} from '../../primitives';


const baseStyles: {[style: string]: {container: React.CSSProperties, item: React.CSSProperties}} = {
    stack: {
        container: {display: 'block'},
        item: {},
    },
    flow: {
        container: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        item: {
            flex: '1 1',
        },
    },
};

function getStyles(element: Element) {
    const {
        elementOptions: {style = 'stack'} = {},
    } = element;
    const containerOut = {};
    const itemOut = {};

    const firmStyle = baseStyles[style] ? style : 'stack';
    Object.assign(containerOut, baseStyles[firmStyle].container);
    Object.assign(itemOut, baseStyles[firmStyle].item);

    return {container: containerOut, item: itemOut};
}

export default (
    {element, item, style = {}}: {element: Element, item: Page, style: Object}
) => {
    const Container = atom(element.tagName || 'div');
    const {container: containerStyles, item: itemStyles} = getStyles(element);
    return <Container
        {...element.props}
        {...extractProps(item, element.propPaths)}
        item={item}
        style={{
            ...expandElementStyles({...style, ...element.styles}, element.elementOptions),
            ...containerStyles,
        }}
    >
        {
            (item.body as any as Array<Object>)
                .map((host, i) => layoutElements(host, element.children, itemStyles, i * element.children.length))
                .reduce((a, b) => a.concat(b))
        }
    </Container>;
};
