import * as React from 'react';
import ResizeObserver from 'resize-observer-polyfill';

import styled from '@pinecast/styles';

import Card from './Card';
import {Children} from './types';
import {Info} from './icons';
import Layer from './Layer';
import Positioner from './Positioner';

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
    transformOrigin: `${$xAlign} ${$yAlign}`,
    transition: 'opacity 0.2s, transform 0.2s',
    zIndex: 3,

    [$yAlign === 'top' ? 'paddingTop' : 'paddingBottom']: 8,

    '::after': {
      border: '0 solid rgba(0, 0, 0, 0.8)',
      content: '""',
      display: 'block',
      position: 'absolute',
      zIndex: 2,

      [$xAlign === 'left' ? 'left' : 'right']: 0,
      [$yAlign === 'top' ? 'top' : 'bottom']: 2,
      [$yAlign === 'top'
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
    children?: Children;
    size?: Size;
    tooltipContent: Children;
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

  render() {
    const {size = 'normal', xOffset} = this.props;
    return (
      <span
        className="TooltipContainer--wrapper"
        onMouseEnter={this.handleEnter}
        onMouseLeave={this.handleLeave}
        style={{display: 'inline-flex'}}
      >
        <Positioner
          content={<React.Fragment>{this.props.children}</React.Fragment>}
          maxHeight={this.state.height}
          maxWidth={maxWidths[size]}
          xOffset={xOffset}
        >
          {({x, xAlign, y, yAlign}) => (
            <Layer pointerEvents={false} x={x} y={y}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: xAlign === 'left' ? 'flex-start' : 'flex-end',
                  width: maxWidths[size],
                }}
                ref={this.handleInnerRef}
              >
                <TooltipWrapper
                  $active={this.state.hovering && this.props.active}
                  $size={size}
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
                      [`border${yAlign === 'top' ? 'Top' : 'Bottom'}${
                        xAlign === 'left' ? 'Left' : 'Right'
                      }Radius`]: 0,
                    }}
                  >
                    {this.props.tooltipContent}
                  </Card>
                </TooltipWrapper>
              </div>
            </Layer>
          )}
        </Positioner>
      </span>
    );
  }
}

export const HelpIcon = (props: {
  size?: Size;
  children: Children;
}): JSX.Element => (
  <TooltipContainer
    size={props.size}
    tooltipContent={props.children}
    xOffset={12}
  >
    <Info color="#4e7287" />
  </TooltipContainer>
);
