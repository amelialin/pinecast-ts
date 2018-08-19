import * as React from 'react';

import styled, {CSS} from '@pinecast/styles';

import {Children} from './types';
import {DEFAULT_FONT} from './constants';

const NativeButton = styled(
  'button',
  ({$selected}: {$selected: boolean}) => ({
    backgroundColor: '#fff',
    border: 0,
    borderRadius: 4,
    boxShadow: $selected
      ? '0 2px 6px rgba(0, 0, 0, 0.075), 0 3px 12px rgba(0, 0, 0, 0.1), 0 0 0 0.5px rgba(0, 0, 0, 0.2), 0 0 0 0 #d8e9f1'
      : '0 0 0 rgba(0, 0, 0, 0.075), 0 0 0 rgba(0, 0, 0, 0.1), inset 0 0 0 0 rgba(0, 0, 0, 0.2), 0 0 0 #d8e9f1',
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
    // ':active': {
    //   boxShadow:
    //     '0 1px 0 rgba(0, 0, 0, 0.1), 0 1px 1px rgba(0, 0, 0, 0.15), 0 0 0 0.5px #c6caca, 0 0 0 transparent inset',
    // },

    ':focus': {
      boxShadow: $selected
        ? '0 2px 6px rgba(0, 0, 0, 0.075), 0 3px 12px rgba(0, 0, 0, 0.1), 0 0 0 0.5px #8aa3b1, 0 0 0 3px #d8e9f1'
        : '0 0 0 rgba(0, 0, 0, 0.075), 0 0 0 rgba(0, 0, 0, 0.1), inset 0 0 0 0.5px rgba(0, 0, 0, 0.2), 0 0 0 3px #d8e9f1',
      outline: 'none',
    },
    // ':hover:focus': {
    //   boxShadow:
    //     '0 1px 3px rgba(0, 0, 0, 0.15), 0 3px 5px rgba(0, 0, 0, 0.1), 0 0 0 0.5px #8aa3b1, rgba(167, 210, 243, 0.75) 0 0 0 2px inset',
    //   outline: 'none',
    // },
    // ':active:focus': {
    //   boxShadow:
    //     '0 1px 0 rgba(0, 0, 0, 0.1), 0 1px 1px rgba(0, 0, 0, 0.15), 0 0 0 0.5px #8aa3b1, rgba(167, 210, 243, 0.75) 0 0 0 2px inset',
    // },
  }),
  {className: 'Button-nativeButton'},
);

export default class OptionButton extends React.PureComponent {
  props: {
    children: Children;
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
    const {children, className, selected, style, tabIndex, title} = this.props;

    return (
      <NativeButton
        className={className}
        onClick={this.handleClick}
        $selected={selected}
        style={style}
        tabIndex={tabIndex}
        title={title}
      >
        {children}
      </NativeButton>
    );
  }
}
