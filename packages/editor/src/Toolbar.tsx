import {connect} from 'react-redux';
import * as React from 'react';

import styled from '@pinecast/sb-styles';

import {changeChromePage} from './actions/chrome';
import {ReducerType} from './reducer';

const Toolbar_ = styled('nav', {
  alignItems: 'center',
  backgroundColor: '#eee',
  // borderBottom: '1px solid #ddd',
  display: 'flex',
  fontFamily: 'Fira Mono',
  height: 50,
  padding: '0 30px',
});
const Button = styled(
  'button',
  ({isSelected}) => ({
    background: 'transparent',
    border: 0,
    color: isSelected ? '#8d52d1' : '#444',
    display: 'inline-block',
    fontSize: 16,
    fontWeight: 500,
    lineHeight: '20px',
    marginRight: 20,
    padding: 0,
    transition: 'color 0.2s',

    ':focus': {
      outline: isSelected ? '0' : null,
      textShadow: isSelected ? '0 1px 2px rgba(0, 0, 0, 0.15)' : null,
    },
  }),
  {type: 'button'},
);

// const Button = styled(
//   'button',
//   ({isSelected}) => ({
//     background: '#fff',
//     border: 0,
//     borderRadius: 3,
//     boxShadow: isSelected
//       ? '0 2px 5px rgba(0, 0, 0, 0.2), 0 7px 14px rgba(50, 50, 100, 0.1)'
//       : null,
//     display: 'inline-block',
//     fontSize: 14,
//     lineHeight: '18px',
//     marginRight: 10,
//     padding: '5px 10px',
//     transition: 'box-shadow 0.2s',
//   }),
//   {type: 'button'},
// );

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
    <ConnectedToolbarButton id="components">Components</ConnectedToolbarButton>
  </Toolbar_>
);

export default Toolbar;
