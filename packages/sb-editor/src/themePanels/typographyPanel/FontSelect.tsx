import * as React from 'react';

import * as ReactList from 'react-list';

import {CloseableLayer} from '@pinecast/common/Layer';
import {DEFAULT_FONT} from '@pinecast/common/constants';
import Positioner from '@pinecast/common/Positioner';
import styled from '@pinecast/styles';

const SelectBox = styled('button', {
  alignItems: 'center',
  appearance: 'none',
  MozAppearance: 'none',
  WebkitAppearance: 'none',
  background: '#fff',
  border: 0,
  borderRadius: 3,
  boxShadow:
    '0 1px 2px rgba(0, 0, 0, 0.1), 0 3px 4px rgba(0, 0, 0, 0.025), 0 0 0 0.5px rgba(0, 0, 0, .15)',
  display: 'flex',
  flex: '1 1',
  fontFamily: DEFAULT_FONT,
  height: 40,
  padding: '0 30px 0 10px',
  position: 'relative',
  transition: 'box-shadow 0.2s',

  ':hover': {
    boxShadow:
      '0 1px 3px rgba(0, 0, 0, 0.15), 0 3px 5px rgba(0, 0, 0, 0.1), 0 0 0 0.5px rgba(0, 0, 0, .15)',
  },

  ':before': {
    borderLeft: '2px solid #b0b5b5',
    borderTop: '2px solid #b0b5b5',
    content: '""',
    height: 10,
    position: 'absolute',
    right: 10,
    transform: 'translateY(-2px) scaleY(0.8) rotate(45deg)',
    width: 10,
  },
  ':after': {
    borderBottom: '2px solid #b0b5b5',
    borderRight: '2px solid #b0b5b5',
    content: '""',
    height: 10,
    position: 'absolute',
    right: 10,
    transform: 'translateY(2px) scaleY(0.8) rotate(45deg)',
    width: 10,
  },
});
const InnerWrapper = styled('div', ({$isOpen}: {$isOpen: boolean}) => ({
  backgroundColor: '#fff',
  boxShadow:
    '0 1px 2px rgba(0, 0, 0, 0.1), 0 3px 4px rgba(0, 0, 0, 0.025), 0 0 0 0.5px rgba(0, 0, 0, .15)',
  borderRadius: 3,
  left: 0,
  height: 300,
  opacity: $isOpen ? 1 : 0,
  transform: $isOpen ? 'translateY(1px)' : 'translateY(6px)',
  transition: 'opacity 0.25s, transform 0.3s',
  width: 270,
  zIndex: 2,
}));
const InnerWrapperToolbar = styled('div', {
  alignItems: 'center',
  display: 'flex',
  fontSize: 16,
  height: 40,
  justifyContent: 'space-between',
  padding: '0 10px',
  position: 'relative',

  ':after': {
    backgroundImage: 'linear-gradient(to top, transparent, rgba(0, 0, 0, 0.1))',
    content: '""',
    height: 3,
    left: 0,
    position: 'absolute',
    right: 0,
    top: '100%',
    zIndex: 4,
  },
});
const InnerWrapperList = styled('div', {
  height: 260,
  overflowY: 'auto',
  width: 270,
});
const FilterItem = styled(
  'a',
  ({$isSelected}: {$isSelected: boolean}) => ({
    color: $isSelected ? '#8d52d1' : '#aaa',
    textDecoration: 'none',
    transition: 'color 0.2s',
  }),
  {href: '#'},
);
const Item = styled(
  'div',
  {
    alignItems: 'center',
    borderBottom: '1px solid #ddd',
    display: 'flex',
    height: 35,
    padding: '0 10px',
    zIndex: 3,

    ':hover': {
      backgroundColor: '#fafafa',
    },
  },
  {role: 'option'},
);

type State = {
  filter:
    | null
    | 'sans-serif'
    | 'serif'
    | 'handwriting'
    | 'display'
    | 'monospace';
  fontPreviews: {
    categories: {[category: string]: Array<string>};
    getFontComponent(family: string): React.StatelessComponent;
    list: Array<string>;
  } | null;
  showingPicker: boolean;
};

export default class FontSelect extends React.PureComponent {
  props: {
    onChange: (val: string) => void;
    value: string;
  };
  state: State = {
    filter: null,
    fontPreviews: null,
    showingPicker: false,
  };

