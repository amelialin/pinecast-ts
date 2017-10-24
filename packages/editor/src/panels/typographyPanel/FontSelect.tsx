import * as React from 'react';

import ReactList from 'react-list';

import styled from '@pinecast/sb-styles';

const OuterWrapper = styled('div', {
  position: 'relative',
});
const SelectBox = styled('div', {
  alignItems: 'center',
  borderRadius: 3,
  boxShadow:
    '0 2px 5px rgba(0, 0, 0, 0.2), 0 5px 12px rgba(0, 0, 0, 0.1), 0 0 0 0.5px rgba(50,50,93,.17)',
  display: 'flex',
  height: 40,
  marginTop: 10,
  padding: '0 30px 0 10px',

  ':before': {
    border: '2px solid #bbb',
    borderRight: 0,
    borderBottom: 0,
    content: '""',
    height: 10,
    position: 'absolute',
    right: 10,
    transform: 'translateY(-2px) scaleY(0.8) rotate(45deg)',
    width: 10,
  },
  ':after': {
    border: '2px solid #bbb',
    borderLeft: 0,
    borderTop: 0,
    content: '""',
    height: 10,
    position: 'absolute',
    right: 10,
    transform: 'translateY(2px) scaleY(0.8) rotate(45deg)',
    width: 10,
  },
});
const InnerWrapper = styled('div', ({isOpen}: {isOpen: boolean}) => ({
  backgroundColor: '#fff',
  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2), 0 5px 12px rgba(0, 0, 0, 0.1)',
  borderRadius: 3,
  left: 0,
  maxHeight: 300,
  opacity: isOpen ? 1 : 0,
  overflowY: 'auto',
  pointerEvents: isOpen ? null : 'none',
  position: 'absolute',
  top: '100%',
  transform: isOpen ? 'translateY(1px)' : 'translateY(6px)',
  transition: 'opacity 0.25s, transform 0.3s',
  width: 270,
  zIndex: 2,
}));
const Item = styled(
  'div',
  {
    alignItems: 'center',
    borderBottom: '1px solid #ddd',
    display: 'flex',
    height: 35,
    padding: '0 10px',

    ':hover': {
      backgroundColor: '#fafafa',
    },
  },
  {role: 'option'},
);

export default class FontSelect extends React.Component {
  props: {
    onChange: (string) => void;
    value: string;
  };

  state: {
    fontPreviews: {
      categories: {[category: string]: Array<string>};
      getFontComponent(family: string): React.StatelessComponent;
      list: Array<string>;
    } | null;
    showingPicker: boolean;
  } = {
    fontPreviews: null,
    showingPicker: false,
  };

  popoverWrapper: Element | null;

  // TODO: dedupe this from ColorPicker.tsx
  escapeListener = (e: KeyboardEvent) => {
    if (!this.state.showingPicker) {
      return;
    }
    if (e.keyCode !== 27) {
      // ESC
      return;
    }
    this.setState({showingPicker: false});
  };
  clickListener = (e: MouseEvent) => {
    if (!this.state.showingPicker) {
      return;
    }
    if (!this.popoverWrapper) {
      return;
    }
    let target = e.target as Node;
    do {
      if (target === this.popoverWrapper) {
        return;
      }
      if (!target.parentNode) {
        break;
      }
      target = target.parentNode;
    } while (target.parentNode !== document.body);
    this.setState({showingPicker: false});
  };

  componentDidMount() {
    import(/* webpackChunkName: "resources" */ '@pinecast/sb-resources').then(
      ({fontPreviews}) => {
        this.setState({fontPreviews});
      },
    );
    window.addEventListener('keydown', this.escapeListener);
    document.body.addEventListener('click', this.clickListener);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.escapeListener);
    document.body.removeEventListener('click', this.clickListener);
  }

  handleClick = () => {
    this.setState({showingPicker: !this.state.showingPicker});
  };

  itemRenderer = (index: number, key: string) => {
    const {fontPreviews} = this.state;
    if (!fontPreviews) {
      return null;
    }
    const family = fontPreviews.list[index];
    const FontPreview = fontPreviews.getFontComponent(fontPreviews.list[index]);
    return (
      <Item
        aria-label={family}
        id={this.props.value === family ? 'font-select-selected' : null}
        key={key}
        title={family}
        onClick={() => {
          this.props.onChange(family);
          this.setState({showingPicker: false});
        }}
      >
        <FontPreview />
      </Item>
    );
  };

  handleRef = el => {
    this.popoverWrapper = el;
  };

  randomizeCategory(categories: Array<string>) {
    const {fontPreviews} = this.state;
    if (!fontPreviews || categories.some(x => !fontPreviews.categories[x])) {
      return;
    }
    const fonts = categories
      .map(x => fontPreviews.categories[x])
      .reduce((acc, cur) => acc.concat(cur), []);
    const randomValue = fonts[Math.floor(Math.random() * fonts.length)];
    this.props.onChange(randomValue);
  }

  renderLoading() {
    return <SelectBox>Loading...</SelectBox>;
  }

  render() {
    const {fontPreviews, showingPicker} = this.state;
    if (!fontPreviews) {
      return this.renderLoading();
    }
    const FontPreview = fontPreviews.getFontComponent(this.props.value);
    return (
      <div style={{position: 'relative'}} ref={this.handleRef}>
        <SelectBox
          arial-label={this.props.value}
          onClick={this.handleClick}
          title={this.props.value}
        >
          <FontPreview />
        </SelectBox>
        <InnerWrapper
          aria-activedescendant={showingPicker ? 'font-select-selected' : null}
          aria-hidden={!showingPicker}
          isOpen={showingPicker}
          role="listbox"
        >
          <ReactList
            itemRenderer={this.itemRenderer}
            length={fontPreviews.list.length}
            type="uniform"
          />
        </InnerWrapper>
      </div>
    );
  }
}
