import * as React from 'react';
import {findDOMNode} from 'react-dom';

import {SketchPicker} from 'react-color';

import styled from '@pinecast/sb-styles';

import {colorKeyNames} from './constants';

const Wrapper = styled('div', {
  display: 'flex',
  marginBottom: 30,
});
const Chiclet = styled('div', ({color}) => ({
  backgroundColor: color,
  borderRadius: 3,
  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2), 0 5px 12px rgba(0, 0, 0, 0.1)',
  cursor: 'pointer',
  height: 50,
  transition: 'box-shadow 0.2s',
  width: 50,

  ':hover': {
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.25), 0 7px 16px rgba(0, 0, 0, 0.1)',
  },
  ':active': {
    boxShadow: '0 3px 4.5px rgba(0, 0, 0, 0.25), 0 5px 12px rgba(0, 0, 0, 0.1)',
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
  fontFamily: 'Fira Mono',
  flex: '1 1',
  padding: 10,
});

export default class ColorPicker extends React.Component {
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
    let target = e.target;
    do {
      if (target === this.popoverWrapper) {
        return;
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
            flex: '0 0 50px',
            height: 50,
            position: 'relative',
            width: 50,
          }}
        >
          <Chiclet color={colorValue} onClick={this.handleClick} />
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
