import * as React from 'react';

type XAlign = 'left' | 'right';
type YAlign = 'top' | 'bottom';

export default class Positioner extends React.Component {
  props: {
    children: (
      p: {x: number; xAlign: XAlign; y: number; yAlign: YAlign},
    ) => JSX.Element;
    content?: JSX.Element;
    maxWidth: number;
    maxHeight: number;
    style?: React.CSSProperties;
    xOffset?: number;
    yOffset?: number;
  };
  state: {
    x: number;
    xAlign: XAlign;
    y: number;
    yAlign: YAlign;
  } = {x: 0, xAlign: 'left', y: 0, yAlign: 'top'};
  ref: HTMLDivElement | null = null;

  componentWillReceiveProps(newProps: Positioner['props']) {
    if (
      newProps.xOffset !== this.props.xOffset ||
      newProps.maxWidth !== this.props.maxWidth ||
      newProps.maxHeight !== this.props.maxHeight
    ) {
      this.reposition();
    }
  }

  handleScroll = (e: Event) => {
    if (!this.ref) {
      return;
    }
    const end = e.target;
    let cursor: HTMLElement = this.ref;
    while (cursor !== document.body) {
      if (cursor === end) {
        break;
      }
      cursor = cursor.parentNode as HTMLElement;
    }
    if (cursor === document.body) {
      return;
    }
    this.reposition();
  };
  handleResize = () => this.reposition();

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
    window.addEventListener('scroll', this.handleScroll, {
      capture: true,
      passive: true,
    });
  }
  componentDidUpdate() {
    this.reposition();
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
    window.removeEventListener('scroll', this.handleScroll);
  }

  reposition() {
    if (!this.ref) {
      return;
    }
    const {height, left, top, width} = this.ref.getClientRects()[0];
    const {maxHeight, maxWidth} = this.props;

    const baseXOffset = this.props.xOffset || 0;
    const baseYOffset = this.props.yOffset || 0;
    const xOffset =
      (left + maxWidth > document.body.clientWidth ? width - maxWidth : 0) +
      baseXOffset;
    const yOffset =
      (top + maxHeight + height > document.body.clientHeight
        ? -maxHeight
        : height) + baseYOffset;

    const state = {
      x: left + xOffset,
      xAlign: xOffset === baseXOffset ? 'left' : 'right',
      y: top + yOffset,
      yAlign: yOffset === height + baseYOffset ? 'top' : 'bottom',
    };
    if (
      state.x === this.state.x &&
      state.y === this.state.y &&
      state.xAlign === this.state.xAlign &&
      state.yAlign === this.state.yAlign
    ) {
      return;
    }
    this.setState(state);
  }

  handleRef = (el: HTMLDivElement | null) => {
    this.ref = el;
    if (el) {
      this.reposition();
    }
  };

  render() {
    return (
      <React.Fragment>
        <span
          ref={this.handleRef}
          style={{display: 'inline-flex', ...this.props.style}}
        >
          {this.props.content}
        </span>
        {this.props.children(this.state)}
      </React.Fragment>
    );
  }
}
