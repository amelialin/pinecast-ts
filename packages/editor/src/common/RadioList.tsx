import * as React from 'react';

import styled from '@pinecast/sb-styles';

const Option = styled('label', {
  display: 'block',
  marginBottom: 15,
  paddingLeft: 50,
  position: 'relative',
});
const Radio = styled(
  'div',
  {
    alignItems: 'center',
    border: '1px solid #ddd',
    borderRadius: 30,
    display: 'flex',
    height: 30,
    justifyContent: 'center',
    left: 10,
    position: 'absolute',
    top: 0,
    width: 30,
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
      background: 'transparent',
      borderRadius: 15,
      content: '""',
      display: 'block',
      height: 0,
      transition: 'background-color 0.2s',
      width: 0,
    },
    ':checked + .radioList-item:after': {
      background: '#8d52d1',
      borderRadius: 15,
      content: '""',
      display: 'block',
      height: 14,
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
    return (
      <React.Fragment>
        {Object.entries(
          this.props.options,
        ).map(
          (
            [key, Value]: [
              string,
              React.StatelessComponent | JSX.Element | string
            ],
          ) => (
            <Option key={key}>
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
