import * as React from 'react';

import * as dateHelpers from '@pinecast/common/helpers/dates';
import DateTimeInput from '@pinecast/common/DateTimeInput';
import {defineMessages, FormattedMessage} from '@pinecast/i18n';
import Group from '@pinecast/common/Group';
import Label from '@pinecast/common/Label';

const messages = defineMessages({
  to: {
    id: 'db-analytics.DateRangePicker.to',
    description: 'Label for "to" field when selecting a date range',
    defaultMessage: 'To',
  },
  from: {
    id: 'db-analytics.DateRangePicker.from',
    description: 'Label for "from" field when selecting a date range',
    defaultMessage: 'From',
  },
});

export default class DateRangePicker extends React.Component {
  props: {
    endDate: Date;
    isOutsideRange: (date: Date) => boolean;
    onDatesChanged: (dates: {startDate: Date; endDate: Date}) => void;
    startDate: Date;
  };

  handleChange(dateName: 'startDate' | 'endDate', value: Date) {
    const endDate = dateHelpers.startOfDay(this.props.endDate);
    if (dateName === 'startDate' && dateHelpers.startOfDay(value) >= endDate) {
      value = dateHelpers.addDays(endDate, -1);
    }
    this.props.onDatesChanged({
      startDate: this.props.startDate,
      endDate: this.props.endDate,
      [dateName]: value,
    });
  }

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
        <Label
          $oneLine
          $oneLineCollapse
          text={<FormattedMessage {...messages.from} />}
        >
          <DateTimeInput
            includeTime={false}
            isValidDate={this.isValidStartDate}
            onChange={this.handleStartDateChange}
            style={{width: 150}}
            value={startDate}
          />
        </Label>
        <Label
          $oneLine
          $oneLineCollapse
          text={<FormattedMessage {...messages.to} />}
        >
          <DateTimeInput
            includeTime={false}
            isValidDate={this.isValidEndDate}
            onChange={this.handleEndDateChange}
            style={{width: 150}}
            value={endDate}
          />
        </Label>
      </Group>
    );
  }
}
