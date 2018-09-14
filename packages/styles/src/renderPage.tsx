import * as React from 'react';
import * as ReactDOM from 'react-dom/server';
import {StyletronProvider} from 'styletron-react';

import {DEFAULT_FONT_CSS_IMPORT} from '@pinecast/common/constants';

import ServerStyletron from './ServerStyletron';

type OptionsType = {
  bodyProps?: React.HTMLAttributes<HTMLBodyElement>;
  headIncludes?: string;
  postBodyIncludes?: string;
  styleIncludes?: string;
};

export default function renderPage(
  pageBody: JSX.Element,
  options: OptionsType = {},
): string {
  const ss = new ServerStyletron();
  const body = (
    <StyletronProvider styletron={ss}>
      <body {...options.bodyProps}>{pageBody}</body>
    </StyletronProvider>
  );

  const rendered = ReactDOM.renderToStaticMarkup(body);

  return `<!DOCTYPE html><html prefix="og: http://ogp.me/ns#">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <style>
      ${DEFAULT_FONT_CSS_IMPORT}
      *, *:before, *:after {box-sizing: border-box;}
      ${options.styleIncludes || ''}
    </style>
    ${options.headIncludes || ''}${ss.getStylesheetsHtml()}</head>
  ${rendered}
  ${options.postBodyIncludes || ''}
  </html>`
    .trim()
    .replace(/\s*\n\s*/g, '\n');
}
