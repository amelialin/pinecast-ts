import * as React from 'react';

import './Range.css';

function debounce(handler: () => void, timeout: number = 200): (() => void) {
  let timer;
  return () => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      handler();
      timer = null;
    }, timeout);
  };
}

export default class Range extends React.Component {
  props: {
    max: number;
    min: number;
    onChange: (value: number) => void;
    value: number;
  };

  onChangeDebouncer: () => void;
  range: HTMLInputElement | null = null;

  constructor(props) {
    super(props);
    this.onChangeDebouncer = debounce(() => {
      if (!this.range) {
        return;
      }
      const val = Number(this.range.value);
      if (props.value === val) {
        return;
      }
      props.onChange(val);
    });
  }

  componentDidMount() {
    if (!this.range) {
      return;
    }
    this.range.value = String(this.props.value);
  }

  componentWillReceiveProps(newProps) {
    if (!this.range) {
      return;
    }
    this.range.value = String(newProps.value);
  }

  handleInteraction = () => {
    if (!this.range) {
      return;
    }
    this.onChangeDebouncer();
  };
  handleMouseMove = (e: any) => {
    if ((e.buttons !== 1 && e.which !== 1) || !this.range) {
      return;
    }
    this.onChangeDebouncer();
  };
  handleRef = (el: HTMLInputElement | null) => {
    this.range = el;
  };

  noop = () => {};

  render() {
    const {max, min, onChange, value} = this.props;
    return (
      <input
        className="RangeInput"
        max={max}
        min={min}
        onClick={this.handleInteraction}
        onKeyDown={this.handleInteraction}
        onMouseMove={this.handleMouseMove}
        onChange={this.noop}
        ref={this.handleRef}
        type="range"
      />
    );
  }
}
