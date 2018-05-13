import Lexer from './lexer';
import {TOKENS} from './tokens';

export default function lexer(tokens: Lexer['tokens'], input: string): Lexer {
  return new Lexer(TOKENS, input);
}

export {default as Token} from './token';
