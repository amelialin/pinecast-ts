import * as React from 'react';

import block from './block';
import {ComponentContext, getsContext} from '../componentContext';
import {formatColor} from '../helpers';
import {Page, PageLayout} from '../primitives';
import {prepareStyle} from '../elements/atom';  // TODO: Move this to someplace generic
import styled from '../styles';


const Body = styled('body');


const BodyComponent = getsContext(
    ({children, page}: {children?: any, page: PageLayout}, {ctx}: {ctx: ComponentContext}) =>
        <Body style={prepareStyle(page.page, ctx)}>
            {block(page.header)}
            {children}
            {block(page.footer)}
        </Body>
);

export default BodyComponent;
