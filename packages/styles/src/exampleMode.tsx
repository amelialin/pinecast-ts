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
  /^:not\(:empty\)/i,
  /^::placeholder\b/i,
  /^::-webkit-placeholder\b/i,
  /^:nth-/i,
  /^:first-child\b/,
  /^:not\(:first-child\)/,
  /^:last-child\b/,
  /^:not\(:last-child\)/,
];

function normalizeValue(
  key: string,
  value: string | number | Array<string | number>,
): string {
  if (Array.isArray(value)) {
    return value.map(v => normalizeValue(key, v)).join(';');
  }
  if (key === 'lineHeight' && typeof value === 'number') {
    return normalizeValue(key, `${value}px`);
  }
  return compile(`${hyphenateStyleName(key)}:${value}`);
}

function makeCSS(
  className: string,
  pseudoClassOrSelector: string,
  styles: PseudoElementType,
): string {
  if (pseudoClassOrSelector.startsWith(':not(:empty) ')) {
    pseudoClassOrSelector = pseudoClassOrSelector.substr(':not(:empty)'.length);
  } else if (!pseudos.some(x => Boolean(x.exec(pseudoClassOrSelector)))) {
    console.log(
      `Dropping ${pseudoClassOrSelector} from ${className} example mode`,
    );
    return '';
  }
  const compiledStyles = Object.entries(styles)
    .map(([key, value]) => normalizeValue(key, value))
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
  const remainder: CSS = {};
  for (const [key, value] of entries) {
    if (typeof value !== 'object' || Array.isArray(value)) {
      (remainder as any)[key] = value;
      continue;
    }
    css += makeCSS(c, key, value);
  }
  if (Object.keys(remainder).length) {
    const compiledStyles = Object.entries(remainder)
      .map(([key, value]) => normalizeValue(key, value))
      .join(';');
    css += `.${c}{${compiledStyles}}`;
  }
  const inner = React.createElement(elemType, {
    ...ownProps,
    className: css ? className : ownClassName,
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
