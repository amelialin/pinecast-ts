import * as React from 'react';
import * as ReactDOM from 'react-dom/server';
import {Styletron} from '@pinecast/sb-components/dist';
import {StyletronProvider} from 'styletron-react';

import {Context} from 'koa';


export default async function frame(elem: JSX.Element, ctx: Context, title: string = null): Promise<string> {
    const styletron = new Styletron();
    const root = (
        <StyletronProvider styletron={styletron}>
            {elem}
        </StyletronProvider>
    );

    const markup = ReactDOM.renderToString(root);

    return `
    <!DOCTYPE html>
    <html>
        <head>
            <title>${title || (await ctx.state.resources.site).podcast.name}</title>
            <style>*, *:before, *:after {box-sizing: border-box;} html, body {height: 100%; margin: 0; padding: 0}</style>
            ${styletron.getStylesheetsHtml()}
        </head>
        ${markup}
    </html>
    `;
};
