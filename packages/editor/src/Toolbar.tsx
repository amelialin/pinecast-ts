import {connect} from 'react-redux';
import * as React from 'react';

import styled from '@pinecast/sb-styles';

import {changeChromePage} from './actions/chrome';
import {ReducerType} from './reducer';

interface ToolbarButtonProps {
  children: any;
  id: ReducerType['page'];
  page: ReducerType['page'];
  switchPage: (page: ReducerType['page']) => void;
}

const Toolbar_ = styled('nav', {
  alignItems: 'center',
  backgroundColor: '#8d52d1',
  // borderBottom: '1px solid #ddd',
  display: 'flex',
  fontFamily: 'Fira Mono',
  height: 50,
  padding: '0 30px',
});
const Button = styled(
  'button',
  ({isSelected}) => ({
    background: isSelected ? '#fff' : '#f5f5f5',
    border: 0,
    borderRadius: 3,
    boxShadow: `0 7px 14px rgba(50, 50, 100, ${isSelected
      ? '0.3'
      : '0.15'}), 0 3px 6px rgba(0, 0, 0, 0.15)${isSelected
      ? ''
      : ', inset 0 -2px 2px rgba(0, 0, 0, 0.2)'}`,
    display: 'inline-block',
    fontSize: 14,
    lineHeight: '18px',
    marginRight: 10,
    padding: '5px 10px',
    transition: 'box-shadow 0.2s',
  }),
  {type: 'button'},
);

const ToolbarButton = ({
  children,
  id,
  page: currentPage,
  switchPage,
}: ToolbarButtonProps) => (
  <Button
    isSelected={id === currentPage}
    onClick={e => {
      e.preventDefault();
      switchPage(id);
    }}
  >
    {children}
  </Button>
);

const ConnectedToolbarButton = connect(
  (state: ReducerType) => ({page: state.page}),
  dispatch => ({switchPage: name => dispatch(changeChromePage(name))}),
)(ToolbarButton);

const Toolbar = () => (
  <Toolbar_>
    <ConnectedToolbarButton id="presets">Presets</ConnectedToolbarButton>
    <ConnectedToolbarButton id="colors">Colors</ConnectedToolbarButton>
    <ConnectedToolbarButton id="typography">Typography</ConnectedToolbarButton>
  </Toolbar_>
);

export default Toolbar;
