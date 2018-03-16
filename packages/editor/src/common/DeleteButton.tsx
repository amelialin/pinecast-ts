import styled from '@pinecast/sb-styles';

const DeleteButton = styled(
  'button',
  {
    backgroundColor: 'transparent',
    border: 0,
    borderRadius: 0,
    cursor: 'pointer',
    display: 'inline-flex',
    height: 20,
    marginTop: -3,
    padding: 0,
    verticalAlign: 'middle',
    width: 20,

    ':before': {
      backgroundColor: '#ccc',
      content: '""',
      display: 'block',
      height: 2,
      margin: 'auto',
      transform: 'translateX(5px) rotate(45deg)',
      transformOrigin: 'center',
      transition: 'background-color 0.25s',
      width: 20,
    },
    ':after': {
      backgroundColor: '#ccc',
      content: '""',
      display: 'block',
      height: 2,
      margin: 'auto',
      transform: 'translateX(-5px) rotate(-45deg)',
      transformOrigin: 'center',
      transition: 'background-color 0.25s',
      width: 20,
    },
    ':hover:before': {
      backgroundColor: '#b00',
    },
    ':hover:after': {
      backgroundColor: '#b00',
    },
  },
  {'aria-label': 'Delete'},
);

export default DeleteButton;
