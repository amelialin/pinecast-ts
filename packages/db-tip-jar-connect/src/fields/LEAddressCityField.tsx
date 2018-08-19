import * as React from 'react';

import {gettext} from '@pinecast/i18n';
import TextInput from '@pinecast/common/TextInput';

import Input, {required} from './Input';

export default class LEAddressCityField extends React.Component {
  props: {
    onChange: (value: string) => void;
    value: string;
  };
  render() {
    return (
      <Input
        onChange={this.props.onChange}
        validation={required}
        value={this.props.value}
      >
        {({onBlur, onChange, valid, value}) => (
          <TextInput
            invalid={!valid}
            nativeEvents={{onBlur}}
            onChange={onChange}
            placeholder={gettext('City')}
            required={true}
            style={{marginBottom: 8, width: 250}}
            value={value}
          />
        )}
      </Input>
    );
  }
}
