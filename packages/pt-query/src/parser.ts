import {Aggregation, BooleanExpression, ValueExpression} from './nodes/types';
import ErrorFormatter from './errorFormatter';
import Lexer from './lexer';
import * as nodes from './nodes';
import * as symbols from './symbols';

function raiseSyntaxError(
  message: string,
  startIndex: number,
  endIndex: number = startIndex,
): SyntaxError {
  const err = new SyntaxError(message);
  (err as any)[symbols.ERR_MSG] = message;
  (err as any)[symbols.ERR_START] = startIndex;
  (err as any)[symbols.ERR_END] = endIndex;
  return err;
}

function parseFrom(lexer: Lexer): nodes.RootQuery {
  lexer.assert('from');
  const ident = lexer.assert('identifier');
  return new nodes.RootQuery(ident.text);
}

function parseSelectClauses(lexer: Lexer): Array<nodes.SelectClause> {
  const clauses: Array<nodes.SelectClause> = [];
  let select;
  while ((select = lexer.accept('select'))) {
    const aggregation = lexer.accept('count') || lexer.accept('count distinct');
    if (!aggregation) {
      throw raiseSyntaxError(
        'Expected aggregation like `COUNT` or `COUNT DISTINCT`',
        lexer.pointer,
      );
    }

    let aggregationField: string | null = null;
    if (aggregation.text.toUpperCase() === 'COUNT DISTINCT') {
      const peeked = lexer.peek();
      if (peeked === 'EOF') {
        throw raiseSyntaxError('Unexpected end of query', lexer.pointer);
      } else if (peeked.type !== 'identifier') {
        throw raiseSyntaxError(
          'Expected to find field to count with COUNT DISTINCT',
          lexer.pointer,
        );
      }
      aggregationField = lexer.assert('identifier').text;
    }
    lexer.assert('as');
    const name = lexer.assert('identifier').text;

    let whereClause: BooleanExpression | null = null;
    if (lexer.accept('where')) {
      whereClause = parseBooleanExpression(lexer);
    }

    let groupBy: string | null = null;
    if (lexer.accept('group by')) {
      groupBy = lexer.assert('identifier').text;
    }

    clauses.push(
      new nodes.SelectClause(
        aggregation.text.toLowerCase() as Aggregation,
        aggregationField,
        name,
        whereClause,
        groupBy,
      ),
    );
  }

  if (!clauses.length) {
    throw raiseSyntaxError(
      'Expected one or more SELECT clauses',
      lexer.pointer,
    );
  }

  return clauses;
}

function parseValue(lexer: Lexer): ValueExpression {
  if (lexer.accept('true')) {
    return new nodes.Boolean(true);
  }
  if (lexer.accept('false')) {
    return new nodes.Boolean(false);
  }

  const str = lexer.accept('str');
  if (str) {
    const stripped = str.text
      .substring(1, str.text.length - 1)
      .replace(/\\(.)/gi, (_, b) => {
        switch (b) {
          case "'":
            return "'";
          case '"':
            return '"';
          case 'n':
            return '\n';
          case '\\':
            return '\\';
          default:
            throw raiseSyntaxError(
              `Invalid escape code "\\${b}"`,
              str.start,
              str.end,
            );
        }
      });
    return new nodes.String(stripped);
  }

  throw raiseSyntaxError('Expected a value', lexer.pointer);
}
function parseFieldComparison(lexer: Lexer): BooleanExpression {
  const ident = lexer.assert('identifier');
  const operator = lexer.accept('=') || lexer.accept('!=');
  if (!operator) {
    throw raiseSyntaxError(
      'Expected boolean operator, like `=` or `!=`.',
      lexer.pointer,
    );
  }
  const value = parseValue(lexer);
  if (operator.text === '=') {
    return new nodes.FieldEquals(ident.text, value);
  } else if (operator.text === '!=') {
    return new nodes.FieldDoesNotEqual(ident.text, value);
  } else {
    throw new Error('unreachable');
  }
}
function parseBinANDExpression(lexer: Lexer): BooleanExpression {
  const left = parseParenthesizedBinaryExpression(lexer, parseFieldComparison);
  if (!lexer.accept('and')) {
    return left;
  }
  const right = parseParenthesizedBinaryExpression(lexer, parseFieldComparison);
  return new nodes.BinaryAnd(left, right);
}
function parseBinORExpression(lexer: Lexer): BooleanExpression {
  const left = parseBinANDExpression(lexer);
  if (!lexer.accept('or')) {
    return left;
  }
  const right = parseBinORExpression(lexer);
  return new nodes.BinaryOr(left, right);
}
function parseParenthesizedBinaryExpression(
  lexer: Lexer,
  fallback: (lexer: Lexer) => BooleanExpression,
): BooleanExpression {
  if (lexer.accept('(')) {
    const out = parseBooleanExpression(lexer);
    lexer.assert(')');
    return out;
  }
  return fallback(lexer);
}

function parseBooleanExpression(lexer: Lexer): BooleanExpression {
  return parseBinORExpression(lexer);
}

export default function parse(lexer: Lexer): nodes.RootQuery {
  try {
    const query = parseFrom(lexer);
    query.selectClauses = parseSelectClauses(lexer);
    return query;
  } catch (e) {
    if (!(e instanceof SyntaxError) || !(e as any)[symbols.ERR_MSG]) {
      throw e;
    }
    const errorFormatter = new ErrorFormatter(lexer.originalData.split('\n'));
    if (typeof (e as any)[symbols.ERR_START] !== 'undefined') {
      (e as any)[symbols.ERR_LINE] = errorFormatter.getLine(
        (e as any)[symbols.ERR_START],
      );
      (e as any)[symbols.ERR_COL] = errorFormatter.getColumn(
        (e as any)[symbols.ERR_START],
      );
    }
    const snippet = errorFormatter.getVerboseError(
      (e as any)[symbols.ERR_LINE],
      (e as any)[symbols.ERR_COL],
    );
    e.message += `\n${snippet}\n`;
    throw e;
  }
}