  popoverWrapper: HTMLElement | null;

  clickListener = (e: MouseEvent) => {
    if (!this.state.showingPicker) {
      return;
    }
    if (
      !this.popoverWrapper ||
      this.popoverWrapper.contains(e.target as Node)
    ) {
      return;
    }
    this.setState({showingPicker: false});
  };

  handleClose = () => {
    this.setState({showingPicker: false});
  };

  componentDidMount() {
    import(/* webpackChunkName: "resources" */ '@pinecast/sb-resources').then(
      ({fontPreviews}) => {
        this.setState({fontPreviews});
      },
    );
    document.body.addEventListener('click', this.clickListener);
  }
  componentWillUnmount() {
    document.body.removeEventListener('click', this.clickListener);
  }

  handleClick = () => {
    this.setState({showingPicker: !this.state.showingPicker});
  };

  itemRenderer = (index: number, key: number | string): JSX.Element => {
    const {filter, fontPreviews} = this.state;
    if (!fontPreviews) {
      return <div />;
    }
    const source = filter ? fontPreviews.categories[filter] : fontPreviews.list;
    const family = source[index];
    const FontPreview = fontPreviews.getFontComponent(source[index]);
    return (
      <Item
        aria-label={family}
        id={this.props.value === family ? 'font-select-selected' : undefined}
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

  handleRef = (el: HTMLDivElement | null) => {
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

  handleFilter(value: State['filter']) {
    return (e: React.MouseEvent<any>) => {
      e.preventDefault();
      this.setState({filter: this.state.filter === value ? null : value});
    };
  }

  renderLoading() {
    return <SelectBox>Loading...</SelectBox>;
  }

  render() {
    const {filter, fontPreviews, showingPicker} = this.state;
    if (!fontPreviews) {
      return this.renderLoading();
    }
    const FontPreview = fontPreviews.getFontComponent(this.props.value);
    return (
      <Positioner
        content={
          <SelectBox
            arial-label={this.props.value}
            onClick={this.handleClick}
            title={this.props.value}
          >
            <FontPreview />
          </SelectBox>
        }
        maxHeight={300}
        maxWidth={270}
        style={{display: 'flex'}}
      >
        {({x, y}) => (
          <CloseableLayer
            onClose={this.handleClose}
            pointerEvents={showingPicker}
            x={x}
            y={y}
          >
            <InnerWrapper
              $isOpen={showingPicker}
              aria-activedescendant={
                showingPicker ? 'font-select-selected' : undefined
              }
              aria-hidden={!showingPicker}
              onRef={this.handleRef}
              role="listbox"
            >
              <InnerWrapperToolbar>
                <FilterItem
                  $isSelected={filter === 'serif'}
                  onClick={this.handleFilter('serif')}
                  style={{fontFamily: 'serif'}}
                >
                  Serif
                </FilterItem>
                <FilterItem
                  $isSelected={filter === 'sans-serif'}
                  onClick={this.handleFilter('sans-serif')}
                  style={{fontFamily: 'sans-serif'}}
                >
                  Sans
                </FilterItem>
                <FilterItem
                  $isSelected={filter === 'monospace'}
                  onClick={this.handleFilter('monospace')}
                  style={{fontFamily: 'Courier, Courier New, monospace'}}
                >
                  Mono
                </FilterItem>
                <FilterItem
                  $isSelected={filter === 'display'}
                  onClick={this.handleFilter('display')}
                  style={{fontFamily: 'Impact, Arial Black'}}
                >
                  Disp
                </FilterItem>
                <FilterItem
                  $isSelected={filter === 'handwriting'}
                  onClick={this.handleFilter('handwriting')}
                  style={{fontFamily: 'Comic, Comic Sans, cursive'}}
                >
                  HW
                </FilterItem>
              </InnerWrapperToolbar>
              <InnerWrapperList>
                <ReactList
                  itemRenderer={this.itemRenderer}
                  length={
                    filter
                      ? fontPreviews.categories[filter].length
                      : fontPreviews.list.length
                  }
                  type="uniform"
                />
              </InnerWrapperList>
            </InnerWrapper>
          </CloseableLayer>
        )}
      </Positioner>
    );
  }
}
