import * as React from 'react';

import styled, {CSS} from '@pinecast/sb-styles';
import {merge} from '@pinecast/sb-presets';

import {AbstractURL} from '../primitives';
import {ComponentContext, getsContext} from '../componentContext';
import {extractPath} from './extractor';
import {formatColor, formatInlineColor} from '../helpers';
import {MOBILE_MEDIA_QUERY} from '../media';

export function prepareProps(
  item: any,
  props: Object,
  ctx: ComponentContext,
): Object {
  return Object.keys(props).reduce((acc, cur) => {
    switch (cur) {
      case 'href':
        if (/^https?:\/\//.exec(props[cur]) || props[cur][0] === '/') {
          acc[cur] = props[cur];
          break;
        }
        const href: AbstractURL = props[cur];
        acc[cur] = ctx.url(
          href.name,
          Object.keys(href.params || {}).reduce((resolvedParams, param) => {
            resolvedParams[param] = extractPath(
              item,
              (href.params || {})[param],
            );
            return resolvedParams;
          }, {}),
        );
        break;
      case 'src':
        acc[cur] = ctx.resources[props[cur]] || props[cur];
        break;
      default:
        acc[cur] = props[cur];
    }
    return acc;
  }, {});
}

function replaceVars(value: string, ctx: ComponentContext): string {
  if (!value.includes('var(')) {
    return value;
  }

  return replaceVars(
    value.replace(/var\(\-\-(\w+)\)/, (_, match) => {
      if (match === 'fixedWidthMax') {
        return ctx.options.fixedWidthMax || '0';
      }
      return '0';
    }),
    ctx,
  );
}

export function prepareStyle(
  style: CSS | null,
  ctx: ComponentContext,
): CSS | null {
  if (!style) {
    return null;
  }
  return Object.keys(style).reduce((acc, cur) => {
    if (cur[0] === ':' || cur[0] === '@') {
      const restyled = prepareStyle(style[cur], ctx);
      if (cur === '@mobile') {
        acc[MOBILE_MEDIA_QUERY] = restyled;
      } else {
        acc[cur] = restyled;
      }
      return acc;
    }
    switch (cur) {
      case 'boxShadow':
      case 'background':
      case 'backgroundImage':
        acc[cur] = formatInlineColor(style[cur], ctx);
        break;
      case 'backgroundColor':
      case 'borderColor':
      case 'borderBottomColor':
      case 'borderLeftColor':
      case 'borderRightColor':
      case 'borderTopColor':
      case 'color':
        acc[cur] = formatColor(style[cur], ctx);
        break;
      case 'backgroundImage':
        if (style[cur] in ctx.resources) {
          acc[cur] = `url(${ctx.resources[style[cur]]})`;
        } else {
          acc[cur] = style[cur];
        }
        break;
      case 'fontFamily':
        acc[cur] = ctx.fonts[style[cur]] || style[cur];
        break;
      case 'fontSize':
        if (style[cur] === 'var(--pageFontSize)') {
          acc[cur] =
            (ctx.styling && ctx.styling.page && ctx.styling.page.fontSize) ||
            16;
        } else {
          acc[cur] = style[cur];
        }
        break;
      default:
        if (typeof style[cur] === 'string') {
          acc[cur] = replaceVars(style[cur], ctx);
          break;
        }
        acc[cur] = style[cur];
    }
    return acc;
  }, {});
}

export default (elem: string, baseStyle?: Object, baseProps?: Object) =>
  getsContext(
    (
      {
        children,
        extends: extends_,
        item,
        style,
        ...rest,
      }: {
        children?: any;
        extends?: Array<string>;
        item?: any;
        key?: string;
        style?: CSS;
        [prop: string]: any;
      },
      {ctx}: {ctx: ComponentContext},
    ) => {
      const Component = styled(
        elem,
        prepareStyle(
          merge(
            extends_ && extends_.reduce((acc, cur) => acc[cur], ctx),
            baseStyle,
            style,
          ),
          ctx,
        ),
        {...baseProps, ...prepareProps(item, rest, ctx), children},
      );
      return <Component>{children}</Component>;
    },
  );
