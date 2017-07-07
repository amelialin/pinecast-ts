import * as React from 'react';

import {Element} from '../primitives';
import {getsMount} from '../chrome/mounts';


export default getsMount(
    (
        {element}: {element: Element},
        {mounts}: {mounts: {[key: string]: JSX.Element | Array<JSX.Element> | null}}
    ) => {
        const mount = mounts[element.props.mount] || null;
        if (Array.isArray(mount)) {
            return <div>{mount}</div>;
        }
        return mount;
    }
);
