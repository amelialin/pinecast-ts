import * as React from 'react';

import styled, {CSS} from '@pinecast/styles';
import {defineMessages, I18n} from '@pinecast/i18n';

import {CloseableLayer} from './Layer';
import {DEFAULT_FONT} from './constants';
import IconButton from './IconButton';
import * as MenuIcons from './icons/menus';
import Positioner from './Positioner';
import Toggler from './Toggler';

const messages = defineMessages({
  toggle: {
    id: 'common.ContextMenu.toggle',
    description: 'Label for toggling a menu button',
    defaultMessage: 'Toggle menu',
  },
});

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
    display: 'inline-flex',
    flexDirection: 'column',
    margin: 0,
    maxHeight: 300,
    minWidth: 200,
    opacity: ariaHidden ? 0 : 1,
    overflowY: 'auto',
    padding: '4px 0',
    pointerEvents: ariaHidden ? 'none' : 'auto',
    transform: ariaHidden ? 'scale(0.9)' : 'scale(1)',
    transformOrigin: `${$xAlign === 'left' ? '20%' : '80%'} ${
      $yAlign === 'top' ? 'bottom' : 'top'
    }`,
    transition: 'opacity 0.2s, transform 0.2s',
    zIndex: 11,
  }),
);

const MenuOptionRow = styled(
  'button',
  ({'aria-selected': selected}: {'aria-selected': boolean}): CSS => ({
    WebkitAppearance: 'none',
    background: selected ? '#d8e9f1' : 'none',
    border: 0,
    borderRadius: 2,
    cursor: 'pointer',
    flex: '0 0',
    fontFamily: DEFAULT_FONT,
    fontSize: 14,
    margin: '0 4px',
    padding: 8,
    textAlign: 'left',
    whiteSpace: 'nowrap',
  }),
  {role: 'option'},
);

export type MenuOption = {
  name: JSX.Element | string;
  slug: string | number;
};

export default class ContextMenu extends React.PureComponent {
  props: {
    children: React.ReactNode;
    options: Array<MenuOption | null | false>;
    open: boolean;
    onSelect: (slug: string | number) => void;
    onClose: () => void;
    toSelect?: string | number;
    wrapperStyle?: React.CSSProperties;
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
        x => !!x && x.slug === this.props.toSelect,
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
      const item = this.props.options[this.state.selectionIndex];
      if (!item) {
        return;
      }
      this.props.onSelect(item.slug);
      this.props.onClose();
    }
  };

  handleOutsideClick = () => {
    if (!this.props.open) {
      return;
    }
    this.props.onClose();
  };

  renderOption = (option: MenuOption | false | null, i: number) => {
    if (!option) {
      return null;
    }
    const {name, slug} = option;
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
    const {
      children,
      onClose,
      open,
      options,
      wrapperStyle,
      xOffset,
    } = this.props;
    return (
      <Positioner
        content={<React.Fragment>{children}</React.Fragment>}
        maxHeight={this.wrapper ? this.wrapper.clientHeight : 0}
        maxWidth={this.wrapper ? this.wrapper.clientWidth : 0}
        preferY="bottom"
        style={wrapperStyle}
        xOffset={xOffset}
        yOffset={4}
      >
        {({x, xAlign, y, yAlign}) => (
          <CloseableLayer onClose={onClose} pointerEvents={open} x={x} y={y}>
            <div
              ref={this.handleRef}
              style={{
                left: 0,
                pointerEvents: 'none',
                position: 'absolute',
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

abstract class AbstractIconMenu extends React.Component {
  props: {
    onSelect: ContextMenu['props']['onSelect'];
    options: ContextMenu['props']['options'];
    style?: CSS;
    toSelect?: ContextMenu['props']['toSelect'];
  };

  abstract iconComponent: React.ComponentType<any>;

  render() {
    const Component = this.iconComponent;
    return (
      <Toggler>
        {({toggle, open}) => (
          <ContextMenu
            open={open}
            onClose={() => toggle(false)}
            onSelect={this.props.onSelect}
            options={this.props.options}
            toSelect={this.props.toSelect}
          >
            <I18n>
              {({intl}) => (
                <IconButton
                  Component={Component}
                  onClick={toggle}
                  style={this.props.style}
                  title={intl.formatMessage(messages.toggle)}
                />
              )}
            </I18n>
          </ContextMenu>
        )}
      </Toggler>
    );
  }
}

export class KebabIconMenu extends AbstractIconMenu {
  iconComponent = MenuIcons.Kebab;
}
export class MeatballIconMenu extends AbstractIconMenu {
  iconComponent = MenuIcons.Meatball;
}
