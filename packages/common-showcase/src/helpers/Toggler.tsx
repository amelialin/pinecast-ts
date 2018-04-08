import * as React from 'react';

export default class Toggler extends React.Component {
  props: {
    children: (
      prop: {open: boolean; toggle: (value?: boolean) => void},
    ) => JSX.Element;
  };
  state: {open: boolean} = {open: false};

  handleToggle = (value?: boolean) => {
    this.setState({open: value !== undefined ? value : !this.state.open});
  };

  render() {
    return this.props.children({
      open: this.state.open,
      toggle: this.handleToggle,
    });
  }
}
