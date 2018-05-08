import * as React from 'react';

import styled, {CSS} from '@pinecast/styles';

import {Children} from './types';
import {CloseableLayer} from './Layer';
import {DEFAULT_FONT} from './constants';
import Positioner from './Positioner';

const MenuWrapper = styled(
  'menu',
  ({
    'aria-hidden': ariaHidden,
    $xAlign,
    $yAlign,
  }: {
    'aria-hidden': boolean;
    $xAlign: 'left' | 'right';
    $yAlign: 'top' | 'bottom';
  }) => ({
    background: '#fff',
    borderRadius: 2,
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.15), 0 5px 15px rgba(0, 0, 0, 0.125)',
    display: 'flex',
    flexDirection: 'column',
    margin: 0,
    minWidth: 200,
    opacity: ariaHidden ? 0 : 1,
    padding: '4px 0',
    pointerEvents: ariaHidden ? 'none' : 'auto',
    transform: ariaHidden ? 'scale(0.9)' : 'scale(1)',
    transformOrigin: `${$xAlign === 'left' ? '20%' : '80%'} ${$yAlign}`,
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
    children: Children;
    options: Array<MenuOption>;
    open: boolean;
    onSelect: (slug: string) => void;
    onClose: () => void;
    toSelect?: string;
    xOffset?: number;
  };
  state: {selectionIndex: number} = {selectionIndex: 0};

  wrapper: HTMLElement | null = null;

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
    document.body.addEventListener('click', this.handleOutsideClick);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
    document.body.removeEventListener('click', this.handleOutsideClick);
  }

  componentDidUpdate(prevProps: ContextMenu['props']) {
    if (!prevProps.open && this.props.open) {
      const found = this.props.options.findIndex(
        x => x.slug === this.props.toSelect,
      );
      this.setState({
        selectionIndex: found === -1 ? 0 : found,
      });
    }
  }

  handleRef = (el: HTMLElement | null) => {
    this.wrapper = el;
    if (el) {
      this.forceUpdate();
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

  handleOutsideClick = () => {
    if (!this.props.open) {
      return;
    }
    this.props.onClose();
  };

  renderOption = ({name, slug}: MenuOption, i: number) => {
    return (
      <MenuOptionRow
        aria-selected={this.state.selectionIndex === i}
        key={slug}
        onClick={e => {
          e.preventDefault();
          e.stopPropagation();
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
    const {children, onClose, open, options, xOffset} = this.props;
    return (
      <Positioner
        content={<React.Fragment>{children}</React.Fragment>}
        maxHeight={this.wrapper ? this.wrapper.clientHeight : 0}
        maxWidth={this.wrapper ? this.wrapper.clientWidth : 0}
        xOffset={xOffset}
        yOffset={8}
      >
        {({x, xAlign, y, yAlign}) => (
          <CloseableLayer onClose={onClose} pointerEvents={open} x={x} y={y}>
            <div
              ref={this.handleRef}
              style={{
                left: 0,
                pointerEvents: 'none',
                position: 'absolute',
                top: yAlign === 'top' ? 0 : -16,
              }}
            >
              <MenuWrapper
                aria-hidden={!open}
                $xAlign={xAlign}
                $yAlign={yAlign}
              >
                {options.map(this.renderOption)}
              </MenuWrapper>
            </div>
          </CloseableLayer>
        )}
      </Positioner>
    );
  }
}
