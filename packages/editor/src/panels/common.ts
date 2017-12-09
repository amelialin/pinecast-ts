import styled from '@pinecast/sb-styles';

export const PanelWrapper = styled('section', {
  padding: 30,
});

export const PanelHeader = styled('h1', {
  fontFamily: 'Fira Mono',
  fontSize: 30,
  fontWeight: 500,
  marginBottom: 15,
  marginTop: 0,
});

export const PanelDescription = styled('p', {
  fontFamily: 'Fira Mono',
  fontSize: 16,
  marginBottom: 30,
  marginTop: -10,
});

export const PanelSection = styled('h2', {
  fontFamily: 'Fira Mono',
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
