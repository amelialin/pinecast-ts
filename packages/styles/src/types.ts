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

export interface CSS extends CSSProperties {
  ':active'?: CSSProperties;
  ':focus'?: CSSProperties;
  ':hover'?: CSSProperties;
  ':visited'?: CSSProperties;

  ':disabled'?: CSSProperties;
  ':invalid'?: CSSProperties;
  ':checked'?: CSSProperties;

  ':first-child'?: CSSProperties;
  ':first-of-type'?: CSSProperties;
  ':last-child'?: CSSProperties;
  ':last-of-type'?: CSSProperties;

  ':after'?: CSSProperties & {content?: string};
  ':before'?: CSSProperties & {content?: string};
  ':active:before'?: CSSProperties & {content?: string};
  ':focus:before'?: CSSProperties & {content?: string};
  ':hover:before'?: CSSProperties & {content?: string};
  ':active:after'?: CSSProperties & {content?: string};
  ':focus:after'?: CSSProperties & {content?: string};
  ':hover:after'?: CSSProperties & {content?: string};

  '::after'?: CSSProperties & {content?: string};
  '::before'?: CSSProperties & {content?: string};
  ':active::before'?: CSSProperties & {content?: string};
  ':focus::before'?: CSSProperties & {content?: string};
  ':hover::before'?: CSSProperties & {content?: string};
  ':active::after'?: CSSProperties & {content?: string};
  ':focus::after'?: CSSProperties & {content?: string};
  ':hover::after'?: CSSProperties & {content?: string};

  '@media (mobile)'?: CSS;
  '@media (max-width: 900px)'?: CSS;
  '@media (max-width: 800px)'?: CSS;
}
