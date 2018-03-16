import * as React from 'react';

import styled from '@pinecast/sb-styles';

import {ClosableLayer} from './Layer';
import {DEFAULT_FONT} from './constants';

const MenuWrapper = styled(
  'menu',
  ({
    'aria-hidden': ariaHidden,
    $x,
    $y,
  }: {
    'aria-hidden': boolean;
    $x: number;
    $y: number;
  }) => ({
    background: '#fff',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.15), 0 5px 15px rgba(0, 0, 0, 0.125)',
    display: 'flex',
    flexDirection: 'column',
    left: $x,
    minWidth: 200,
    opacity: ariaHidden ? 0 : 1,
    padding: '4px 0',
    pointerEvents: ariaHidden ? 'none' : null,
    position: 'absolute',
    top: $y,
    transform: ariaHidden ? 'scale(0.9)' : 'scale(1)',
    transformOrigin: '20% top',
    transition: 'opacity 0.2s, transform 0.2s',
    zIndex: 11,
  }),
);

const MenuOptionRow = styled(
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

export type MenuOption = {
  name: string;
  slug: string;
};

export default class ContextMenu extends React.Component {
  props: {
    options: Array<MenuOption>;
    open: boolean;
    onSelect: (slug: string) => void;
    onClose: () => void;
    toSelect?: string;
    x: number;
    y: number;
  };
  state: {selectionIndex: number} = {selectionIndex: 0};

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
    document.body.addEventListener('click', this.handleOutsideClick);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
    document.body.removeEventListener('click', this.handleOutsideClick);
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.open && this.props.open) {
      const found = this.props.options.findIndex(
        x => x.slug === this.props.toSelect,
      );
      this.setState({
        selectionIndex: found === -1 ? 0 : found,
      });
    }
  }

  handleKeyDown = (e: KeyboardEvent) => {
    if (!this.props.open) {
      return;
    }
    if (e.keyCode === 27) {
      // ESC
      return;
    }
    e.preventDefault();
    e.stopPropagation();

    if (e.keyCode === 38) {
      // up arrow
      const index = this.state.selectionIndex - 1;
      this.setState({
        selectionIndex: index < 0 ? this.props.options.length - 1 : index,
      });
    } else if (e.keyCode === 40) {
      // down arrow
      const index = this.state.selectionIndex + 1;
      this.setState({
        selectionIndex: index === this.props.options.length ? 0 : index,
      });
    } else if (e.keyCode === 13) {
      // enter
      this.props.onSelect(this.props.options[this.state.selectionIndex].slug);
      this.setState({open: false});
    }
  };

  handleOutsideClick = (e: MouseEvent) => {
    if (!this.props.open) {
      return;
    }
    this.props.onClose();
  };

  // startEl: HTMLDivElement | null = null;
  // endEl: HTMLDivElement | null = null;

  // handleStartRef = (el: HTMLDivElement | null) => {
  //   this.startEl = el;
  // };
  // handleEndRef = (el: HTMLDivElement | null) => {
  //   this.endEl = el;
  // };
  // handleStartFocus = () => {
  //   if (this.endEl && this.endEl.previousSibling) {
  //     (this.endEl.previousSibling as HTMLElement).focus();
  //   }
  // };
  // handleEndFocus = () => {
  //   if (this.startEl && this.startEl.previousSibling) {
  //     (this.startEl.nextSibling as HTMLElement).focus();
  //   }
  // };

  renderOption = ({name, slug}: MenuOption, i: number) => {
    return (
      <MenuOptionRow
        aria-selected={this.state.selectionIndex === i}
        key={slug}
        onClick={e => {
          e.preventDefault();
          this.props.onSelect(slug);
          this.props.onClose();
        }}
        onMouseEnter={() => {
          this.setState({selectionIndex: i});
        }}
        tabIndex={this.props.open ? 0 : -1}
      >
        {name}
      </MenuOptionRow>
    );
  };

  render() {
    const {onClose, open, options, x, y} = this.props;
    return (
      <ClosableLayer onClose={onClose}>
        <MenuWrapper aria-hidden={!open} $x={x} $y={y}>
          {/*<div onFocus={this.handleStartFocus} ref={this.handleStartRef} />*/}
          {options.map(this.renderOption)}
          {/*<div onFocus={this.handleEndFocus} ref={this.handleEndRef} />*/}
        </MenuWrapper>
      </ClosableLayer>
    );
  }
}
