import * as React from 'react';

import styled from '@pinecast/styles';

import TextInput from './TextInput';

export type Unit = '%' | 'px';

const Row = styled('div', {
  alignItems: 'center',
  display: 'flex',
  justifyContent: 'center',
});
const Col = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
});
const WrapperLabel = styled('label', {
  alignItems: 'center',
  display: 'inline-flex',
});
const WrapperLabelText = styled('span', {
  flex: '1 1',
  marginRight: 8,
  textAlign: 'right',
});

const textInputStyles: React.CSSProperties = {
  height: 32,
  margin: 0,
  width: 80,
};
const textInputInputStyles: React.CSSProperties = {
  textAlign: 'center',
};

export type StructuredValue = {
  top: number;
  right: number;
  bottom: number;
  left: number;
};

export default class PaddingInput extends React.PureComponent {
  props: {
    disabled?: boolean;
    onChange: (value: StructuredValue) => void;
    tabIndex?: number;
    value: StructuredValue;
    unit?: Unit;
  };

  handleLeftChange = (left: string) => {
    this.props.onChange({
      ...this.props.value,
      left: Math.max(0, Math.floor(Number(left))),
    });
  };
  handleRightChange = (right: string) => {
    this.props.onChange({
      ...this.props.value,
      right: Math.max(0, Math.floor(Number(right))),
    });
  };
  handleBottomChange = (bottom: string) => {
    this.props.onChange({
      ...this.props.value,
      bottom: Math.max(0, Math.floor(Number(bottom))),
    });
  };
  handleTopChange = (top: string) => {
    this.props.onChange({
      ...this.props.value,
      top: Math.max(0, Math.floor(Number(top))),
    });
  };

  render() {
    const {
      disabled,
      tabIndex,
      unit,
      value: {top, right, bottom, left},
    } = this.props;

    return (
      <Row style={{marginBottom: 16}}>
        <WrapperLabel>
          <WrapperLabelText>Left</WrapperLabelText>
          <TextInput
            disabled={disabled}
            inputStyle={textInputInputStyles}
            onChange={this.handleLeftChange}
            style={textInputStyles}
            suffix={unit}
            tabIndex={tabIndex}
            value={left.toString()}
          />
        </WrapperLabel>
        <Col style={{margin: '0 12px'}}>
          <WrapperLabel style={{marginBottom: 8}}>
            <WrapperLabelText>Top</WrapperLabelText>
            <TextInput
              disabled={disabled}
              inputStyle={textInputInputStyles}
              onChange={this.handleTopChange}
              style={textInputStyles}
              suffix={unit}
              tabIndex={tabIndex}
              value={top.toString()}
            />
          </WrapperLabel>
          <WrapperLabel>
            <WrapperLabelText>Bottom</WrapperLabelText>
            <TextInput
              disabled={disabled}
              inputStyle={textInputInputStyles}
              onChange={this.handleBottomChange}
              style={textInputStyles}
              suffix={unit}
              tabIndex={tabIndex}
              value={bottom.toString()}
            />
          </WrapperLabel>
        </Col>
        <WrapperLabel>
          <WrapperLabelText>Right</WrapperLabelText>
          <TextInput
            disabled={disabled}
            inputStyle={textInputInputStyles}
            onChange={this.handleRightChange}
            style={textInputStyles}
            suffix={unit}
            tabIndex={tabIndex}
            value={right.toString()}
          />
        </WrapperLabel>
      </Row>
    );
  }
}

// Code to convert from a string to a structured value

function implicitConvert(
  top: string,
  right: string = top,
  bottom: string = top,
  left: string = right,
): [string, string, string, string] {
  return [top, right, bottom, left];
}
function ununit(united: string): number {
  if (united.endsWith('px')) {
    return Number(united.substr(0, united.length - 2));
  }
  if (united.endsWith('%')) {
    return Number(united.substr(0, united.length - 1));
  }
  return Number(united);
}
export function parsePadding(
  padding: string | null | undefined,
): StructuredValue {
  if (!padding) {
    return {top: 0, right: 0, bottom: 0, left: 0};
  }
  const [top, right, bottom, left] = (implicitConvert as Function)(
    ...padding.split(' '),
  );
  return {
    top: ununit(top),
    right: ununit(right),
    bottom: ununit(bottom),
    left: ununit(left),
  };
}

// Code to convert from a structured value to a string

function unitify(value: number, unit: Unit): string {
  return value ? `${value}${unit}` : '0';
}
export function formatPadding(
  {top, right, bottom, left}: StructuredValue,
  unit: Unit = 'px',
): string {
  if (top === bottom && right === left) {
    if (top === right) {
      return unitify(top, unit);
    }
    return `${unitify(top, unit)} ${unitify(right, unit)}`;
  }
  if (right === left) {
    return `${unitify(top, unit)} ${unitify(right, unit)} ${unitify(
      bottom,
      unit,
    )}`;
  }

  return `${unitify(top, unit)} ${unitify(right, unit)} ${unitify(
    bottom,
    unit,
  )} ${unitify(left, unit)}`;
}
