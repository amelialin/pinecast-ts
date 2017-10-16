import {connect} from 'react-redux';
import React from 'react';

import {changeChromePage} from './actions/chrome';
import {ReducerType} from './reducer';

interface ToolbarButtonProps {
  children: any;
  id: ReducerType['page'];
  page: ReducerType['page'];
  switchPage: (page: ReducerType['page']) => void;
}

function insetShadow(isSelected: boolean): string {
  if (isSelected) {
    return '';
  }
  return ', inset 0 -2px 2px rgba(0, 0, 0, 0.2)';
}

const ToolbarButton = ({
  children,
  id,
  page: currentPage,
  switchPage,
}: ToolbarButtonProps) => (
  <button
    onClick={e => {
      e.preventDefault();
      switchPage(id);
    }}
    style={{
      background: id === currentPage ? '#fff' : '#f5f5f5',
      border: 0,
      borderRadius: 3,
      boxShadow: `0 7px 14px rgba(50, 50, 100, ${id === currentPage
        ? '0.3'
        : '0.15'}), 0 3px 6px rgba(0, 0, 0, 0.15)${insetShadow(
        id === currentPage,
      )}`,
      display: 'inline-block',
      fontSize: 14,
      lineHeight: '18px',
      marginRight: 10,
      padding: '5px 10px',
      transition: 'box-shadow 0.2s',
    }}
    type="button"
  >
    {children}
  </button>
);

const ConnectedToolbarButton = connect(
  (state: ReducerType) => ({page: state.page}),
  dispatch => ({switchPage: name => dispatch(changeChromePage(name))}),
)(ToolbarButton);

export default () => (
  <nav
    style={{
      alignItems: 'center',
      backgroundColor: '#8d52d1',
      // borderBottom: '1px solid #ddd',
      display: 'flex',
      height: 50,
      padding: '0 10px',
    }}
  >
    <ConnectedToolbarButton id="presets">Presets</ConnectedToolbarButton>
    <ConnectedToolbarButton id="colors">Colors</ConnectedToolbarButton>
    <ConnectedToolbarButton id="typography">Typography</ConnectedToolbarButton>
  </nav>
);
