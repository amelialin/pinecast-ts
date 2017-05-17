import * as escapeHTML from 'react-dom/lib/escapeTextContentForBrowser';
import * as React from 'react';
import * as ReactDOM from 'react-dom/server';
import {StyletronProvider} from 'styletron-react';

import {Styletron} from '@pinecast/sb-components/dist';

import {Context} from 'koa';


const DEFAULT_FAVICON = 'https://pinecast.com/static/img/256x256.png';


interface Options {
    fonts: {[fontKey: string]: string},
    title?: string,
}

function fontMapper(fontFamily): string | null {
    switch (fontFamily.toLowerCase()) {
        case 'sans-serif':
        case 'monospace':
        case 'serif':
        case 'verdana':
            return null;
    }

    return `<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=${escapeHTML(encodeURIComponent(fontFamily))}">`;
}

export default async function frame(
    elem: JSX.Element,
    siteData: any,
    {
        fonts,
        title = null,
    }: Options,
    url: (x: string, y?: Object) => string
): Promise<string> {

    const styletron = new Styletron();
    const root = (
        <StyletronProvider styletron={styletron}>
            {elem}
        </StyletronProvider>
    );

    const markup = ReactDOM.renderToString(root);
    const rawCustomCSS = siteData.site.custom_css;
    const customCSS = rawCustomCSS ? `<link href="data:text/css;base64,${new Buffer(rawCustomCSS).toString('base64')}" rel="stylesheet">` : '';

    const disqusInclude = siteData.site.disqus_url ? `
    <script>
      (function() {
      var d = document, s = d.createElement('script');
      s.src = '//${escapeHTML(siteData.site.disqus_url)}.disqus.com/embed.js';
      s.setAttribute('data-timestamp', +new Date());
      (d.head || d.body).appendChild(s);
      })();
    </script>`.trim() : '';
    const gaInclude = siteData.site.analytics_id ? `
    <script>
      (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
      (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
      m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
      })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

      ga('create', '${escapeHTML(siteData.site.analytics_id)}', 'auto');
      ga('send', 'pageview');
    </script>`.trim() : '';

    const fontInclude = Array.from(new Set(Object.values(fonts)).values()).map(fontMapper).filter(x => Boolean(x)).join('\n');

    return `
    <!DOCTYPE html>
    <html>
        <head>
            <title>${escapeHTML(title || siteData.podcast.name)}</title>
            ${fontInclude}
            <style>
              *, *:before, *:after {box-sizing: border-box;}
              html, body {font-family: ${escapeHTML(fonts.body)}; font-size: 12px; height: 100%; margin: 0; padding: 0}
            </style>
            ${styletron.getStylesheetsHtml()}
            ${customCSS}
            <link type="image/png" rel="icon" href="${escapeHTML(siteData.features.favicon && siteData.site.favicon_url || DEFAULT_FAVICON)}">
            ${siteData.site.itunes_banner ? `<meta name="apple-itunes-app" content="app-id=${escapeHTML(siteData.site.itunes_banner)}">` : ''}
            <link rel="alternate" type="application/rss+xml" title="Podcast Feed" href="https://pinecast.com/feed/${escapeHTML(encodeURIComponent(siteData.podcast.slug))}">
            ${siteData.posts.length ? `<link rel="alternate" type="application/rss+xml" title="Blog Feed" href="${escapeHTML(url('blogRSS'))}">` : ''}
        </head>
        ${markup}
        ${disqusInclude}
        ${gaInclude}
    </html>
    `;
};
