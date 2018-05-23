import BinaryAnd from './binaryAnd';
import BinaryOr from './binaryOr';
import Boolean from './boolean';
import FieldEquals from './fieldEquals';
import FieldDoesNotEqual from './fieldDoesNotEqual';
import String from './string';

export type Aggregation = 'count' | 'count distinct';

export type BooleanExpression =
  | BinaryAnd
  | BinaryOr
  | FieldEquals
  | FieldDoesNotEqual;

export type ValueExpression = Boolean | String;
