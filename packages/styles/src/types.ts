import * as React from 'react';

export type Omit<T, K extends keyof T> = T extends any
  ? Pick<T, Exclude<keyof T, K>>
  : never;

export type MappedCSSProperties = {
  [k in keyof React.CSSProperties]?:
    | React.CSSProperties[k]
    | Array<React.CSSProperties[k]>
    | string
    | number
};

export type CSSProperties = MappedCSSProperties & {
  WebkitAppearance?: 'none' | string | undefined;
};

export type PseudoElementType = Omit<CSSProperties, 'content'> & {
  content?: string;
};

export interface CSS extends CSSProperties {
  ':active'?: CSSProperties;
  ':focus'?: CSSProperties;
  ':hover'?: CSSProperties;
  ':visited'?: CSSProperties;
  ':not(:active)'?: CSSProperties;
  ':not(:focus)'?: CSSProperties;
  ':not(:hover)'?: CSSProperties;
  ':not(:visited)'?: CSSProperties;

  ':disabled'?: CSSProperties;
  ':invalid'?: CSSProperties;
  ':checked'?: CSSProperties;
  ':not(:disabled)'?: CSSProperties;
  ':not(:invalid)'?: CSSProperties;
  ':not(:checked)'?: CSSProperties;

  ':first-child'?: CSSProperties;
  ':first-of-type'?: CSSProperties;
  ':last-child'?: CSSProperties;
  ':last-of-type'?: CSSProperties;
  ':not(:first-child)'?: CSSProperties;
  ':not(:first-of-type)'?: CSSProperties;
  ':not(:last-child)'?: CSSProperties;
  ':not(:last-of-type)'?: CSSProperties;

  ':after'?: PseudoElementType;
  ':before'?: PseudoElementType;
  ':active:before'?: PseudoElementType;
  ':focus:before'?: PseudoElementType;
  ':hover:before'?: PseudoElementType;
  ':active:after'?: PseudoElementType;
  ':focus:after'?: PseudoElementType;
  ':hover:after'?: PseudoElementType;

  '::after'?: PseudoElementType;
  '::before'?: PseudoElementType;
  ':active::before'?: PseudoElementType;
  ':focus::before'?: PseudoElementType;
  ':hover::before'?: PseudoElementType;
  ':active::after'?: PseudoElementType;
  ':focus::after'?: PseudoElementType;
  ':hover::after'?: PseudoElementType;

  '@media (mobile)'?: CSS;
  '@media (max-width: 900px)'?: CSS;
  '@media (max-width: 800px)'?: CSS;
  '@media (max-width: 700px)'?: CSS;
  '@media (max-width: 600px)'?: CSS;
  '@media (max-width: 500px)'?: CSS;
}
