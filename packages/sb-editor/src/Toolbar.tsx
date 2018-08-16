import {connect} from 'react-redux';
import * as React from 'react';

import styled from '@pinecast/styles';

import {changeChromePage} from './actions/chrome';
import {DEFAULT_FONT} from '@pinecast/common/constants';
import {Pinecast} from '@pinecast/common/icons';
import {ReducerType} from './reducer';
import ReportProblem from './ReportProblem';

const Toolbar_ = styled('nav', {
  alignItems: 'center',
  backgroundColor: '#eeefea',
  display: 'flex',
  fontFamily: DEFAULT_FONT,
  height: 48,
  padding: '0 15px',
});
const ToolbarOption = styled(
  'button',
  ({'aria-selected': isSelected}: {'aria-selected': boolean}) => ({
    background: 'transparent',
    border: 0,
    color: isSelected ? '#8d52d1' : '#616669',
    cursor: isSelected ? undefined : 'pointer',
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
      outline: isSelected ? '0' : undefined,
      textShadow: isSelected ? '0 1px 2px rgba(0, 0, 0, 0.15)' : undefined,
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
  changeChromePage,
}: {
  children: any;
  id: ReducerType['page'];
  page: ReducerType['page'];
  changeChromePage: (page: ReducerType['page']) => any;
}) => (
  <ToolbarOption
    aria-selected={id === currentPage}
    onClick={e => {
      e.preventDefault();
      changeChromePage(id);
    }}
  >
    {children}
  </ToolbarOption>
);

const ConnectedToolbarButton = connect(
  (state: ReducerType) => ({page: state.page}),
  {changeChromePage},
)(ToolbarButton) as React.ComponentType<{
  children: string;
  id: ReducerType['page'];
}>;

const Toolbar = () => (
  <Toolbar_>
    <Pinecast color="#616669" height={20} style={{marginRight: 12}} />
    <ConnectedToolbarButton id="theme">Theme</ConnectedToolbarButton>
    <ConnectedToolbarButton id="layout">Layout</ConnectedToolbarButton>
    <ConnectedToolbarButton id="content">Content</ConnectedToolbarButton>
    <ConnectedToolbarButton id="assets">Assets</ConnectedToolbarButton>
    <ConnectedToolbarButton id="settings">Settings</ConnectedToolbarButton>
    <RHS>
      <ReportProblem />
    </RHS>
  </Toolbar_>
);

export default Toolbar;
