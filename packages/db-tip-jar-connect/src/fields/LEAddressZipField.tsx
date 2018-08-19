import * as React from 'react';

import {gettext} from '@pinecast/i18n';
import TextInput from '@pinecast/common/TextInput';

import Input, {required} from './Input';

export default class LEAddressZipField extends React.Component {
  props: {
    country: string;
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
            placeholder={
              this.props.country === 'us'
                ? gettext('Zip Code')
                : gettext('Post Code')
            }
            required={true}
            style={{width: 250}}
            value={value}
          />
        )}
      </Input>
    );
  }
}
