import {Aggregation, BooleanExpression} from './types';

export default class SelectClause {
  aggregation: Aggregation;
  aggregationField: string | null;
  name: string;
  condition: BooleanExpression | null;
  groupBy: string | null;

  constructor(
    aggregation: Aggregation,
    aggregationField: string | null,
    name: string,
    condition: BooleanExpression | null,
    groupBy: string | null = null,
  ) {
    this.aggregation = aggregation.toUpperCase();
    this.aggregationField = aggregationField;
    this.name = name;
    this.condition = condition;
    this.groupBy = groupBy;
  }

  toString(): string {
    const aggregation = this.aggregationField
      ? `${this.aggregation} ${this.aggregationField}`
      : this.aggregation;
    let base = `SELECT ${aggregation} AS ${this.name}`;
    if (this.condition) {
      base += ` WHERE ${this.condition.toString()}`;
    }
    if (this.groupBy) {
      base += ` GROUP BY ${this.groupBy}`;
    }
    return base;
  }
}
