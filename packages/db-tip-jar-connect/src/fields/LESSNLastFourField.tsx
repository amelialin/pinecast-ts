import * as React from 'react';

import {gettext} from '@pinecast/i18n';
import Label from '@pinecast/common/Label';
import TextInput from '@pinecast/common/TextInput';

import Input, {length} from './Input';

export default class LESSNLastFourField extends React.Component {
  props: {
    onChange: (value: string) => void;
    value: string;
  };
  render() {
    return (
      <Input
        onChange={this.props.onChange}
        validation={length(4)}
        value={this.props.value}
      >
        {({error, onBlur, onChange, valid}) => (
          <Label error={error} text={gettext('SSN last four')}>
            <TextInput
              invalid={!valid}
              maxLength={4}
              nativeEvents={{onBlur}}
              onChange={onChange}
              pattern="\d{4}"
              placeholder="••••"
              style={{width: 120}}
              value={this.props.value}
            />
          </Label>
        )}
      </Input>
    );
  }
}
