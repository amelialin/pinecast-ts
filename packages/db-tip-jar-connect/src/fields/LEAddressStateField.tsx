import * as React from 'react';

import {gettext} from '@pinecast/i18n';
import TextInput from '@pinecast/common/TextInput';

import Input, {compose, minLength, maxLength, required} from './Input';

export default class LEAddressStateField extends React.Component {
  props: {
    country: string;
    onChange: (value: string) => void;
    value: string;
  };
  getLabel() {
    switch (this.props.country) {
      case 'AU':
        return gettext('Territory');
      case 'CA':
        return gettext('Province');
      case 'US':
        return gettext('State');
      default:
        return gettext('State/Province');
    }
  }
  isRequired() {
    switch (this.props.country) {
      case 'AU':
      case 'CA':
      case 'US':
        return true;
      default:
        return false;
    }
  }
  render() {
    return (
      <Input
        onChange={this.props.onChange}
        validation={compose(
          this.isRequired() && required,
          minLength(2),
          maxLength(3),
        )}
        value={this.props.value}
      >
        {({onBlur, onChange, valid, value}) => (
          <TextInput
            invalid={!valid}
            maxLength={3}
            nativeEvents={{onBlur}}
            onChange={onChange}
            pattern="[a-zA-Z][a-zA-Z][a-zA-Z]?"
            placeholder={this.getLabel()}
            required={true}
            style={{marginBottom: 8, width: 250}}
            value={value}
          />
        )}
      </Input>
    );
  }
}
