import * as React from 'react';
import * as ReactDOM from 'react-dom/server';

import {ComponentContext} from '@pinecast/sb-components';
import {ServerStyletron, StyletronProvider} from '@pinecast/styles';

import editorIntegration from './editorIntegration';
import escapeHTML from './escapeHTML';

const DEFAULT_FAVICON = 'https://pinecast.com/static/img/256x256.png';

interface Options {
  context: ComponentContext;
  headExtra?: string;
  title: string;
  urlPath: string;
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
  )}:400,500">`;
}

export default async function frame(
  elem: JSX.Element,
  siteData: any,
  {context, headExtra = '', title, urlPath}: Options,
): Promise<string> {
  const styletron = new ServerStyletron();
  const root = (
    <StyletronProvider styletron={styletron}>{elem}</StyletronProvider>
  );

  // This can't be inlined because we need to get the styletron styles out of it.
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
    .filter(Boolean)
    .join('\n');

  return `
    <!DOCTYPE html>
    <html prefix="og: http://ogp.me/ns#">
      <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="dns-prefetch" href="https://fonts.googleapis.com">
        <title>${escapeHTML(title)}</title>
        <meta name="generator" content="Pinecast Site Builder/1.0">
        <meta property="og:locale" content="${escapeHTML(
          siteData.podcast.language,
        )}">
        <meta property="og:title" content="${escapeHTML(title)}">
        <meta name="twitter:title" content="${escapeHTML(title)}">
        <meta property="og:site_name" content="${escapeHTML(
          siteData.podcast.name,
        )}">
        <meta property="og:url" content="${escapeHTML(
          siteData.site.canonical_url + urlPath,
        )}">
        <link rel="canonical" href="${escapeHTML(
          siteData.site.canonical_url + urlPath,
        )}">
        <meta name="twitter:site" content="@getpinecast">
        ${headExtra.replace(/\s*\n\s*/g, '\n')}
        ${fontInclude}
        <style>
          *, *:before, *:after {box-sizing: border-box;}
          html, body {color: ${escapeHTML(
            context.colors.text,
          )}; font-family: ${escapeHTML(context.fonts.body)}; ${
    context.options.rootFlexibleHeight ? '' : 'height: 100%;'
  }font-size: ${escapeHTML(
    ((context.styling && context.styling.page) || {}).fontSize,
  )}px;margin: 0; padding: 0}
          a {color: ${escapeHTML(context.colors.links)}}
        </style>
        ${styletron.getStylesheetsHtml()}
        <link type="image/png" rel="icon" href="${escapeHTML(
          (siteData.features.favicon && siteData.site.favicon_url) ||
            DEFAULT_FAVICON,
        )}">
        ${
          siteData.site.itunes_banner
            ? `<meta name="apple-itunes-app" content="app-id=${escapeHTML(
                siteData.site.itunes_banner,
              )}">`
            : ''
        }
        <link rel="alternate" type="application/rss+xml" title="Podcast Feed" href="https://pinecast.com/feed/${escapeHTML(
          encodeURIComponent(siteData.podcast.slug),
        )}">
      </head>
      ${markup}
      ${gaInclude}
      ${editorIntegration}
    </html>
    `
    .trim()
    .replace(/\s*\n\s*/g, '\n');
}
