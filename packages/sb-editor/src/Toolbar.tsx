import {connect} from 'react-redux';
import * as React from 'react';

import styled from '@pinecast/styles';

import {changeChromePage} from './actions/chrome';
import {DEFAULT_FONT} from '@pinecast/common/constants';
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

const BackChevron = styled('a', {
  display: 'block',
  paddingRight: 12,

  '::before': {
    border: '3px solid #4e7287',
    borderRight: 0,
    borderTop: 0,
    content: '""',
    display: 'block',
    height: 12,
    transform: 'rotate(45deg)',
    width: 12,
  },
  ':hover::before': {
    borderColor: '#8aa3b1',
  },
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

const Toolbar = ({
  changeChromePage,
  page,
  slug,
}: {
  changeChromePage: (page: ReducerType['page']) => any;
  page: ReducerType['page'];
  slug: string | null;
}) => (
  <Toolbar_>
    <BackChevron href={`/dashboard/podcast/${slug}`} />
    <ToolbarButton changeChromePage={changeChromePage} id="theme" page={page}>
      Theme
    </ToolbarButton>
    <ToolbarButton changeChromePage={changeChromePage} id="layout" page={page}>
      Layout
    </ToolbarButton>
    <ToolbarButton changeChromePage={changeChromePage} id="content" page={page}>
      Content
    </ToolbarButton>
    <ToolbarButton changeChromePage={changeChromePage} id="assets" page={page}>
      Assets
    </ToolbarButton>
    <ToolbarButton
      changeChromePage={changeChromePage}
      id="settings"
      page={page}
    >
      Settings
    </ToolbarButton>
    <RHS>
      <ReportProblem />
    </RHS>
  </Toolbar_>
);

export default connect(
  (state: ReducerType) => ({page: state.page, slug: state.slug}),
  {changeChromePage},
)(Toolbar);
