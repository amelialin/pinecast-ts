type BaseProps = {
  name: string;
  field: string;
  open: boolean;
};

export type BoolProps = BaseProps & {
  onChange: (field: string, newValue: boolean) => void;
  type: 'bool';
  value: boolean;
};
export type EnumProps = BaseProps & {
  onChange: (field: string, newValue: string | number) => void;
  options: Array<{label: string; key: string | number}>;
  type: 'enum';
  value: string | number;
};
export type LongTextProps = BaseProps & {
  onChange: (field: string, newValue: string) => void;
  type: 'longText';
  value: string;
};
export type NumberProps = BaseProps & {
  canBeNegative?: boolean;
  max?: number;
  min?: number;
  onChange: (field: string, newValue: number) => void;
  suffix?: string;
  type: 'number';
  value: number;
};
export type OrderedSetProps = BaseProps & {
  onChange: (field: string, newValue: Array<string>) => void;
  options: Array<{label: string; key: string}>;
  type: 'orderedSet';
  value: Array<string>;
};
export type FixedWidthProps = BaseProps & {
  onChange: (field: string, newValue: {[key: string]: any}) => void;
  type: 'rootComponents.fixedWidth';
  value: {[key: string]: any};
};
export type TextProps = BaseProps & {
  onChange: (field: string, newValue: string) => void;
  type: 'text';
  value: string;
};
export type PaddingProps = BaseProps & {
  onChange: (field: string, newValue: string) => void;
  type: 'padding';
  value: string;
};
export type ColorProps = BaseProps & {
  onChange: (field: string, newValue: string) => void;
  type: 'color';
  value: string;
};

export type SchemaProps =
  | BoolProps
  | ColorProps
  | EnumProps
  | FixedWidthProps
  | LongTextProps
  | NumberProps
  | OrderedSetProps
  | PaddingProps
  | TextProps;
