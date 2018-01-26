import * as React from 'react';
import {findDOMNode} from 'react-dom';

import {SketchPicker} from 'react-color';

import styled from '@pinecast/sb-styles';

import {colorKeyNames} from '../constants';
import {DEFAULT_FONT} from '../common/constants';

const Wrapper = styled('div', {
  alignItems: 'center',
  display: 'flex',
  marginBottom: 20,
});
const Chiclet = styled('div', ({$color}) => ({
  backgroundColor: $color,
  borderRadius: 3,
  boxShadow:
    '0 1px 2px rgba(0, 0, 0, 0.15), 0 3px 4px rgba(0, 0, 0, 0.05), 0 0 0 0.5px rgba(0, 0, 0, .15)',
  cursor: 'pointer',
  height: 30,
  transition: 'box-shadow 0.2s',
  width: 30,

  ':hover': {
    boxShadow:
      '0 1px 2px rgba(0, 0, 0, 0.15), 0 3px 5px rgba(0, 0, 0, 0.15), 0 0 0 0.5px rgba(0, 0, 0, .15)',
  },
  ':active': {
    boxShadow:
      '0 1px 0 rgba(0, 0, 0, 0.1), 0 1px 1px rgba(0, 0, 0, 0.15), 0 0 0 0.5px rgba(0, 0, 0, .15)',
  },
}));
const Popover = styled('div', {
  left: 0,
  position: 'absolute',
  top: '100%',
  zIndex: 2,
});
const NameWrapper = styled('div', {
  alignItems: 'center',
  display: 'flex',
  fontFamily: DEFAULT_FONT,
  fontWeight: 500,
  flex: '1 1',
  padding: '0 10px',
});

export default class ColorPicker extends React.PureComponent {
  props: {
    colorKey: string;
    colorValue: string;
    onChange: (string) => void;
  };
  state: {
    showingPicker: boolean;
  };

  popoverWrapper: Element | null;

  constructor(props) {
    super(props);
    this.state = {showingPicker: false};
  }

  // TODO: dedupe this from FontSelect/index.tsx
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

  handleChangeComplete = (color: {hex: string}) => {
    this.props.onChange(color.hex);
  };

  render() {
    const {
      props: {colorKey, colorValue, onChange},
      state: {showingPicker},
    } = this;
    return (
      <Wrapper>
        <div
          ref={el => {
            this.popoverWrapper = el;
          }}
          style={{
            flex: '0 0 30px',
            height: 30,
            position: 'relative',
            width: 30,
          }}
        >
          <Chiclet $color={colorValue} onClick={this.handleClick} />
          {showingPicker && (
            <Popover>
              <SketchPicker
                color={colorValue}
                onChangeComplete={this.handleChangeComplete}
              />
            </Popover>
          )}
        </div>
        <NameWrapper>{colorKeyNames[colorKey]}</NameWrapper>
      </Wrapper>
    );
  }
}
