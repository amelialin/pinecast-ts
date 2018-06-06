import * as React from 'react';

import {debounce, shallowCompare} from './helpers';

export type XAlign = 'left' | 'right';
export type YAlign = 'top' | 'bottom';

export default class Positioner extends React.Component {
  props: {
    active?: boolean;
    children: (
      p: {x: number; xAlign: XAlign; y: number; yAlign: YAlign},
    ) => JSX.Element;
    content?: JSX.Element;
    maxWidth: number;
    maxHeight: number;
    preferX?: XAlign;
    preferY?: YAlign;
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

  static defaultProps = {
    active: true,
    prefer: 'left',
  };

  componentWillReceiveProps(newProps: Positioner['props']) {
    if (
      (newProps.preferX !== this.props.preferX ||
        newProps.preferY !== this.props.preferY ||
        newProps.xOffset !== this.props.xOffset ||
        newProps.maxWidth !== this.props.maxWidth ||
        newProps.maxHeight !== this.props.maxHeight) &&
      newProps.active
    ) {
      this.reposition();
    }
  }

  shouldComponentUpdate(
    nextProps: Positioner['props'],
    nextState: Positioner['state'],
  ) {
    // We only update when we're active and
    if (shallowCompare(this.state, nextState) && nextProps.active) {
      return true;
    }
    return this.props.children !== nextProps.children;
  }

  scrollElementCache = new WeakSet<HTMLElement>();
  handleScroll = (e: Event) => {
    if (!this.ref || !this.props.active) {
      return;
    }
    if (this.scrollElementCache.has(e.target as HTMLElement)) {
      this.reposition();
      return;
    }
    if (!e.target || !(e.target as HTMLElement).contains(this.ref)) {
      return;
    }
    this.scrollElementCache.add(e.target as HTMLElement);
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

  reposition = debounce(() => {
    if (!this.ref) {
      return;
    }

    const {height, left, top, width} = this.ref.getClientRects()[0];
    const {
      maxHeight,
      maxWidth,
      preferX = 'left',
      preferY = 'bottom',
    } = this.props;

    const screenHeight = document.body.clientHeight;
    const screenWidth = document.body.clientWidth;

    const baseXOffset = this.props.xOffset || 0;
    const baseYOffset = this.props.yOffset || 0;

    const speculativeLeftXOffset = left + baseXOffset;
    const speculativeRightXOffset = left + width - maxWidth - baseXOffset;

    const leftIsValid = speculativeLeftXOffset + maxWidth < screenWidth;
    const rightIsValid = speculativeRightXOffset > 0;

    let x: number;
    let xAlign: XAlign;

    if (leftIsValid && preferX === 'left') {
      x = speculativeLeftXOffset;
      xAlign = 'left';
    } else if (rightIsValid && preferX === 'right') {
      x = speculativeRightXOffset;
      xAlign = 'right';
    } else if (leftIsValid) {
      x = speculativeLeftXOffset;
      xAlign = 'left';
    } else if (rightIsValid) {
      x = speculativeRightXOffset;
      xAlign = 'right';
    } else {
      x = speculativeLeftXOffset;
      xAlign = 'left';
    }

    const speculativeTopYOffset =
      window.scrollY + top - maxHeight - baseYOffset;
    const speculativeBottomYOffset =
      window.scrollY + top + height + baseYOffset;

    const bottomIsValid =
      speculativeBottomYOffset - window.scrollY + maxHeight < screenHeight;
    const topIsValid = speculativeTopYOffset > 0;

    let y: number;
    let yAlign: YAlign;

    if (bottomIsValid && preferY === 'bottom') {
      y = speculativeBottomYOffset;
      yAlign = 'bottom';
    } else if (topIsValid && preferY === 'top') {
      y = speculativeTopYOffset;
      yAlign = 'top';
    } else if (bottomIsValid) {
      y = speculativeBottomYOffset;
      yAlign = 'bottom';
    } else if (topIsValid) {
      y = speculativeTopYOffset;
      yAlign = 'top';
    } else {
      y = speculativeBottomYOffset;
      yAlign = 'bottom';
    }

    const state = this.state;
    if (
      x === state.x &&
      y === state.y &&
      xAlign === state.xAlign &&
      yAlign === state.yAlign
    ) {
      return;
    }
    this.setState({x, xAlign, y, yAlign});
  }, 12);

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
