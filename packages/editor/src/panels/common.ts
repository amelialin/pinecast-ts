import styled from '@pinecast/sb-styles';

import {DEFAULT_FONT} from '../common/constants';

export const PanelWrapper = styled('section', {
  padding: 15,
});

export const PanelHeader = styled('h1', {
  fontFamily: DEFAULT_FONT,
  fontSize: 30,
  fontWeight: 500,
  marginBottom: 40,
  marginTop: 0,
  position: 'relative',

  ':after': {
    backgroundColor: '#8d52d1',
    bottom: -6,
    content: '""',
    display: 'block',
    height: 3,
    left: 0,
    opacity: 0.75,
    position: 'absolute',
    width: '20%',
  },
});

export const PanelDescription = styled('p', {
  fontFamily: DEFAULT_FONT,
  fontSize: 16,
  marginBottom: 30,
  marginTop: -10,
});

export const PanelSection = styled('h2', {
  fontFamily: DEFAULT_FONT,
  fontSize: 24,
  marginBottom: 30,
  marginTop: 40,
});

export const PanelDivider = styled('hr', {
  background: '#8d52d1',
  border: 0,
  height: 1,
  width: '100%',
});
