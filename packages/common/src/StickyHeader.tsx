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

const headerWrapperStyle: React.CSSProperties = {
  height: '100%',
  overflowY: 'auto',
  position: 'relative',
};

export class Wrapper extends React.Component {
  props: {
    children: any;
    header: JSX.Element;
    headerHeight?: number;
    keyScrollOn?: any;
  };
  state: {scrolled: boolean} = {scrolled: false};

  ref_: HTMLDivElement | null = null;

  static defaultProps = {
    headerHeight: 60,
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.keyScrollOn !== this.props.keyScrollOn && this.ref_) {
      this.ref_.scrollTop = 0;
      this.setState({scrolled: 0});
    }
  }

  handleRef = (el: HTMLDivElement) => {
    this.ref_ = el;
    if (el) {
      el.addEventListener('scroll', e => {
        const scrolled = Boolean(el.scrollTop);
        if (scrolled === Boolean(this.state.scrolled)) {
          return;
        }
        if (!scrolled) {
          this.setState({scrolled: false});
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
      });
    }
  };

  render() {
    return (
      <div
        ref={this.handleRef}
        style={{
          ...headerWrapperStyle,
          paddingTop: (this.props.headerHeight || 0) + 20,
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
