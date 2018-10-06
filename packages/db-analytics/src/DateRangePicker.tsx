import * as React from 'react';

import * as dateHelpers from '@pinecast/common/helpers/dates';
import DateTimeInput from '@pinecast/common/DateTimeInput';
import {gettext} from '@pinecast/i18n';
import Group from '@pinecast/common/Group';
import Label from '@pinecast/common/Label';

export default class DateRangePicker extends React.Component {
  props: {
    endDate: Date;
    isOutsideRange: (date: Date) => boolean;
    onDatesChanged: (dates: {startDate: Date; endDate: Date}) => void;
    startDate: Date;
  };

  handleChange = (dateName: 'startDate' | 'endDate', value: Date) => {
    const endDate = dateHelpers.startOfDay(this.props.endDate);
    if (dateName === 'startDate' && dateHelpers.startOfDay(value) >= endDate) {
      value = dateHelpers.addDays(endDate, -1);
    }
    this.props.onDatesChanged({
      startDate: this.props.startDate,
      endDate: this.props.endDate,
      [dateName]: value,
    });
  };

  isValidStartDate = (date: Date) =>
    !this.props.isOutsideRange(date) &&
    date < dateHelpers.startOfDay(this.props.endDate);
  handleStartDateChange = (val: Date) => {
    this.handleChange('startDate', dateHelpers.startOfDay(val));
  };

  isValidEndDate = (date: Date) =>
    !this.props.isOutsideRange(date) && date > this.props.startDate;
  handleEndDateChange = (val: Date) => {
    this.handleChange('endDate', dateHelpers.endOfDay(val));
  };

  render() {
    const {endDate, startDate} = this.props;
    return (
      <Group allowWrap spacing={16} style={{justifyContent: 'center'}}>
        <Label $oneLine $oneLineCollapse text={gettext('From')}>
          <DateTimeInput
            isValidDate={this.isValidStartDate}
            onChange={this.handleStartDateChange}
            value={startDate}
          />
        </Label>
        <Label $oneLine $oneLineCollapse text={gettext('To')}>
          <DateTimeInput
            isValidDate={this.isValidEndDate}
            onChange={this.handleEndDateChange}
            value={endDate}
          />
        </Label>
      </Group>
    );
  }
}
