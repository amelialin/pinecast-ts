const DateTimePicker = require('react-datetime');
import {Moment} from 'moment';
const moment = require('moment');
import * as React from 'react';

import Card from '@pinecast/common/Card';
import Label from '@pinecast/common/Label';
import {nullThrows} from '@pinecast/common/helpers';
import Radio from '@pinecast/common/Radio';
import TextInput from '@pinecast/common/TextInput';

import './dateTimePicker.css';

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
    invalidState: boolean;
  };

  constructor(props: PublishPicker['props']) {
    super(props);

    this.state = {
      option: props.defaultValue ? 'datetime' : 'now',
      selection: props.defaultValue ? new Date(props.defaultValue) : null,

      invalidState: false,
    };
  }

  getSelectionTime() {
    const selection = nullThrows(this.state.selection);
    return (
      String('0' + (selection.getHours() % 12 || 12)).substr(-2) +
      ':' +
      ('0' + selection.getMinutes()).substr(-2) +
      ' ' +
      (selection.getHours() < 12 ? 'AM' : 'PM')
    );
  }

  renderInput = ({onChange, onFocus, onKeyDown, value}: any) => {
    return (
      <TextInput
        nativeEvents={{
          onChange,
          onFocus,
          onKeyDown,
        }}
        value={value}
      />
    );
  };

  render() {
    const {
      props: {label, labelDescription, labelNow, labelDateTime},
      state: {invalidState, option, selection},
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
              inputProps={{
                className: 'form-control input',
                style: {
                  border: '2px solid #222',
                  borderColor: invalidState ? '#b00' : null,
                },
              }}
              onChange={(val: string | Moment) => {
                if (typeof val === 'string') {
                  this.setState({invalidState: val});
                  return;
                }
                this.setState({invalidState: false, selection: val.toDate()});
              }}
              open
              renderInput={this.renderInput}
              value={invalidState || moment(selection)}
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
