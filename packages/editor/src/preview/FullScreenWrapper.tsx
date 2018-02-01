import * as React from 'react';

import styled from '@pinecast/sb-styles';

const Div = styled('div');

const TRANSITION = 'left 0.25s, top 0.25s';

export default class FullScreenWrapper extends React.PureComponent {
  outerElem: HTMLElement | null;
  innerElem: HTMLElement | null;
  props: {
    children: any;
    fullScreen: boolean;
  };
  state: {
    left: number;
    position: 'absolute' | 'fixed';
    top: number;
    transition: string | null;
  } = {
    left: 0,
    position: 'absolute',
    top: 0,
    transition: null,
  };

  componentWillReceiveProps(nextProps) {
    const [left, top] = this.getPosition();
    if (nextProps.fullScreen && !this.props.fullScreen) {
      this.setState(
        {
          position: 'fixed',
          left,
          top,
          transition: null,
        },
        () => {
          setTimeout(() => {
            this.setState({left: 0, top: 0, transition: TRANSITION});
          }, 100);
        },
      );
    } else if (!nextProps.fullScreen && this.props.fullScreen) {
      this.setState(
        {
          position: 'absolute',
          left: `-${left}px`,
          top: `-${top}px`,
          transition: null,
        },
        () => {
          setTimeout(() => {
            this.setState({left: 0, top: 0, transition: TRANSITION});
          }, 100);
        },
      );
    }
  }

  getPosition() {
    if (!this.outerElem) {
      return [0, 0];
    }
    const rect = this.outerElem.getClientRects()[0];
    return [rect.left, rect.top];
  }

  handleOuterRef = (el: HTMLElement | null) => {
    this.outerElem = el;
  };
  handleInnerRef = (el: HTMLElement | null) => {
    this.innerElem = el;
  };

  render() {
    return (
      <div
        ref={this.handleOuterRef}
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          zIndex: 10,
        }}
      >
        <div
          ref={this.handleInnerRef}
          style={{
            alignItems: 'center',
            backgroundColor: '#fafafa',
            boxShadow: 'inset 0 35px 30px rgba(0, 20, 50, 0.15)',
            display: 'flex',
            boxSizing: 'content-box',
            justifyContent: 'center',
            overflow: 'hidden',
            paddingTop: 40,
            right: 0,
            bottom: 0,
            ...this.state,
          }}
        >
          {this.props.children}
        </div>
      </div>
    );
  }
}
