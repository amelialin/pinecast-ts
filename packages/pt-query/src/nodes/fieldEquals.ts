import {ValueExpression} from './types';

export default class FieldEquals {
  field: string;
  value: ValueExpression;

  constructor(field: string, value: ValueExpression) {
    this.field = field;
    this.value = value;
  }

  toString(): string {
    return `${this.field.toString()} = ${this.value.toString()}`;
  }
}
