import SelectClause from './selectClause';

export default class RootQuery {
  sourceTable: string;
  selectClauses: Array<SelectClause> = [];

  constructor(sourceTable: string) {
    this.sourceTable = sourceTable;
  }
}
