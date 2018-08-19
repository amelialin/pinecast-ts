import {Component} from 'react';

export abstract class BaseFieldComponent extends Component {
  setEmpty(className: string, e: {target: {value: string}}) {
    e.target.className = `${className} ${e.target.value ? '' : 'is-empty'} ${
      this.isValid ? '' : 'is-invalid'
    }`;
  }
}

export abstract class FieldComponent extends BaseFieldComponent {
  get value(): string {
    return (this.field && this.field.value) || '';
  }

  get isValid() {
    return this.field.checkValidity();
  }
}
