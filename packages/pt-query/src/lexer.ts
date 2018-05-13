import * as symbols from './symbols';
import Token from './token';

export default class Lexer {
  tokens: Array<[RegExp, string | null]>;
  pointer: number = 0;
  currentLine: number = 1;
  lineIndex: number = 0;

  originalData: string;
  remainingData: string;

  peeked: Token | 'EOF' | null = null;

  constructor(tokens: Array<[RegExp, string | null]>, text: string) {
    this.tokens = tokens;
    this.originalData = text;
    this.remainingData = text;
  }

  getColumn(index: number): number {
    return index - this.lineIndex;
  }

  next(): Token | 'EOF' {
    if (this.peeked !== null) {
      const tmp = this.peeked;
      this.peeked = null;
      return tmp;
    }

    if (!this.remainingData || !this.remainingData.trim()) return 'EOF';

    let startPointer = this.pointer;
    for (let i = 0; i < this.tokens.length; i++) {
      const tok = this.tokens[i];
      const match = tok[0].exec(this.remainingData);
      if (!match) {
        continue;
      }
      if (match.index !== 0) {
        continue;
      }
      this.remainingData = this.remainingData.substr(match[0].length);

      let lineSplit = match[0].split(/(?:\r\n|\r|\n)/);
      let addedLines = lineSplit.length - 1;
      if (addedLines) {
        this.currentLine += addedLines;
        this.lineIndex =
          this.pointer + lineSplit.slice(0, -1).join('\n').length;
      }

      this.pointer += match[0].length;
      if (!tok[1] || tok[1] === 'comment') {
        i = -1;
        startPointer = this.pointer;
        continue;
      }
      return new Token(
        match[0],
        tok[1] as string,
        startPointer,
        this.pointer,
        this.currentLine,
        startPointer - this.lineIndex,
      );
    }

    if (!this.remainingData.trim()) return 'EOF';

    throw this.SyntaxError(
      'Unknown token',
      this.currentLine,
      startPointer - this.lineIndex,
    );
  }

  peek(): Token | 'EOF' {
    if (this.peeked !== null) {
      return this.peeked;
    }
    const next = this.next();
    this.peeked = next;
    return next;
  }

  unpeek(token: Token | 'EOF') {
    if (this.peeked) {
      throw new Error('Unexpected unpeek');
    }
    this.peeked = token;
  }

  accept(tokenType: 'EOF'): 'EOF' | null;
  accept(tokenType: string): Token | null;
  accept(tokenType: string): Token | 'EOF' | null {
    const peeked = this.peek();
    if (
      (peeked === 'EOF' && tokenType === 'EOF') ||
      (peeked !== 'EOF' && peeked.type !== tokenType)
    ) {
      return null;
    }
    return this.next();
  }

  assert(tokenType: 'EOF'): 'EOF';
  assert(tokenType: string): Token;
  assert(tokenType: string | 'EOF'): Token | 'EOF' | null {
    const next = this.next();
    if (next === 'EOF') {
      if (tokenType !== 'EOF') {
        throw this.SyntaxError(
          `Expected ${tokenType} but reached the end of the file`,
          this.currentLine,
          this.getColumn(this.pointer),
        );
      }
    } else if (next.type !== tokenType) {
      throw this.SyntaxError(
        `Unexpected token "${next.type}", expected "${tokenType}"`,
        this.currentLine,
        this.getColumn(this.pointer - next.text.length),
      );
    }
    return next;
  }

  SyntaxError(message: string, line: number, col: number): SyntaxError {
    const out = new SyntaxError(message);
    (out as any)[symbols.ERR_MSG] = message;
    (out as any)[symbols.ERR_LINE] = line;
    (out as any)[symbols.ERR_COL] = col;
    return out;
  }
}
