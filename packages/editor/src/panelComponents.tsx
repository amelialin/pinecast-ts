import * as React from 'react';

import styled from '@pinecast/sb-styles';

import ContextMenu from './common/ContextMenu';
import {DEFAULT_FONT} from './common/constants';

export const PanelWrapper = styled('section', {
  padding: 16,
});

const PageSelectorWrapper = styled('div', {
  position: 'relative',
});

export const PageHeading = styled('h1', {
  fontFamily: DEFAULT_FONT,
  fontSize: 30,
  fontWeight: 500,
  margin: 15,
});

const PageSelection = styled(
  'button',
  {
    WebkitAppearance: 'none',
    background: 'none',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 0 0 0 #c9d9e0',
    cursor: 'pointer',
    fontFamily: DEFAULT_FONT,
    fontSize: 30,
    fontWeight: 500,
    margin: '16px 0 16px -2px',
    padding: '0 24px 0 2px',
    textShadow: '0 0 0 transparent',
    transform: 'translateY(0)',
    transition: 'box-shadow 0.2s, transform 0.2s, text-shadow 0.2s',

    ':hover': {
      textShadow: '0 3px 0 rgba(0, 0, 0, 0.1)',
      transform: 'translateY(-1px)',
    },
    ':active': {
      textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)',
      transform: 'translateY(0.5px)',
    },

    ':before': {
      border: '2px solid #222',
      borderLeft: 0,
      borderTop: 0,
      content: '""',
      display: 'block',
      height: 12,
      position: 'absolute',
      right: 4,
      top: 0,
      transform: 'scaleY(0.9) translateY(12px) rotate(45deg)',
      width: 12,
      zIndex: 3,
    },
    ':after': {
      border: '2px solid transparent',
      borderLeft: 0,
      borderTop: 0,
      content: '""',
      display: 'block',
      height: 12,
      position: 'absolute',
      right: 4,
      top: 0,
      transform: 'scaleY(0.9) translateY(12px) rotate(45deg)',
      transition: 'border-color 0.2s, transform 0.2s',
      width: 12,
      zIndex: 2,
    },
    ':hover:after': {
      borderColor: 'rgba(0, 0, 0, 0.2)',
      transform: 'scaleY(0.9) translateY(15px) rotate(45deg)',
    },
    ':active:after': {
      transform: 'scaleY(0.9) translateY(14px) rotate(45deg)',
    },

    ':focus': {
      boxShadow: '0 0 0 3px #c9d9e0',
      outline: 'none',
    },
  },
  {
    'aria-haspopup': 'listbox',
  },
);
const PageSelectorInner = styled(
  'div',
  ({'aria-hidden': hidden}: {'aria-hidden': boolean}) => ({
    background: '#fff',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.15), 0 5px 15px rgba(0, 0, 0, 0.125)',
    display: 'flex',
    flexDirection: 'column',
    left: 0,
    minWidth: 200,
    opacity: hidden ? 0 : 1,
    padding: '4px 0',
    pointerEvents: hidden ? 'none' : null,
    position: 'absolute',
    top: '100%',
    transform: hidden ? 'scale(0.9)' : 'scale(1)',
    transformOrigin: '20% top',
    transition: 'opacity 0.2s, transform 0.2s',
    zIndex: 11,
  }),
  {role: 'listbox', tabIndex: -1},
);
const PageSelectorOption = styled(
  'button',
  ({'aria-selected': selected}: {'aria-selected': boolean}) => ({
    WebkitAppearance: 'none',
    background: selected ? '#eee' : 'none',
    border: 0,
    borderRadius: 2,
    cursor: 'pointer',
    fontFamily: DEFAULT_FONT,
    fontSize: 16,
    margin: '0 4px',
    padding: 8,
    textAlign: 'left',
  }),
  {role: 'option'},
);

export class PageSelector extends React.PureComponent {
  _uniqueId: string = Math.random().toString();

  props: {
    onChange: (newKey: string) => void;
    options: Array<{name: string; value: string}>;
    selected: string;
  };
  state: {open: boolean} = {open: false};

  handleClose = () => {
    this.setState({open: false});
  };
  handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    this.setState({
      open: !this.state.open,
      selectionIndex: this.props.options.findIndex(
        x => x.value === this.props.selected,
      ),
    });
  };

  handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    this.props.onChange(e.target.value);
  };

  render() {
    const {onChange, options, selected} = this.props;
    const {open} = this.state;
    return (
      <PageSelectorWrapper className="pageSelector-root">
        <PageSelection onClick={this.handleClick}>
          {(options.find(x => x.value === selected) || {name: null}).name}
        </PageSelection>
        <ContextMenu
          onClose={this.handleClose}
          onSelect={onChange}
          open={open}
          options={options.map(x => ({name: x.name, slug: x.value}))}
          toSelect={selected}
          x={12}
          y={100}
        />
      </PageSelectorWrapper>
    );
  }
}

export const PanelDescription = styled('p', {
  fontFamily: DEFAULT_FONT,
  fontSize: 16,
  marginBottom: 30,
  marginTop: -10,
});

export const PanelSectionTitle = styled('h2', {
  fontFamily: DEFAULT_FONT,
  fontSize: 20,
  fontWeight: 500,
  marginBottom: 20,
  marginTop: 20,
});
export const PanelSectionDescription = styled(
  'p',
  {
    fontFamily: DEFAULT_FONT,
    fontSize: 14,
    fontWeight: 400,
    lineHeight: '20px',
    marginBottom: 20,
    marginTop: -8,
  },
  {className: 'panelSectionDescription'},
);

export const PanelDivider = styled('hr', {
  background: '#8d52d1',
  border: 0,
  height: 1,
  margin: '0 0 20px',
  width: '100%',
});
