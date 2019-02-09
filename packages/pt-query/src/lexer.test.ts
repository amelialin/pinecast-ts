import Lexer from './lexer';
import Token from './token';
import {TOKENS} from './tokens';

describe('lexer', () => {
  it('should parse a token stream', () => {
    const lex = new Lexer(
      TOKENS,
      'FROM listens SELECT COUNT as c WHERE x == TRUE',
    );
    const out: Array<Token | 'EOF'> = [];
    while (lex.peek() !== 'EOF') {
      out.push(lex.next());
    }

    expect(out.map(x => (x === 'EOF' ? x : x.type))).toEqual([
      'from',
      'identifier',
      'select',
      'count',
      'as',
      'identifier',
      'where',
      'identifier',
      '=',
      'true',
    ]);
  });
});
