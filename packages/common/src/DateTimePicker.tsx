const DateTimePickerComponent = require('react-datetime');
import * as React from 'react';

import moment, {Moment} from './helpers/moment';
import TextInput from '@pinecast/common/TextInput';

import './DateTimePicker.css';

export default class DateTimePicker extends React.Component {
  props: {
    hasInput?: boolean;
    isValidDate?: (date: Date) => boolean;
    onChange: (newDate: Date) => void;
    style?: React.CSSProperties;
    value: Date | null;
  };
  state: {
    invalidState: string | false;
  } = {invalidState: false};

  static defaultProps = {
    hasInput: true,
  };

  renderInput = ({onChange, onFocus, onKeyDown, value}: any) => {
    return (
      <TextInput
        nativeEvents={{
          onChange,
          onFocus,
          onKeyDown,
        }}
        style={{
          marginBottom: 8,
        }}
        value={value}
      />
    );
  };

  handleChange = (val: string | Moment) => {
    if (typeof val === 'string') {
      this.setState({invalidState: val});
      return;
    }
    this.setState({invalidState: false}, () => {
      this.props.onChange(val.toDate());
    });
  };

  isValidDate = (date: Moment) => {
    if (this.props.isValidDate) {
      return this.props.isValidDate(date.toDate());
    }
    return true;
  };

  render() {
    const {invalidState} = this.state;
    return (
      <div className="DateTimePicker-wrapper" style={this.props.style}>
        <DateTimePickerComponent
          input={this.props.hasInput}
          inputProps={{
            className: 'form-control input',
            style: {
              border: '2px solid #222',
              borderColor: invalidState ? '#EF6B6B' : null,
            },
          }}
          isValidDate={this.isValidDate}
          onChange={this.handleChange}
          open
          renderInput={this.renderInput}
          value={invalidState || moment(this.props.value || new Date())}
        />
      </div>
    );
  }
}
