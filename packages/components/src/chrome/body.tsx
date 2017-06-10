import * as React from 'react';

import block from './block';
import {ComponentContext, getsContext} from '../componentContext';
import {formatColor} from '../helpers';
import {Page, PageLayout} from '../primitives';
import styled from '../styles';


const Body = styled('body');


const BodyComponent = getsContext(
    ({children, page}: {children: any, page: PageLayout}, {ctx}: {ctx: ComponentContext}) =>
        <Body style={{backgroundColor: formatColor(page.page.backgroundColor, ctx), padding: page.page.padding}}>
            {block(page.header)}
            {children}
            {block(page.footer)}
        </Body>
);

export default BodyComponent;
