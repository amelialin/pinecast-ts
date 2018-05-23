export default class Boolean {
  value: boolean;
  constructor(value: boolean) {
    this.value = value;
  }

  toString(): string {
    return this.value ? 'TRUE' : 'FALSE';
  }
}
