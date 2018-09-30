import * as React from 'react';

import Card from '@pinecast/common/Card';
import DateTimePicker from '@pinecast/common/DateTimePicker';
import Label from '@pinecast/common/Label';
import Radio from '@pinecast/common/Radio';

export default class PublishPicker extends React.Component {
  static selector = '.publish-picker';

  static propExtraction = {
    defaultValue: (e: HTMLElement) => e.getAttribute('data-default-value'),
    label: (e: HTMLElement) => e.getAttribute('data-label'),
    labelDescription: (e: HTMLElement) =>
      e.getAttribute('data-label-description'),
    labelNow: (e: HTMLElement) => e.getAttribute('data-label-now'),
    labelDateTime: (e: HTMLElement) => e.getAttribute('data-label-datetime'),
  };

  props: {
    defaultValue: string;
    label: string;
    labelDescription: string;
    labelNow: string;
    labelDateTime: string;
  };
  state: {
    option: 'datetime' | 'now';
    selection: Date | null;
  };

  constructor(props: PublishPicker['props']) {
    super(props);

    this.state = {
      option: props.defaultValue ? 'datetime' : 'now',
      selection: props.defaultValue ? new Date(props.defaultValue) : null,
    };
  }

  handleSelectionChange = (newSelection: Date) => {
    this.setState({selection: newSelection});
  };

  render() {
    const {
      props: {label, labelDescription, labelNow, labelDateTime},
      state: {option, selection},
    } = this;

    return (
      <Card whiteBack>
        <Label
          style={{marginBottom: 0}}
          subText={labelDescription}
          text={label}
        >
          <Radio
            checked={option === 'now'}
            onChange={checked => {
              if (!checked) {
                return;
              }
              this.setState({option: 'now', selection: null});
            }}
            text={labelNow}
          />
          <Radio
            checked={option === 'datetime'}
            onChange={checked => {
              if (!checked) {
                return;
              }
              this.setState({option: 'datetime', selection: new Date()});
            }}
            style={{paddingBottom: 0}}
            text={labelDateTime}
          />
        </Label>
        {option === 'datetime' && (
          <div className="publish-picker-datetime">
            <DateTimePicker
              onChange={this.handleSelectionChange}
              value={selection}
            />
          </div>
        )}
        <input
          type="hidden"
          name="publish"
          value={(selection || new Date()).toISOString()}
        />
      </Card>
    );
  }
}
