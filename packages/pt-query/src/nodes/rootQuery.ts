import SelectClause from './selectClause';

export default class RootQuery {
  sourceTable: string;
  selectClauses: Array<SelectClause> = [];

  constructor(sourceTable: string) {
    this.sourceTable = sourceTable;
  }

  toString(): string {
    return `FROM ${this.sourceTable} ${this.selectClauses
      .map(s => s.toString())
      .join(' ')}`;
  }
}
