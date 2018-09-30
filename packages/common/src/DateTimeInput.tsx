import * as React from 'react';

import styled from '@pinecast/styles';

import Card from './Card';
import {CloseableLayer} from './Layer';
import DateTimePicker from './DateTimePicker';
import moment from './helpers/moment';
import Positioner from './Positioner';
import TextInput from './TextInput';

const FloatWrapper = styled(
  'menu',
  ({
    'aria-hidden': ariaHidden,
    $xAlign,
    $yAlign,
  }: {
    'aria-hidden': boolean;
    $xAlign: 'left' | 'right';
    $yAlign: 'top' | 'bottom';
  }) => ({
    margin: 0,
    minWidth: 200,
    opacity: ariaHidden ? 0 : 1,
    padding: '4px 0',
    pointerEvents: ariaHidden ? 'none' : 'all',
    transform: ariaHidden ? 'scale(0.9)' : 'scale(1)',
    transformOrigin: `${$xAlign === 'left' ? '20%' : '80%'} ${
      $yAlign === 'top' ? 'bottom' : 'top'
    }`,
    transition: 'opacity 0.2s, transform 0.2s',
    zIndex: 11,
  }),
);

export default class DateTimeInput extends React.Component {
  props: {
    disabled?: boolean;
    invalid?: boolean;
    onChange: (newDate: Date) => void;
    style?: React.CSSProperties;
    value: Date;
  };
  state: {open: boolean} = {open: false};

  wrapper: HTMLElement | null = null;

  componentDidMount() {
    document.body.addEventListener('click', this.handleOutsideClick);
  }
  componentWillUnmount() {
    document.body.removeEventListener('click', this.handleOutsideClick);
  }

  handleOutsideClick = (e: MouseEvent) => {
    if (!this.state.open) {
      return;
    }
    if (this.wrapper && e.target && this.wrapper.contains(e.target as Node)) {
      return;
    }
    this.setState({open: false});
  };

  handleRef = (el: HTMLElement | null) => {
    this.wrapper = el;
    if (el) {
      this.forceUpdate();
    }
  };

  renderPickerInner() {
    return (
      <Card style={{display: 'inline-block', width: 300}} whiteBack>
        <DateTimePicker
          hasInput={false}
          onChange={this.props.onChange}
          style={{marginTop: 0, width: 'auto'}}
          value={this.props.value}
        />
      </Card>
    );
  }

  handleClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    this.setState({open: true});
  };
  handleOpen = () => {
    this.setState({open: true});
  };

  renderInput() {
    return (
      <TextInput
        nativeEvents={{onClick: this.handleClick, onFocus: this.handleOpen}}
        disabled={this.props.disabled}
        invalid={this.props.invalid}
        readOnly
        style={{width: 200, ...this.props.style}}
        value={moment(this.props.value).format('MMM D, YYYY, h:mm A')}
      />
    );
  }

  handleClose = () => {
    this.setState({open: false});
  };

  render() {
    const {open} = this.state;
    return (
      <Positioner content={this.renderInput()} maxHeight={350} maxWidth={300}>
        {({x, xAlign, y, yAlign}) => (
          <CloseableLayer
            onClose={this.handleClose}
            pointerEvents={open}
            x={x}
            y={y}
          >
            <div
              ref={this.handleRef}
              style={{
                left: 0,
                position: 'absolute',
              }}
            >
              <FloatWrapper
                aria-hidden={!open}
                $xAlign={xAlign}
                $yAlign={yAlign}
              >
                {this.renderPickerInner()}
              </FloatWrapper>
            </div>
          </CloseableLayer>
        )}
      </Positioner>
    );
  }
}
