import * as escapeHTML from 'react-dom/lib/escapeTextContentForBrowser';
import * as React from 'react';
import * as ReactDOM from 'react-dom/server';
import {StyletronProvider} from 'styletron-react';

import {ComponentContext} from '@pinecast/sb-components/dist';
import {Styletron} from '@pinecast/sb-components/dist';

import {Context} from 'koa';

const DEFAULT_FAVICON = 'https://pinecast.com/static/img/256x256.png';

interface Options {
  context: ComponentContext;
  title?: string;
}

function fontMapper(fontFamily): string | null {
  switch (fontFamily.toLowerCase()) {
    case 'sans-serif':
    case 'monospace':
    case 'serif':
    case 'verdana':
      return null;
  }

  return `<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=${escapeHTML(
    encodeURIComponent(fontFamily),
  )}:400,500,600">`;
}

export default async function frame(
  elem: JSX.Element,
  siteData: any,
  {context, title = null}: Options,
): Promise<string> {
  const styletron = new (Styletron as any)();
  // HACK: https://github.com/rtsao/styletron/issues/153
  const StyletronProviderCast: any = StyletronProvider;
  const root = (
    <StyletronProviderCast styletron={styletron}>{elem}</StyletronProviderCast>
  );

  const markup = ReactDOM.renderToStaticMarkup(root);
  const gaInclude = siteData.site.analytics_id
    ? `
    <script>
      (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
      (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
      m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
      })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

      ga('create', '${escapeHTML(siteData.site.analytics_id)}', 'auto');
      ga('send', 'pageview');
    </script>`.trim()
    : '';

  const fontInclude = Array.from(new Set(Object.values(context.fonts)))
    .map(fontMapper)
    .filter(x => Boolean(x))
    .join('\n');

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>${escapeHTML(title || siteData.podcast.name)}</title>
        ${fontInclude}
        <style>
          *, *:before, *:after {box-sizing: border-box;}
          html, body {color: ${escapeHTML(
            context.colors.text,
          )}; font-family: ${escapeHTML(
    context.fonts.body,
  )}; height: 100%; margin: 0; padding: 0}
          a {color: ${escapeHTML(context.colors.links)}}
        </style>
        ${styletron.getStylesheetsHtml()}
        <link type="image/png" rel="icon" href="${escapeHTML(
          (siteData.features.favicon && siteData.site.favicon_url) ||
            DEFAULT_FAVICON,
        )}">
        ${siteData.site.itunes_banner
          ? `<meta name="apple-itunes-app" content="app-id=${escapeHTML(
              siteData.site.itunes_banner,
            )}">`
          : ''}
        <link rel="alternate" type="application/rss+xml" title="Podcast Feed" href="https://pinecast.com/feed/${escapeHTML(
          encodeURIComponent(siteData.podcast.slug),
        )}">
      </head>
      ${markup}
      ${gaInclude}
    </html>
    `
    .trim()
    .replace(/\s*\n\s*/g, '\n');
}
