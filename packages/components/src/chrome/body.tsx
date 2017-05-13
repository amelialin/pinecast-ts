import * as React from 'react';
import {styled} from 'styletron-react';

import block from './block';
import {ComponentContext, getsContext} from '../componentContext';
import {Page, PageLayout} from '../primitives';


const Body = styled('body', ({ctx, page}: {ctx: ComponentContext, page: Page}) => ({
    backgroundColor: ctx.colors[page.backgroundColor],
    padding: page.padding,
}));


const BodyComponent = getsContext(
    ({page}: {page: PageLayout}, {ctx}: {ctx: ComponentContext}) =>
        <Body ctx={ctx} page={page.page}>
            {block(page.header)}
            {block(page.footer)}
        </Body>
);

export default BodyComponent;
