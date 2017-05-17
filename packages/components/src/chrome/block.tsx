import * as React from 'react';

import CenteredHeader from './header/centered';
import SimpleHeader from './header/simple';
import TumblishHeader from './header/tumblish';

import SubscribeLinks from './subheader/subscribeLinks';

import FooterText from './footer/footerText';
import HorizLinkBar from './footer/horizLinkBar';

import {ComponentLayout} from '../primitives';


export default function(components: Array<ComponentLayout>) {
    return components.map((component, i) => {
        let Component;
        switch (component.type) {
            case 'header.centered':
                Component = CenteredHeader;
                break;
            case 'header.simple':
                Component = SimpleHeader;
                break;
            case 'header.tumblish':
                Component = TumblishHeader;
                break;
            case 'subheader.subscribeLinks':
                Component = SubscribeLinks;
                break;
            case 'footer.footerText':
                Component = FooterText;
                break;
            case 'footer.horizLinkBar':
                Component = HorizLinkBar;
                break;
            default:
                throw new Error(`Unrecognized component name: ${component.type}`);
        }

        return <Component key={i} layout={component.layout} />
    });
};
