import * as React from 'react';

import {gettext} from '@pinecast/i18n';
import TextInput from '@pinecast/common/TextInput';

import Input, {required} from './Input';

export default class LESSNLastFourField extends React.Component {
  props: {
    onChange: (value: string) => void;
    style?: React.CSSProperties;
    value: string;
  };
  render() {
    return (
      <Input
        onChange={this.props.onChange}
        validation={required}
        value={this.props.value}
      >
        {({onBlur, onChange, valid}) => (
          <TextInput
            invalid={!valid}
            nativeEvents={{onBlur}}
            onChange={onChange}
            placeholder={gettext('First name')}
            style={{width: 200, ...this.props.style}}
            value={this.props.value}
          />
        )}
      </Input>
    );
  }
}
