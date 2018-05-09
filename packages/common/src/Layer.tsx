import * as React from 'react';
import * as ReactDOM from 'react-dom';

type Props = {
  children: JSX.Element | Array<JSX.Element>;
  pointerEvents?: boolean;
  x?: number;
  y?: number;
};

export default class Layer extends React.PureComponent {
  props: Props;
  portal: HTMLDivElement;

  static defaultProps = {
    pointerEvents: true,
  };

  constructor(props: Props) {
    super(props);
    const portal = document.createElement('div');
    portal.style.pointerEvents = props.pointerEvents ? 'auto' : 'none';
    portal.style.position = 'absolute';
    portal.style.left = props.x ? `${props.x}px` : '0';
    portal.style.top = props.y ? `${props.y}px` : '0';
    portal.style.zIndex = '100';
    this.portal = portal;
    document.body.appendChild(portal);
  }
  componentWillReceiveProps(newProps: Props) {
    const updated = {
      pointerEvents: newProps.pointerEvents ? 'auto' : 'none',
      left: newProps.x ? `${newProps.x}px` : '0',
      top: newProps.y ? `${newProps.y}px` : '0',
    };
    const portalStyle = this.portal.style;
    if (
      updated.pointerEvents === portalStyle.pointerEvents &&
      updated.left === portalStyle.left &&
      updated.top === portalStyle.top
    ) {
      return;
    }

    Object.assign(portalStyle, updated);
  }
  componentWillUnmount() {
    document.body.removeChild(this.portal);
  }

  shouldComponentUpdate(newProps: Props) {
    return newProps.children !== this.props.children;
  }

  render() {
    return ReactDOM.createPortal(this.props.children, this.portal);
  }
}

export class CloseableLayer extends Layer {
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
