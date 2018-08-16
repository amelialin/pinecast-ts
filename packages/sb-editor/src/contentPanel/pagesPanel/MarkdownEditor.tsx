import * as React from 'react';
import {ReactMdeTypes} from 'react-mde';

import LoadingState from '@pinecast/common/LoadingState';

import 'react-mde/lib/styles/css/react-mde-all.css';

export default class MarkdownEditor extends React.PureComponent {
  props: {
    onChange: (value: string) => void;
    value: string;
  };
  state: {
    rawValue: ReactMdeTypes.Value;
    serialValue: string;

    MarkdownInput: React.ComponentType<{
      onChange: (value: ReactMdeTypes.Value) => void;
      value: ReactMdeTypes.Value;
    }> | null;
  };

  constructor(props: MarkdownEditor['props']) {
    super(props);
    const {value} = props;
    this.state = {
      rawValue: {text: value},
      serialValue: value,

      MarkdownInput: null,
    };

    import(/* webpackChunkName: "markdownInput" */ './MarkdownInput').then(
      ({default: MarkdownInput}) => {
        this.setState({MarkdownInput});
      },
    );
  }

  componentWillReceiveProps(newProps: MarkdownEditor['props']) {
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
    const {MarkdownInput, rawValue} = this.state;
    if (!MarkdownInput) {
      return <LoadingState title="Loading markdown editor…" />;
    }
    return <MarkdownInput onChange={this.handleChange} value={rawValue} />;
  }
}
