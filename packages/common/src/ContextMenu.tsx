import * as React from 'react';

import styled, {CSS} from '@pinecast/styles';

import {ClosableLayer} from './Layer';
import {DEFAULT_FONT} from './constants';

const SIZE_BUFFER = 32;

const wrapperStyle = {
  display: 'inline-flex',
};

const MenuWrapper = styled(
  'menu',
  ({
    'aria-hidden': ariaHidden,
    $alignX,
    $alignY,
    $height,
    $width,
  }: {
    'aria-hidden': boolean;
    $alignX: 'leftEdge' | 'rightEdge';
    $alignY: 'topEdge' | 'bottomEdge';
    $height: number;
    $width: number;
  }) => ({
    background: '#fff',
    borderRadius: 2,
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.15), 0 5px 15px rgba(0, 0, 0, 0.125)',
    display: 'flex',
    flexDirection: 'column',
    marginTop: $alignY === 'bottomEdge' ? -1 * $height : 0,
    marginLeft: $alignX === 'rightEdge' ? -1 * $width : 0,
    marginBottom: 0,
    minWidth: 200,
    opacity: ariaHidden ? 0 : 1,
    padding: '4px 0',
    pointerEvents: ariaHidden ? 'none' : 'auto',
    transform: ariaHidden ? 'scale(0.9)' : 'scale(1)',
    transformOrigin: '20% top',
    transition: 'opacity 0.2s, transform 0.2s',
    zIndex: 11,
  }),
);

const MenuOptionRow = styled(
  'button',
  ({'aria-selected': selected}: {'aria-selected': boolean}): CSS => ({
    WebkitAppearance: 'none',
    background: selected ? '#eeefea' : 'none',
    border: 0,
    borderRadius: 2,
    cursor: 'pointer',
    fontFamily: DEFAULT_FONT,
    fontSize: 14,
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

export default class ContextMenu extends React.PureComponent {
  props: {
    options: Array<MenuOption>;
    open: boolean;
    onSelect: (slug: string) => void;
    onClose: () => void;
    toSelect?: string;
    x: number;
    y: number;
  };
  state: {
    alignX: 'leftEdge' | 'rightEdge';
    alignY: 'topEdge' | 'bottomEdge';
    selectionIndex: number;
  } = {alignX: 'leftEdge', alignY: 'topEdge', selectionIndex: 0};

  wrapper: HTMLElement | null = null;

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
      this.reposition();
    }
  }

  handleRef = (el: HTMLElement | null) => {
    this.wrapper = el;
    if (el) {
      this.reposition();
    }
  };

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
      this.props.onClose();
    }
  };

  handleOutsideClick = (e: MouseEvent) => {
    if (!this.props.open) {
      return;
    }
    this.props.onClose();
  };

  reposition() {
    if (!this.wrapper) {
      return;
    }
    const {clientHeight: height, clientWidth: width} = this.wrapper;
    const {x, y} = this.props;

    this.setState({
      alignX:
        x + width >= document.body.clientWidth - SIZE_BUFFER
          ? 'rightEdge'
          : 'leftEdge',
      alignY:
        y + height >= document.body.clientHeight - SIZE_BUFFER
          ? 'bottomEdge'
          : 'topEdge',
    });
  }

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
    const {alignX, alignY} = this.state;
    return (
      <ClosableLayer onClose={onClose} pointerEvents={open} x={x} y={y}>
        <div ref={this.handleRef} style={{pointerEvents: 'none'}}>
          <MenuWrapper
            aria-hidden={!open}
            $alignX={alignX}
            $alignY={alignY}
            $height={this.wrapper ? this.wrapper.clientHeight : 0}
            $width={this.wrapper ? this.wrapper.clientWidth : 0}
          >
            {options.map(this.renderOption)}
          </MenuWrapper>
        </div>
      </ClosableLayer>
    );
  }
}
