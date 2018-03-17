import * as React from 'react';

import styled from '@pinecast/styles';

const Badge = styled('span', {
  backgroundColor: '#c9d9e0',
  borderRadius: 3,
  color: '#32586e',
  display: 'inline-flex',
  fontSize: 13,
  fontStyle: 'italic',
  fontWeight: 500,
  marginRight: 4,
  padding: '2px 5px 3px',
});

const ProBadge = () => <Badge>Pro</Badge>;

export default ProBadge;
