import {BooleanExpression} from './types';

export default class BinaryOr {
  left: BooleanExpression;
  right: BooleanExpression;

  constructor(left: BooleanExpression, right: BooleanExpression) {
    this.left = left;
    this.right = right;
  }

  toString(): string {
    return `(${this.left.toString()} OR ${this.right.toString()})`;
  }
}
