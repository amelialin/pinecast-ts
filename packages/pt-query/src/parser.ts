import Lexer from './lexer';
import RootQuery from './query/rootQuery';
import SelectClause, {Aggregation} from './query/selectClause';
import * as symbols from './symbols';

function raiseSyntaxError(
  message: string,
  startIndex: number,
  endIndex: number,
): never {
  const err = new SyntaxError(message);
  (err as any)[symbols.ERR_MSG] = message;
  (err as any)[symbols.ERR_START] = startIndex;
  (err as any)[symbols.ERR_END] = endIndex;
  throw err;
}

function parseFrom(lexer: Lexer): RootQuery {
  lexer.assert('from');
  const ident = lexer.assert('identifier');
  return new RootQuery(ident.text);
}

function parseSelectClauses(lexer: Lexer): Array<SelectClause> {
  const clauses: Array<SelectClause> = [];
  let select;
  while ((select = lexer.accept('select'))) {
    const aggregation = lexer.accept('count') || lexer.accept('count distinct');
    if (!aggregation) {
      raiseSyntaxError(
        'Expected aggregation like `COUNT` or `COUNT DISTINCT`',
        lexer.pointer,
        lexer.pointer,
      );
      throw new Error('unreachable');
    }

    const field = lexer.assert('identifier').text;
    lexer.assert('as');
    const name = lexer.assert('identifier').text;

    clauses.push(
      new SelectClause(aggregation.text as Aggregation, field, name),
    );
  }

  return clauses;
}

export default function parse(lexer: Lexer): RootQuery {
  const query = parseFrom(lexer);
  query.selectClauses = parseSelectClauses(lexer);
  return query;
}
