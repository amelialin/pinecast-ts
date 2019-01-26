import * as React from 'react';

import styled from '@pinecast/styles';

type ScrolledFlag = {top: number; right: number; left: number} | false;

export const Header = styled(
  'div',
  ({
    $headerHeight,
    $scrolled,
  }: {
    $headerHeight: number;
    $scrolled?: ScrolledFlag;
  }) => ({
    alignItems: 'center',
    backgroundColor: '#fff',
    display: 'flex',
    height: $headerHeight,
    left: $scrolled ? $scrolled.left : 0,
    justifyContent: 'space-between',
    padding: '0 16px',
    position: $scrolled ? 'fixed' : 'absolute',
    right: $scrolled ? $scrolled.right : 0,
    top: $scrolled ? $scrolled.top : 0,
    zIndex: 3,

    '::after': {
      backgroundImage:
        'linear-gradient(to bottom, rgba(0, 0, 0, 0.15), transparent)',
      content: '""',
      display: 'block',
      height: 4,
      left: 0,
      opacity: $scrolled ? 1 : 0,
      pointerEvents: 'none',
      position: 'absolute',
      right: 0,
      top: '100%',
      transition: 'opacity 0.2s',
    },
  }),
);

export class Wrapper extends React.Component {
  props: {
    children: any;
    header: JSX.Element;
    headerHeight?: number;
    keyScrollOn?: any;
  };
  state: {scrolled: boolean} = {scrolled: false};

  ref = React.createRef<HTMLDivElement>();

  static defaultProps = {
    headerHeight: 60,
  };

  componentWillReceiveProps(nextProps: Wrapper['props']) {
    if (nextProps.keyScrollOn !== this.props.keyScrollOn && this.ref.current) {
      this.ref.current.scrollTo(0, 0);
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll, {
      capture: true,
      passive: true,
    } as EventListenerOptions);
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll, {
      capture: true,
      passive: true,
    } as EventListenerOptions);
  }

  handleScroll = (e: Event) => {
    const el = this.ref.current;
    if (!el) {
      return;
    }
    if (e.target === el || (e.target as HTMLElement).contains(el)) {
      const scrolled = Boolean(el.scrollTop);
      if (!scrolled && this.state.scrolled) {
        this.setState({scrolled: false});
        return;
      }
      if (!scrolled && !this.state.scrolled) {
        return;
      }
      const rect = el.getBoundingClientRect();
      this.setState({
        scrolled: {
          top: rect.top,
          left: rect.left,
          right: document.body.clientWidth - rect.right,
        },
      });
    }
  };

  render() {
    return (
      <div
        ref={this.ref}
        style={{
          height: '100%',
          overflowY: 'auto',
          paddingTop: (this.props.headerHeight || 0) + 20,
          position: 'relative',
        }}
      >
        {React.cloneElement(this.props.header, {
          $headerHeight: this.props.headerHeight,
          $scrolled: this.state.scrolled,
        })}
        {this.props.children}
      </div>
    );
  }
}
