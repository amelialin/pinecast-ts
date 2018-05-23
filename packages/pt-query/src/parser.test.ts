import Lexer from './lexer';
import parse from './parser';
import {TOKENS} from './tokens';

function doParse(value: string) {
  const lexer = new Lexer(TOKENS, value);
  return parse(lexer);
}

const alreadyChecked = new Set<string>();
function check(raw: string, reformatted: string = raw) {
  it(`should handle ${raw.trim()}`, () => {
    const parsed = doParse(raw).toString();
    expect(parsed).toBe(reformatted);

    if (alreadyChecked.has(parsed)) {
      return;
    }

    // Check that the output is deterministic
    const reparsed = doParse(parsed).toString();
    expect(reparsed).toBe(reformatted);
    alreadyChecked.add(parsed);
  });
}

function checkFail(raw: string, errorText: string | RegExp) {
  it(`should fail on ${raw.trim()} with "${errorText}"`, () => {
    expect(() => {
      doParse(raw);
    }).toThrowError(errorText);
  });
}

describe('parser', () => {
  describe('success tests', () => {
    check('FROM listens SELECT COUNT AS foo WHERE x = TRUE');
    check('FROM listens SELECT COUNT DISTINCT bar AS foo WHERE x = TRUE');
    check(
      `
      FROM listens
      SELECT COUNT AS foo WHERE x = TRUE
      SELECT COUNT AS bar WHERE x = FALSE
      `,
      'FROM listens SELECT COUNT AS foo WHERE x = TRUE SELECT COUNT AS bar WHERE x = FALSE',
    );

    describe('operator precedence and parentheses', () => {
      check(
        'FROM listens SELECT COUNT AS foo WHERE x = TRUE AND y = False',
        'FROM listens SELECT COUNT AS foo WHERE (x = TRUE AND y = FALSE)',
      );
      check(
        'FROM listens SELECT COUNT AS foo WHERE (x = TRUE AND y = False)',
        'FROM listens SELECT COUNT AS foo WHERE (x = TRUE AND y = FALSE)',
      );
      check(
        'FROM listens SELECT COUNT AS foo WHERE x = TRUE AND (y = False)',
        'FROM listens SELECT COUNT AS foo WHERE (x = TRUE AND y = FALSE)',
      );
      check(
        'FROM listens SELECT COUNT AS foo WHERE (x = TRUE) AND y = False',
        'FROM listens SELECT COUNT AS foo WHERE (x = TRUE AND y = FALSE)',
      );

      check(
        'FROM listens SELECT COUNT AS foo WHERE x = "a" AND y = "b" OR a = "z" AND b = "a"',
        'FROM listens SELECT COUNT AS foo WHERE ((x = "a" AND y = "b") OR (a = "z" AND b = "a"))',
      );
      check(
        'FROM listens SELECT COUNT AS foo WHERE (x = "a" AND y = "b" OR a = "z") AND b = "a"',
        'FROM listens SELECT COUNT AS foo WHERE (((x = "a" AND y = "b") OR a = "z") AND b = "a")',
      );
    });

    describe('strings', () => {
      check('FROM listens SELECT COUNT AS foo WHERE x = "\\n"');
      check('FROM listens SELECT COUNT AS foo WHERE x = "\\\\"');
      check('FROM listens SELECT COUNT AS foo WHERE x = "\\\\n"');
      check('FROM listens SELECT COUNT AS foo WHERE x = "\\""');
      check(
        'FROM listens SELECT COUNT AS foo WHERE x = "\\\'"',
        'FROM listens SELECT COUNT AS foo WHERE x = "\'"',
      );
    });
  });

  describe('failure tests', () => {
    checkFail('FROM listens', 'Expected one or more SELECT clauses');
    checkFail('FROM listens SELECT COUNT DISTINCT', 'Unexpected end of query');
    checkFail(
      'FROM listens SELECT COUNT DISTINCT AS foo',
      'Expected to find field to count with COUNT DISTINCT',
    );
    checkFail(
      'FROM listens SELECT COUNT AS foo WHERE x = "\\?"',
      'Invalid escape code "\\?"',
    );
    checkFail(
      'FROM listens SELECT COUNT AS foo WHERE x = y',
      'Expected a value',
    );
    checkFail(
      'FROM listens SELECT COUNT AS foo WHERE x',
      'Expected boolean operator, like `=` or `!=`.',
    );
    checkFail('FROM listens SELECT x AS foo', 'Expected aggregation');
  });
});
