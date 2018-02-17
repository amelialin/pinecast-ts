import * as React from 'react';
import {ReactMdeTypes} from 'react-mde';

import MarkdownInput from './MarkdownInput';

import 'react-mde/lib/styles/css/react-mde-all.css';

export default class MarkdownEditor extends React.PureComponent {
  props: {
    onChange: (value: string) => void;
    value: string;
  };
  state: {
    rawValue: ReactMdeTypes.Value;
    serialValue: string;
  } = {
    rawValue: {text: ''},
    serialValue: '',
  };

  componentDidMount() {
    const {value} = this.props;
    this.setState({
      rawValue: {text: value},
      serialValue: value,
    });
  }

  componentWillReceiveProps(newProps) {
    if (newProps.value !== this.state.serialValue) {
      this.setState({
        rawValue: {text: newProps.value},
        serialValue: newProps.value,
      });
    }
  }

  handleChange = (newValue: ReactMdeTypes.Value) => {
    const serialValue = newValue.text;
    this.setState({rawValue: newValue, serialValue}, () =>
      this.props.onChange(serialValue),
    );
  };

  render() {
    return (
      <MarkdownInput onChange={this.handleChange} value={this.state.rawValue} />
    );
  }
}
