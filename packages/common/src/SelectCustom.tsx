import * as React from 'react';

import ContextMenu from '@pinecast/common/ContextMenu';
import styled from '@pinecast/styles';

import {DEFAULT_FONT} from './constants';

const Wrapper = styled('div', {
  alignItems: 'center',
  background: '#fff',
  borderRadius: 3,
  display: 'flex',
  fontSize: 14,
  height: 30,
  opacity: 1,
  position: 'relative',
  transition: 'box-shadow 0.2s, opacity 0.2s',

  ':before': {
    border: '2px solid #222',
    borderLeft: 0,
    borderTop: 0,
    content: '""',
    display: 'block',
    height: 6,
    position: 'absolute',
    right: 10,
    transform: 'translateY(-2px) rotate(45deg)',
    width: 6,
  },
});
const SelectButton = styled('button', {
  appearance: 'none',
  MozAppearance: 'none',
  WebkitAppearance: 'none',
  background: 'transparent',
  border: 0,
  boxShadow:
    '0 1px 2px rgba(0, 0, 0, 0.1), 0 3px 4px rgba(0, 0, 0, 0.025), inset 0 0 0 0.5px #c6caca, rgba(167, 210, 243, 0.0) 0 0 0 0 inset',
  borderRadius: 3,
  fontFamily: DEFAULT_FONT,
  fontSize: 14,
  fontWeight: 400,
  height: '100%',
  lineHeight: '100%',
  margin: 0,
  padding: '0 25px 0 10px',
  textAlign: 'left',
  transition: 'box-shadow 0.2s, opacity 0.2s',
  whiteSpace: 'nowrap',
  width: '100%',

  ':hover': {
    boxShadow:
      '0 1px 3px rgba(0, 0, 0, 0.15), 0 3px 5px rgba(0, 0, 0, 0.1), inset 0 0 0 0.5px #c6caca, rgba(167, 210, 243, 0.0) 0 0 0 0 inset',
  },
  ':active': {
    boxShadow:
      '0 1px 0 rgba(0, 0, 0, 0.1), 0 1px 1px rgba(0, 0, 0, 0.15), inset 0 0 0 0.5px #c6caca, rgba(167, 210, 243, 0.0) 0 0 0 0 inset',
  },
  ':disabled': {
    opacity: 0.5,
  },

  ':focus': {
    boxShadow:
      '0 1px 2px rgba(0, 0, 0, 0.1), 0 3px 4px rgba(0, 0, 0, 0.025), inset 0 0 0 0.5px #9eb4c0, rgba(167, 210, 243, 0.75) 0 0 0 2px inset',
    outline: 'none',
  },
  ':focus:hover': {
    boxShadow:
      '0 1px 3px rgba(0, 0, 0, 0.15), 0 3px 5px rgba(0, 0, 0, 0.1), inset 0 0 0 0.5px #9eb4c0, rgba(167, 210, 243, 0.75) 0 0 0 2px inset',
  },
  ':focus:active': {
    boxShadow:
      '0 1px 0 rgba(0, 0, 0, 0.1), 0 1px 1px rgba(0, 0, 0, 0.15), inset 0 0 0 0.5px #9eb4c0, rgba(167, 210, 243, 0.75) 0 0 0 2px inset',
  },
});

export type Option = {
  key: string | number;
  render: () => JSX.Element | string;
};

export default class SelectCustom extends React.Component {
  props: {
    autoFocus?: boolean;
    disabled?: boolean;
    onChange: (newValue: string | number) => void;
    options: Array<Option>;
    style?: React.CSSProperties;
    tabIndex?: number;
    value: string | number;
  };
  state: {open: boolean} = {open: false};

  handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    this.setState({open: true});
  };
  handleClose = () => {
    this.setState({open: false});
  };

  render() {
    const {autoFocus, disabled, options, style, tabIndex, value} = this.props;
    const selected = options.find(x => x.key === value);
    if (!selected) {
      throw new Error(`${value} not found in SelectCustom`);
    }
    return (
      <ContextMenu
        onClose={this.handleClose}
        onSelect={this.props.onChange}
        open={this.state.open}
        options={options.map(option => ({
          name: option.render(),
          slug: option.key,
        }))}
        toSelect={selected.key}
        wrapperStyle={style}
      >
        <Wrapper>
          <SelectButton
            autoFocus={autoFocus}
            disabled={disabled}
            onClick={this.handleClick}
            tabIndex={tabIndex}
          >
            {selected.render()}
          </SelectButton>
        </Wrapper>
      </ContextMenu>
    );
  }
}
