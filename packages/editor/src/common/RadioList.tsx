import * as React from 'react';

import styled from '@pinecast/sb-styles';

const Option = styled('label', {
  display: 'block',
  paddingLeft: 50,
  position: 'relative',
});
const Radio = styled(
  'div',
  {
    alignItems: 'center',
    borderRadius: 30,
    boxShadow:
      '0 1px 2px rgba(0, 0, 0, 0.15), 0 3px 4px rgba(0, 0, 0, 0.05), 0 0 0 0.5px rgba(0, 0, 0, .15)',
    display: 'flex',
    height: 30,
    justifyContent: 'center',
    left: 10,
    position: 'absolute',
    top: 0,
    transition: 'box-shadow 0.2s',
    width: 30,

    ':hover': {
      boxShadow:
        '0 1px 2px rgba(0, 0, 0, 0.15), 0 3px 5px rgba(0, 0, 0, 0.15), 0 0 0 0.5px rgba(0, 0, 0, .15)',
    },
    ':active': {
      boxShadow:
        '0 1px 0 rgba(0, 0, 0, 0.1), 0 1px 1px rgba(0, 0, 0, 0.15), 0 0 0 0.5px rgba(0, 0, 0, .15)',
    },
  },
  {className: 'radioList-item'},
);
const RadioInput = styled(
  'input',
  {
    height: 30,
    left: 10,
    opacity: 0,
    position: 'absolute',
    top: 0,
    width: 30,

    ':not(:checked) + .radioList-item:after': {
      backgroundColor: 'transparent',
      borderRadius: 15,
      content: '""',
      display: 'block',
      height: 0,
      transition: 'background-color 1.2s, height 1.2s, width 1.2s',
      width: 0,
    },
    ':checked + .radioList-item:after': {
      backgroundColor: '#8d52d1',
      borderRadius: 15,
      content: '""',
      display: 'block',
      height: 14,
      transition: 'background-color 1.2s, height 1.2s, width 1.2s',
      width: 14,
    },
  },
  {type: 'radio'},
);

export default class RadioList extends React.Component {
  props: {
    onChange: (value: string) => void;
    options: {
      [value: string]: React.StatelessComponent | JSX.Element | string;
    };
    value: string;
  };
  state: {
    selectedValue: string;
  };

  name: string;

  constructor(props) {
    super(props);
    this.state = {
      selectedValue: props.value || Object.keys(props.options)[0],
    };
    this.name = `radio${Math.random()}`;
  }

  componentWillReceiveProps(newProps) {
    if (newProps.value !== this.state.selectedValue) {
      this.setState({selectedValue: newProps.value});
    }
  }

  render() {
    const options = Object.entries(this.props.options);
    return (
      <React.Fragment>
        {options.map(
          (
            [key, Value]: [
              string,
              React.StatelessComponent | JSX.Element | string
            ],
            i: number,
          ) => (
            <Option
              key={key}
              style={{
                marginBottom: i === options.length - 1 ? 30 : 15,
              }}
            >
              <RadioInput
                checked={this.props.value === key}
                name={this.name}
                onChange={() => this.props.onChange(key)}
                value={key}
              />
              <Radio />
              {typeof Value === 'string' || React.isValidElement(Value)
                ? Value
                : React.createElement(Value as any)}
            </Option>
          ),
        )}
      </React.Fragment>
    );
  }
}
