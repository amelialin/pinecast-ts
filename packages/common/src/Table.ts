import styled from '@pinecast/styles';

export const Table = styled('table', {
  border: 0,
  borderBottom: '1px solid #ccc',
  borderCollapse: 'collapse',
  lineHeight: '36px',
  marginBottom: 40,
  width: '100%',
});
export const TableHeaderCell = styled('th', {
  borderBottom: '1px solid #ccc',
  color: '#4e7287',
  fontSize: 12,
  fontWeight: 500,
  lineHeight: 26,
  padding: '0 8px',
  textAlign: 'left',
  textTransform: 'uppercase',
});
export const TableBodyCell = styled('td', ({$wrapAt}: {$wrapAt?: number}) => ({
  borderBottom: '1px solid #ccc',
  fontSize: 14,
  maxWidth: $wrapAt,
  overflow: 'hidden',
  padding: '0 8px',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
}));
