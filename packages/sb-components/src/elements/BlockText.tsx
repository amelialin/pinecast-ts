import * as moment from 'moment';
import * as React from 'react';

import {Sub} from '@pinecast/common/types';

import atom from './atom';
import {blockChildren} from './children';
import {ComponentContext, getsContext} from '../componentContext';
import {Element} from '../primitives';
import expandElementOptions from './globalElementOptions';
import {extractProps} from './extractor';
import {formatColor} from '../helpers';

function extendPseudo(
  acc: Sub<Object> = {},
  pseudo: string,
  data: Sub<React.CSSProperties>,
): string {
  if (pseudo === 'elem') {
    if (!acc[':before']) {
      pseudo = ':before';
    } else if (!acc[':after']) {
      pseudo = ':after';
    } else {
      throw new Error(
        'Element has no pseudoelements remaining for element option',
      );
    }
  }

  acc[pseudo] = acc[pseudo] || {};
  Object.keys(data).forEach(k => {
    if (k[0] === ':') {
      extendPseudo(acc[pseudo], k, data[k]);
      return;
    }
    acc[pseudo][k] = data[k];
  });

  return pseudo;
}

type maxLineFadeType = {color: string; height: number};

const optionKeys = [
  'maxLines',
  'maxLinesOnHover',
  'singleLineTruncation',
  'maxLineFade',
];

function styleOptions(
  baseStyles: React.CSSProperties,
  element: Element,
  ctx: ComponentContext,
): Object {
  const options = element.elementOptions;
  if (!options) {
    return baseStyles;
  }
  return optionKeys.reduce(
    (acc: Sub<React.CSSProperties>, cur: string): React.CSSProperties => {
      if (!(cur in options)) {
        return acc;
      }
      switch (cur) {
        case 'maxLines':
          acc.maxHeight =
            parseFloat(String(acc.lineHeight)) * Number(options.maxLines);
          acc.overflow = 'hidden';
          break;
        case 'maxLinesOnHover':
          if (!options.maxLines) {
            return acc;
          }
          acc.transition = acc.transition ? acc.transition + ', ' : '';
          acc.transition += 'max-height 0.2s';
          extendPseudo(acc, ':hover', {
            maxHeight:
              parseFloat(String(acc.lineHeight)) *
              Number(options.maxLinesOnHover),
          });
          break;
        case 'singleLineTruncation':
          if (!options.singleLineTruncation) {
            return acc;
          }
          acc.overflow = 'hidden';
          acc.textOverflow = options.singleLineTruncation;
          acc.whiteSpace = 'nowrap';
          break;
        case 'maxLineFade':
          if (!options.maxLines) {
            return acc;
          }
          const maxLineFade: maxLineFadeType = (options.maxLineFade as any) as maxLineFadeType;
          if (!acc.position || acc.position === 'static') {
            acc.position = 'relative';
          }
          const mlfPseudo = extendPseudo(acc, 'elem', {
            backgroundImage: `linear-gradient(0deg, ${formatColor(
              maxLineFade.color,
              ctx,
            )}, transparent)`,
            content: '""',
            display: 'block',
            height: maxLineFade.height,
            left: 0,
            position: 'absolute',
            right: 0,
            top: (acc.maxHeight as number) - maxLineFade.height,
            transition: 'top 0.2s',
          });
          if (options.maxLinesOnHover) {
            extendPseudo(acc, ':hover' + mlfPseudo, {
              top: acc[':hover'].maxHeight - maxLineFade.height,
            });
          }
          break;
      }
      return acc;
    },
    expandElementOptions(baseStyles, options) as React.CSSProperties,
  );
}

function processContent<T>(content: T, element: Element): T | string {
  if (
    typeof content === 'string' &&
    element.elementOptions &&
    element.elementOptions.transform
  ) {
    switch (element.elementOptions.transform) {
      case 'date.fromNow':
        return ((moment as any).default as typeof moment)(
          Date.parse(String(content)),
        ).fromNow();
    }
  }
  return content;
}

export default getsContext(
  (
    {element, item, style}: {element: Element; item: Object; style: Object},
    {ctx}: {ctx: ComponentContext},
  ) => {
    const Wrapper = atom(element.tagName || 'div');
    return (
      <Wrapper
        {...element.props}
        {...extractProps(item, element.propPaths)}
        children={processContent(blockChildren(item, element), element)}
        style={styleOptions(
          {
            display: 'block',
            fontSize: '1em',
            fontWeight: 'normal',
            ...(element.extendsStyles &&
              element.extendsStyles.reduce((acc: any, cur) => acc[cur], ctx)),
            ...style,
            ...element.styles,
          },
          element,
          ctx,
        )}
      />
    );
  },
);
