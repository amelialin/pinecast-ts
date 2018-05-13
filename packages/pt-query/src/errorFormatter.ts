export default class ErrorFormatter {
  lines: Array<string>;

  constructor(lines: Array<string>) {
    this.lines = lines;
  }

  getColumn(startIndex: number): number {
    let consumed = 0;

    for (let i = 0; i < this.lines.length; i++) {
      let line = this.lines[i];
      if (consumed + line.length + 1 > startIndex) {
        break;
      }
      consumed += line.length + 1;
    }
    return startIndex - consumed + 1;
  }

  getLine(startIndex: number): number {
    let consumed = 0;

    for (let i = 0; i < this.lines.length; i++) {
      let line = this.lines[i];
      if (consumed + line.length + 1 > startIndex) {
        return i + 1;
      }
      consumed += line.length + 1;
    }
    return this.lines.length;
  }

  getVerboseErrorAtIndex(line: number, startIndex: number): string {
    return this.getVerboseError(line, this.getColumn(startIndex));
  }

  getVerboseError(line: number, column: number): string {
    const [lineData, offset] = this.getTrimmedLine(
      this.lines[line - 1],
      column,
    );

    const hasPreviousLine = line > 1;
    const hasNextLine = line < this.lines.length;

    const prefixLength = hasNextLine
      ? (line + 1).toString().length
      : line.toString().length;

    const prefix = this.rpad(line.toString(), prefixLength);
    const cursorPrefix = this.rpad('', prefixLength);

    let output = `${prefix} | ${lineData}\n${cursorPrefix} | `;
    output += this.getVerboseErrorCursor(column + offset);
    output += ` (${line}:${column})`;

    if (hasPreviousLine) {
      output =
        this.rpad((line - 1).toString(), prefixLength) +
        ' | ' +
        this.getTrimmedLine(this.lines[line - 2])[0] +
        '\n' +
        output;
    }
    if (hasNextLine) {
      output +=
        '\n' +
        this.rpad((line + 1).toString(), prefixLength) +
        ' | ' +
        this.getTrimmedLine(this.lines[line])[0] +
        '\n';
    }

    return output;
  }

  private rpad(string: string, length: number, padWith: string = ' '): string {
    return string + new Array(length - string.length + 1).join(padWith);
  }

  getTrimmedLine(lineData: string, column: number = 0): [string, number] {
    let offset = 0;
    if (column > 40) {
      const origLineLen = lineData.length;
      lineData = '...' + lineData.substr(column - 37);
      const finalLineLen = lineData.length;
      offset -= origLineLen - finalLineLen;
    }
    if (lineData.length > 80) {
      lineData = lineData.substr(0, 77) + '...';
    }

    return [lineData, offset];
  }

  /**
   * Returns the cursor for the verbose error
   * @param  {int} position The start index of the cursor
   * @return {string}
   */
  getVerboseErrorCursor(position: number): string {
    return new Array(position).join(' ') + '^';
  }
}
