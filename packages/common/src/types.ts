import * as React from 'react';

export type Omit<T, K extends keyof T> = T extends any
  ? Pick<T, Exclude<keyof T, K>>
  : never;

export type Sub<T> = T & {[other: string]: any};

export type Children =
  | React.ReactNode
  | Array<
      | Array<JSX.Element | string | number | boolean | null | undefined>
      | JSX.Element
      | string
      | number
      | boolean
      | null
      | undefined
    >
  | JSX.Element
  | string
  | number
  | boolean
  | null
  | undefined;
