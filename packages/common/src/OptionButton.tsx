import * as React from 'react';

import styled, {CSS} from '@pinecast/styles';

import {DEFAULT_FONT} from './constants';

const DULL_FOCUS_COLOR = '#d8e9f1';
const BRIGHT_FOCUS_COLOR = '#d8e9f1';

const BORDER = 'inset 0 0 0 0.5px rgba(0, 0, 0, 0.2)';
const NO_BORDER = 'inset 0 0 0 0 rgba(0, 0, 0, 0.2)';

const SELECTED_SHADOW =
  '0 2px 6px rgba(0, 0, 0, 0.075), 0 3px 12px rgba(0, 0, 0, 0.1)';
const BRIGHT_SELECTED_SHADOW =
  '0 2px 6px rgba(141, 82, 209, 0.25), 0 3px 16px rgba(141, 82, 209, 0.3)';
const UNSELECTED_SHADOW =
  '0 0 0 rgba(0, 0, 0, 0.075), 0 0 0 rgba(0, 0, 0, 0.1)';

const NativeButton = styled(
  'button',
  ({$bright, $selected}: {$bright: boolean; $selected: boolean}) => {
    const focusColor = $bright ? BRIGHT_FOCUS_COLOR : DULL_FOCUS_COLOR;
    const unselectedBorder = $bright ? BORDER : NO_BORDER;
    const selectedShadow = $bright ? BRIGHT_SELECTED_SHADOW : SELECTED_SHADOW;
    return {
      backgroundColor: '#fff',
      border: 0,
      borderRadius: 4,
      boxShadow: $selected
        ? `${selectedShadow}, ${BORDER}, 0 0 0 0 ${focusColor}`
        : `${UNSELECTED_SHADOW}, ${unselectedBorder}, 0 0 0 0 ${focusColor}`,
      color: $selected ? '#32586e' : '#000',
      cursor: 'pointer',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: DEFAULT_FONT,
      fontSize: 16,
      fontWeight: 400,
      padding: '8px 12px',
      position: 'relative',
      textAlign: 'left',
      transition: 'box-shadow 0.2s, color 0.2s, opacity 0.2s',
      userSelect: 'none',

      ':hover:not(:focus):not(:active)': {
        textShadow: $selected ? undefined : '0 2px 2px rgba(0, 0, 0, 0.15)',
      },
      ':focus': {
        boxShadow: $selected
          ? `${selectedShadow}, ${BORDER}, 0 0 0 3px ${focusColor}`
          : `${UNSELECTED_SHADOW}, ${unselectedBorder}, 0 0 0 3px ${focusColor}`,
        outline: 'none',
      },
    };
  },
  {className: 'Button-nativeButton'},
);

export default class OptionButton extends React.PureComponent {
  props: {
    bright?: boolean;
    children: React.ReactNode;
    className?: string;
    onClick: () => void;
    selected: boolean;
    style?: CSS;
    tabIndex?: number;
    title?: string;
  };

  handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    this.props.onClick();
  };

  render() {
    const {
      bright,
      children,
      className,
      selected,
      style,
      tabIndex,
      title,
    } = this.props;

    return (
      <NativeButton
        $bright={bright || false}
        $selected={selected}
        className={className}
        onClick={this.handleClick}
        style={style}
        tabIndex={tabIndex}
        title={title}
      >
        {children}
      </NativeButton>
    );
  }
}
