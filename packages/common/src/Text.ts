import styled from '@pinecast/styles';

import {DEFAULT_FONT} from './constants';

export const DashboardTitle = styled('strong', {
  display: 'block',
  fontSize: 16,
  fontWeight: 500,
  marginBottom: 20,
});

export const P = styled('p', {
  fontSize: 14,
  lineHeight: 24,
  marginBottom: 24,
  paddingRight: '20%',

  '@media (max-width: 400px)': {
    textAlign: 'justify',
    paddingRight: 0,
  },
});

export const LegalP = styled('p', {
  fontSize: 12,
  lineHeight: 20,
  marginBottom: 20,
  paddingRight: '20%',
  textAlign: 'justify',

  '@media (max-width: 400px)': {
    paddingRight: 0,
  },
});

export const TextPill = styled('span', {
  background: '#fff',
  border: '1px solid rgba(0, 0, 0, 0.15)',
  borderRadius: 3,
  display: 'inline-flex',
  fontSize: '0.95em',
  padding: '0 4px',
});

export const HelpText = styled('p', {
  fontFamily: DEFAULT_FONT,
  fontSize: 14,
  margin: '0 0 1.5em',
});

export const InlineCode = styled('code', {
  backgroundColor: '#eeefea',
  borderRadius: 2,
  display: 'inline-block',
  fontFamily: 'Consolas, Input, Courier, Courier New, monospace',
  fontWeight: 400,
  padding: '0 4px',
});
