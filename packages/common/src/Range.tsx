import * as React from 'react';

import styled from '@pinecast/styles';

import './Range.css';

const Wrapper = styled('div', ({$hasLabels}: {$hasLabels: boolean}) => ({
  display: ['flex', 'grid'],
  gridTemplateColumns: $hasLabels
    ? 'max-content 1fr max-content'
    : '1fr max-content',
  margin: '15px 0 30px',
  width: '100%',
}));
const MaxLabel = styled('span', {marginLeft: 12});
const MinLabel = styled('span', {marginRight: 12});

function debounce(handler: () => void, timeout: number = 200): (() => void) {
  let timer: any | null = null;
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
  props:
    | {
        max: number;
        min: number;
        onChange: (value: number) => void;
        value: number;
      }
    | {
        max: number;
        maxLabel: string;
        min: number;
        minLabel: string;
        onChange: (value: number) => void;
        value: number;
      };

  onChangeDebouncer: () => void;
  range: HTMLInputElement | null = null;

  constructor(props: Range['props']) {
    super(props);
    this.onChangeDebouncer = debounce(() => {
      if (!this.range) {
        return;
      }
      const val = Number(this.range.value);
      if (this.props.value === val) {
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

  componentWillReceiveProps(newProps: Range['props']) {
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
    const {max, min} = this.props;
    let minLabel = null;
    let maxLabel = null;
    if ('minLabel' in this.props) {
      minLabel = this.props.minLabel;
    }
    if ('maxLabel' in this.props) {
      maxLabel = this.props.maxLabel;
    }
    return (
      <Wrapper $hasLabels={Boolean(maxLabel && minLabel)}>
        {minLabel ? <MinLabel>{minLabel}</MinLabel> : null}
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
        {maxLabel ? <MaxLabel>{maxLabel}</MaxLabel> : null}
      </Wrapper>
    );
  }
}
