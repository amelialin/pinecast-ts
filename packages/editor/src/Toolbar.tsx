import {connect} from 'react-redux';
import * as React from 'react';

import styled from '@pinecast/sb-styles';

import {changeChromePage} from './actions/chrome';
import {DEFAULT_FONT} from './common/constants';
import {ReducerType} from './reducer';
import ReportProblem from './ReportProblem';

const Toolbar_ = styled('nav', {
  alignItems: 'center',
  backgroundColor: '#eee',
  display: 'flex',
  fontFamily: DEFAULT_FONT,
  height: 50,
  padding: '0 15px',
});
const ToolbarOption = styled(
  'button',
  ({'aria-selected': isSelected}) => ({
    background: 'transparent',
    border: 0,
    color: isSelected ? '#8d52d1' : '#444',
    cursor: isSelected ? null : 'pointer',
    display: 'inline-block',
    fontFamily: DEFAULT_FONT,
    fontSize: 16,
    fontWeight: 500,
    lineHeight: '20px',
    marginRight: 20,
    padding: 0,
    position: 'relative',
    top: 0,
    transition: 'color 0.2s, top 0.1s',

    ':active': {
      outline: 0,
      top: 1,
    },
    ':focus': {
      outline: isSelected ? '0' : null,
      textShadow: isSelected ? '0 1px 2px rgba(0, 0, 0, 0.15)' : null,
    },
  }),
  {type: 'button', role: 'tab'},
);

const RHS = styled('div', {
  display: 'flex',
  flex: '1 1',
  justifyContent: 'flex-end',
  textAlign: 'right',
});

const ToolbarButton = ({
  children,
  id,
  page: currentPage,
  switchPage,
}: {
  children: any;
  id: ReducerType['page'];
  page: ReducerType['page'];
  switchPage: (page: ReducerType['page']) => void;
}) => (
  <ToolbarOption
    aria-selected={id === currentPage ? 'true' : null}
    onClick={e => {
      e.preventDefault();
      switchPage(id);
    }}
  >
    {children}
  </ToolbarOption>
);

const ConnectedToolbarButton = connect(
  (state: ReducerType) => ({page: state.page}),
  dispatch => ({switchPage: name => dispatch(changeChromePage(name))}),
)(ToolbarButton);

const Toolbar = () => (
  <Toolbar_>
    <ConnectedToolbarButton id="theme">Theme</ConnectedToolbarButton>
    <ConnectedToolbarButton id="links">Links</ConnectedToolbarButton>
    <ConnectedToolbarButton id="pages">Pages</ConnectedToolbarButton>
    <ConnectedToolbarButton id="assets">Assets</ConnectedToolbarButton>
    <ConnectedToolbarButton id="settings">Settings</ConnectedToolbarButton>
    <RHS>
      <ReportProblem />
    </RHS>
  </Toolbar_>
);

export default Toolbar;
