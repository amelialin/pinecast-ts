import * as React from 'react';

import atom from './atom';
import {Element} from '../primitives';
import expandElementStyles from './globalElementOptions';
import {getsMount} from '../chrome/mounts';


export default getsMount(
    (
        {element, item, style = {}}: {element: Element, item: Object, style: Object},
        {mounts}: {mounts: {[key: string]: JSX.Element}}
    ) => {
        const Container = atom(element.tagName || 'div');
        return <Container
            children={mounts[element.props.mount] || `Missing mount ${element.props.mount}`}
            item={item}
            style={expandElementStyles({...style, ...element.styles}, element.elementOptions)}
        />;
    }
);
