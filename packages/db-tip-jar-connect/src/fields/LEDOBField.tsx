import * as React from 'react';

import {gettext} from '@pinecast/i18n';
import Group from '@pinecast/common/Group';
import Label from '@pinecast/common/Label';
import Select from '@pinecast/common/Select';
import TextInput from '@pinecast/common/TextInput';

import Input, {required} from './Input';

export default class LESSNLastFourField extends React.Component {
  props: {
    onChange: (date: {day: string; month: string; year: string}) => void;
    value: {day?: string; month?: string; year?: string};
  };

  handleChange = (day: string, month: string, year: string) => {
    this.props.onChange({day, month, year});
  };
  handleChangeDay = (day: string) => {
    this.handleChange(
      day,
      this.props.value.month || '',
      this.props.value.year || '',
    );
  };
  handleChangeMonth = (month: string) => {
    this.handleChange(
      this.props.value.day || '',
      month,
      this.props.value.year || '',
    );
  };
  handleChangeYear = (year: string) => {
    this.handleChange(
      this.props.value.day || '',
      this.props.value.month || '',
      year,
    );
  };

  render() {
    return (
      <Input
        onChange={this.handleChangeDay}
        validation={required}
        value={this.props.value.day || ''}
      >
        {day => (
          <Input
            onChange={this.handleChangeMonth}
            validation={required}
            value={this.props.value.month || ''}
          >
            {month => (
              <Input
                onChange={this.handleChangeYear}
                validation={required}
                value={this.props.value.year || ''}
              >
                {year => (
                  <Label error={day.error} text={gettext('Date of Birth')}>
                    <Group spacing={8}>
                      <TextInput
                        invalid={!day.valid}
                        maxLength={4}
                        nativeEvents={{onBlur: day.onBlur}}
                        onChange={day.onChange}
                        pattern="\d{2}"
                        placeholder="DD"
                        style={{width: 60}}
                        value={day.value}
                      />
                      <Select
                        invalid={!month.valid}
                        nativeEvents={{onBlur: month.onBlur}}
                        onChange={month.onChange}
                        options={[
                          {key: 1, label: gettext('January')},
                          {key: 2, label: gettext('February')},
                          {key: 3, label: gettext('March')},
                          {key: 4, label: gettext('April')},
                          {key: 5, label: gettext('May')},
                          {key: 6, label: gettext('June')},
                          {key: 7, label: gettext('July')},
                          {key: 8, label: gettext('August')},
                          {key: 9, label: gettext('September')},
                          {key: 10, label: gettext('October')},
                          {key: 11, label: gettext('November')},
                          {key: 12, label: gettext('December')},
                        ]}
                        style={{width: 120}}
                        value={month.value}
                      />
                      <TextInput
                        invalid={!year.valid}
                        maxLength={4}
                        nativeEvents={{onBlur: year.onBlur}}
                        onChange={year.onChange}
                        pattern="[12][90]\d\d"
                        placeholder="YYYY"
                        style={{width: 80}}
                        value={year.value}
                      />
                    </Group>
                  </Label>
                )}
              </Input>
            )}
          </Input>
        )}
      </Input>
    );
  }
}
