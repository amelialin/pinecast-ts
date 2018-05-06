import * as React from 'react';

import Label from '@pinecast/common/Label';
import NumberInput from '@pinecast/common/NumberInput';

class Wrapper extends React.Component {
  props: {
    children: (
      {onChange, value}: {onChange: (v: any) => void; value: any},
    ) => JSX.Element;
    defaultValue: any;
  };
  state: {value: any};
  constructor(props: Wrapper['props']) {
    super(props);
    this.state = {
      value: props.defaultValue,
    };
  }
  handleChange = (value: any) => {
    this.setState({value});
  };
  render() {
    return this.props.children({
      onChange: this.handleChange,
      value: this.state.value,
    });
  }
}

export default {
  name: 'Number input',
  examples: [
    {
      title: 'Basic use',
      render: () => (
        <Label text="Numeric input field">
          <Wrapper defaultValue={0}>
            {({onChange, value}) => (
              <NumberInput onChange={onChange} value={value} />
            )}
          </Wrapper>
        </Label>
      ),
    },
    {
      title: 'Disallow negative',
      render: () => (
        <Label text="Numeric input field">
          <Wrapper defaultValue={0}>
            {({onChange, value}) => (
              <NumberInput
                canBeNegative={false}
                onChange={onChange}
                value={value}
              />
            )}
          </Wrapper>
        </Label>
      ),
    },
    {
      title: 'Floating point',
      render: () => (
        <Label text="Numeric input field (precision of 2)">
          <Wrapper defaultValue={0}>
            {({onChange, value}) => (
              <NumberInput
                onChange={onChange}
                upToPrecision={2}
                value={value}
              />
            )}
          </Wrapper>
        </Label>
      ),
    },
  ],
};
