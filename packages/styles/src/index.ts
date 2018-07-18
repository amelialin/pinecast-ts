import {StyletronProvider} from 'styletron-react';

import ClientStyletron from './ClientStyletron';
import {CSS, CSSProperties} from './types';
import ServerStyletron from './ServerStyletron';
import styled from './styled';

export default styled;
export {
  ClientStyletron,
  CSS,
  CSSProperties,
  ServerStyletron,
  StyletronProvider,
  styled,
};

function unCalc(
  value: string | number,
  multiplication: boolean = false,
): string {
  if (typeof value === 'number') {
    return multiplication ? value.toString() : `${value}px`;
  }
  if (value.startsWith('calc(')) {
    return value.substr(4);
  }
  return value;
}

export function calc(
  strings: TemplateStringsArray,
  ...bits: Array<string | number>
): string {
  if (!strings[0].startsWith('calc(')) {
    throw new Error('calc template literal must begin with `calc(`');
  }
  if (!strings[strings.length - 1].endsWith(')')) {
    throw new Error('calc template literal must end with `)`');
  }
  return strings
    .map((s, i) => {
      if (i) {
        return (
          unCalc(
            bits[i - 1],
            s.includes('*') ||
              s.includes('/') ||
              strings[i - 1].includes('*') ||
              strings[i - 1].includes('/'),
          ) + s
        );
      }
      return s;
    })
    .join('');
}
