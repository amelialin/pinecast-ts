import * as React from 'react';
import * as ReactDOM from 'react-dom';

type Props = {
  children: JSX.Element | Array<JSX.Element>;
  x?: number;
  y?: number;
};

export default class Layer extends React.PureComponent {
  props: Props;
  portal: HTMLDivElement;

  constructor(props) {
    super(props);
    const portal = document.createElement('div');
    portal.style.position = 'absolute';
    portal.style.left = props.x ? `${props.x}px` : '0';
    portal.style.top = props.y ? `${props.y}px` : '0';
    portal.style.zIndex = '10';
    this.portal = portal;
    document.body.appendChild(portal);
  }
  componentWillReceiveProps(newProps) {
    this.portal.style.left = newProps.x ? `${newProps.x}px` : '0';
    this.portal.style.top = newProps.y ? `${newProps.y}px` : '0';
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
