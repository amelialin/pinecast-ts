import {Moment} from 'moment';
const DateTimePicker = require('react-datetime');
import * as React from 'react';

import {gettext} from '@pinecast/i18n';

import './date-range-picker.css';

class ValidDatePicker extends React.Component {
  props: {
    className?: string;
    isValidDate: (date: Moment) => boolean;
    onChange: (newDate: Moment) => void;
    value: Moment;
  };
  state: {invalidState: string | null} = {invalidState: null};

  handleDateChange = (val: string | Moment) => {
    if (typeof val === 'string') {
      this.setState({invalidState: val});
      return;
    }
    this.setState({invalidState: null});
    this.props.onChange(val.startOf('day'));
  };

  render() {
    const {
      props,
      state: {invalidState},
    } = this;
    return (
      <DateTimePicker
        {...props}
        className={`drp-vdp ${props.className || ''}`}
        onChange={this.handleDateChange}
        timeFormat={false}
        value={invalidState || props.value}
      />
    );
  }
}

export default class DateRangePicker extends React.Component {
  props: {
    endDate: Moment;
    isOutsideRange: (date: Moment) => boolean;
    onDatesChanged: (dates: {startDate: Moment; endDate: Moment}) => void;
    startDate: Moment;
  };

  _start: ValidDatePicker | null = null;
  _end: ValidDatePicker | null = null;

  handleChange = (dateName: 'startDate' | 'endDate', value: Moment) => {
    const endDate = this.props.endDate.clone().startOf('day');
    if (
      dateName === 'startDate' &&
      value
        .clone()
        .startOf('day')
        .isSameOrAfter(endDate)
    ) {
      value = endDate.clone().add(-1, 'days');
    }
    this.props.onDatesChanged({
      startDate: this.props.startDate,
      endDate: this.props.endDate,
      [dateName]: value,
    });
  };

  handleStartDateRef = (el: ValidDatePicker | null) => {
    this._start = el;
  };
  isValidStartDate = (date: Moment) =>
    !this.props.isOutsideRange(date) &&
    date.isBefore(this.props.endDate.clone().startOf('day'));
  handleStartDateChange = (val: Moment) => {
    this.handleChange('startDate', val.startOf('day'));
  };

  handleEndDateRef = (el: ValidDatePicker | null) => {
    this._end = el;
  };
  isValidEndDate = (date: Moment) =>
    !this.props.isOutsideRange(date) && date.isAfter(this.props.startDate);
  handleEndDateChange = (val: Moment) => {
    this.handleChange('endDate', val.endOf('day'));
  };

  render() {
    const {endDate, startDate} = this.props;
    return (
      <div className="date-range-picker">
        <div className="drp-wrapper">
          <span>{gettext('From')}</span>
          <ValidDatePicker
            isValidDate={this.isValidStartDate}
            onChange={this.handleStartDateChange}
            ref={this.handleStartDateRef}
            value={startDate}
          />
        </div>
        <div className="drp-wrapper">
          <span>{gettext('To')}</span>
          <ValidDatePicker
            className="right-on-mobile"
            isValidDate={this.isValidEndDate}
            onChange={this.handleEndDateChange}
            ref={this.handleEndDateRef}
            value={endDate}
          />
        </div>
      </div>
    );
  }
}
