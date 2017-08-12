import * as React from 'react';

import {ComponentLayout} from '../primitives';

import AbstractElements from './abstractElements';
import ForwardBackPagination from './pagination/forwardBack';
import LinkBar from './footer/linkBar';
import SubscribeLinks from './subheader/subscribeLinks';


export default function(components: Array<ComponentLayout>): Array<JSX.Element> {
    return components.map((component, i) => {
        let Component;
        switch (component.type) {
            case 'abstract':
                Component = AbstractElements;
                break;
            case 'subheader.subscribeLinks':
                Component = SubscribeLinks;
                break;
            case 'links.linkBar':
                Component = LinkBar;
                break;
            case 'pagination.forwardBack':
                Component = ForwardBackPagination;
                break;
            default:
                throw new Error(`Unrecognized component name: ${component.type}`);
        }

        return <Component {...component} key={i} />
    });
};
