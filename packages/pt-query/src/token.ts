export default class Token {
  text: string;
  type: string;

  start: number;
  end: number;

  line: number;
  column: number;

  isToken: true = true;

  constructor(
    text: string,
    type: string,
    start: number,
    end: number,
    line: number,
    column: number,
  ) {
    this.text = text;
    this.type = type;
    this.start = start;
    this.end = end;
    this.line = line;
    this.column = column;
  }

  toString(): string {
    return `[token ${this.type}]`;
  }

  clone() {
    return new Token(
      this.text,
      this.type,
      this.start,
      this.end,
      this.line,
      this.column,
    );
  }
}
