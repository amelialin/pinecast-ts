import * as React from 'react';

export type Omit<T, K extends keyof T> = T extends any
  ? Pick<T, Exclude<keyof T, K>>
  : never;

export type Sub<T> = T & {[other: string]: any};
