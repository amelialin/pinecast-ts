import * as React from 'react';
import ResizeObserver from 'resize-observer-polyfill';

import styled from '@pinecast/styles';

import Card from './Card';
import {Info} from './icons';
import Layer from './Layer';
import Positioner, {XAlign, YAlign} from './Positioner';

type Size = 'normal' | 'large';

const maxWidths = {
  normal: 300,
  large: 500,
};

const TooltipWrapper = styled(
  'aside',
  ({
    $active,
    $size,
    $xAlign,
    $yAlign,
  }: {
    $active: boolean | undefined;
    $size: Size;
    $xAlign: 'left' | 'right';
    $yAlign: 'top' | 'bottom';
  }) => ({
    color: '#fff',
    display: 'inline-flex',
    maxWidth: maxWidths[$size],
    opacity: $active ? 1 : 0,
    position: 'relative',
    transform: $active ? 'scale(1)' : 'scale(0.9)',
    transformOrigin: `${$xAlign} ${$yAlign === 'top' ? 'bottom' : 'top'}`,
    transition: 'opacity 0.2s, transform 0.2s',
    zIndex: 3,

    [$yAlign === 'bottom' ? 'paddingTop' : 'paddingBottom']: 8,

    '::after': {
      border: '0 solid rgba(0, 0, 0, 0.8)',
      content: '""',
      display: 'block',
      position: 'absolute',
      zIndex: 2,

      [$xAlign === 'left' ? 'left' : 'right']: 0,
      [$yAlign === 'bottom' ? 'top' : 'bottom']: 2,
      [$yAlign === 'bottom'
        ? 'borderBottom'
        : 'borderTop']: '6px solid rgba(0, 0, 0, 0.8)',
      [$xAlign === 'left'
        ? 'borderRight'
        : 'borderLeft']: '12px solid transparent',
    },
  }),
);

export default class TooltipContainer extends React.Component {
  props: {
    active?: boolean;
    children?: React.ReactNode;
    positionerStyle?: React.CSSProperties;
    preferX?: XAlign;
    preferY?: YAlign;
    size?: Size;
    style?: React.CSSProperties;
    tooltipContent: React.ReactNode;
    xOffset?: number;
  };
  state: {height: number; hovering: boolean} = {height: 0, hovering: false};
  refInner: HTMLElement | null = null;
  ro: ResizeObserver | null = null;

  static defaultProps = {
    active: true,
    size: 'normal',
  };

  componentWillUnmount() {
    if (this.ro) {
      this.ro.disconnect();
    }
  }

  handleEnter = () => {
    this.setState({hovering: true});
  };
  handleLeave = () => {
    this.setState({hovering: false});
  };

  handleInnerRef = (el: HTMLElement | null) => {
    this.refInner = el;
    if (el) {
      this.setState({height: el.clientHeight});
      this.ro = new ResizeObserver(() => {
        if (this.refInner) {
          this.setState({height: this.refInner.clientHeight});
        }
      });
      this.ro.observe(el);
    } else if (this.ro) {
      this.ro.disconnect();
      this.ro = null;
    }
  };

  positionerInner = ({
    x,
    xAlign,
    y,
    yAlign,
  }: {
    x: number;
    xAlign: XAlign;
    y: number;
    yAlign: YAlign;
  }) => (
    <Layer pointerEvents={false} x={x} y={y}>
      <div
        style={{
          display: 'flex',
          justifyContent: xAlign === 'left' ? 'flex-start' : 'flex-end',
          width: maxWidths[this.props.size || 'normal'],
        }}
        ref={this.handleInnerRef}
      >
        <TooltipWrapper
          $active={this.state.hovering && this.props.active}
          $size={this.props.size || 'normal'}
          $xAlign={xAlign}
          $yAlign={yAlign}
        >
          <Card
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              borderRadius: 3,
              marginBottom: 0,
              padding: '4px 8px',
              zIndex: 2,
              [`border${yAlign === 'bottom' ? 'Top' : 'Bottom'}${
                xAlign === 'left' ? 'Left' : 'Right'
              }Radius`]: 0,
            }}
          >
            {this.props.tooltipContent}
          </Card>
        </TooltipWrapper>
      </div>
    </Layer>
  );

  render() {
    const {
      active,
      positionerStyle,
      preferX,
      preferY,
      style,
      xOffset,
    } = this.props;
    return (
      <span
        className="TooltipContainer--wrapper"
        onMouseEnter={this.handleEnter}
        onMouseLeave={this.handleLeave}
        style={{display: 'inline-flex', ...style}}
      >
        <Positioner
          active={active}
          content={<React.Fragment>{this.props.children}</React.Fragment>}
          maxHeight={this.state.height}
          maxWidth={maxWidths[this.props.size || 'normal']}
          preferX={preferX}
          preferY={preferY}
          stateKey={this.state.hovering}
          style={positionerStyle}
          xOffset={xOffset}
        >
          {this.positionerInner}
        </Positioner>
      </span>
    );
  }
}

export const HelpIcon = (props: {
  children: React.ReactNode;
  size?: Size;
  style?: React.CSSProperties;
}): JSX.Element => (
  <TooltipContainer
    size={props.size}
    style={props.style}
    tooltipContent={props.children}
    xOffset={12}
  >
    <Info color="#4e7287" />
  </TooltipContainer>
);
