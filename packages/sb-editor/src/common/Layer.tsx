import * as React from 'react';
import * as ReactDOM from 'react-dom';

type Props = {
  children: JSX.Element | Array<JSX.Element>;
};

export default class Layer extends React.PureComponent {
  props: Props;
  portal: HTMLDivElement;

  constructor(props) {
    super(props);
    const portal = document.createElement('div');
    this.portal = portal;
    document.body.appendChild(portal);
  }
  componentWillUnmount() {
    document.body.removeChild(this.portal);
  }

  render() {
    return ReactDOM.createPortal(this.props.children, this.portal);
  }
}

export class ClosableLayer extends Layer {
  props: {onClose: () => void} & Props;

  escListener = (e: KeyboardEvent) => {
    if (e.keyCode !== 27) {
      // ESC
      return;
    }
    this.props.onClose();
  };

  componentDidMount() {
    window.addEventListener('keyup', this.escListener);
  }
  componentWillUnmount() {
    window.removeEventListener('keyup', this.escListener);
  }
}