import styled from '@pinecast/styles';

const Well = styled('div', ({$shave = 20}: {$shave?: number}) => ({
  background: '#f6f7f5',
  borderRadius: 4,
  boxShadow: 'inset 0 0 0 2px #eeefea',
  display: 'flex',
  flexDirection: 'column',
  padding: `20px 20px ${Math.max(20 - $shave, 0)}px`,
}));

export default Well;
