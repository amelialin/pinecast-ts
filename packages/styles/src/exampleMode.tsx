import * as React from 'react';

import {CSS, PseudoElementType} from './types';
import {compile} from './unitlessValues';
import hyphenateStyleName from './hyphenateStyleName';

let classIncr = 0;
function getClass(): string {
  classIncr += 1;
  return `__pinecast_${classIncr}`;
}

const pseudos: Array<RegExp> = [
  /^::before\b/i,
  /^::after\b/i,
  /^:before\b/i,
  /^:after\b/i,
  /^:focus\b/i,
  /^:disabled\b/i,
  /^:checked\b/i,
  /^:visited\b/i,
  /^:not(:empty)\b/i,
];

function makeCSS(
  className: string,
  pseudoClassOrSelector: string,
  styles: PseudoElementType,
): string {
  if (!pseudos.some(x => Boolean(x.exec(pseudoClassOrSelector)))) {
    console.log(
      `Dropping ${pseudoClassOrSelector} from ${className} example mode`,
    );
    return '';
  }
  const compiledStyles = Object.entries(styles)
    .map(([key, value]) => compile(`${hyphenateStyleName(key)}:${value}`))
    .join(';');
  return `.${className}${pseudoClassOrSelector}{${compiledStyles}}`;
}

export function renderExampleMode(
  elemType: string,
  ownClassName: string | null | undefined,
  ownProps: any,
  styleResult: CSS,
): React.ReactNode {
  const c = getClass();
  const entries = Object.entries(styleResult);
  const className = ownClassName ? `${c} ${ownClassName}` : c;

  let css = '';
  for (const [key, value] of entries) {
    if (typeof value !== 'object') {
      continue;
    }
    css += makeCSS(c, key, value);
  }
  const inner = React.createElement(elemType, {
    ...ownProps,
    className: css ? className : ownClassName,
    style: entries.reduce(
      (acc, [key, val]) => {
        if (!/^[\w\-]+/.exec(key)) {
          return acc;
        }
        acc[key] = val;
        return acc;
      },
      {} as {[key: string]: any},
    ),
  });
  if (!css) {
    return inner;
  }
  return (
    <React.Fragment>
      <style>{css}</style>
      {inner}
    </React.Fragment>
  );
}
