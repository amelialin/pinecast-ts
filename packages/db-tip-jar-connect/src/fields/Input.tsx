import * as React from 'react';

import {gettext} from '@pinecast/i18n';

type ValidationReturn = React.ReactNode | null;
type ValidationRule = (value: string) => ValidationReturn;

export const compose = (...funcs: Array<ValidationRule>): ValidationRule => (
  value: string,
) => funcs.reduce((acc, cur) => acc || cur(value), null);

export function required(value: string): ValidationReturn {
  return value ? null : gettext('This field is required');
}
export const minLength = (length: number): ValidationRule => (
  value: string,
): ValidationReturn =>
  value.length >= length
    ? null
    : gettext(`Expected at least ${length} characters.`);
export const maxLength = (length: number): ValidationRule => (
  value: string,
): ValidationReturn =>
  value.length <= length
    ? null
    : gettext(`Expected up to ${length} characters.`);
export const length = (length: number): ValidationRule => (
  value: string,
): ValidationReturn =>
  value.length === length
    ? null
    : gettext(`Expected exactly ${length} characters.`);

export type RenderProps = {
  error: ValidationReturn;
  onBlur: () => void;
  onChange: (value: string) => void;
  valid: boolean;
  value: string;
};

export default class Input extends React.Component {
  props: {
    children: (props: RenderProps) => React.ReactNode;
    onChange: (value: string) => void;
    validation: ValidationRule;
    value: string;
  };
  state: {touched: boolean; error: ValidationReturn} = {
    touched: false,
    error: null,
  };

  handleBlur = () => {
    this.setState({touched: true});
  };
  handleChange = (value: string) => {
    const valid = this.props.validation(value);
    this.setState({touched: true, valid});
    if (value) {
      this.props.onChange(value);
    }
  };
  render() {
    return this.props.children({
      error: this.state.touched ? this.state.error : null,
      onBlur: this.handleBlur,
      onChange: this.handleChange,
      valid: !this.state.touched || !this.state.error,
      value: this.props.value,
    });
  }
}
