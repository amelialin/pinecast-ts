export type Aggregation = 'count' | 'count distinct';

export default class SelectClause {
  aggregation: Aggregation;
  aggregationField: string;
  name: string;

  constructor(
    aggregation: Aggregation,
    aggregationField: string,
    name: string,
  ) {
    this.aggregation = aggregation;
    this.aggregationField = aggregationField;
    this.name = name;
  }
}
