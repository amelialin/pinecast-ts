import * as React from 'react';

import styled from '@pinecast/sb-styles';

import {PageHeading, PanelDescription, PanelWrapper} from '../panelComponents';

const HeaderWrapper = styled('div', {
  alignItems: 'center',
  display: 'flex',
  justifyContent: 'space-between',
});

const PagesPanel = () => (
  <React.Fragment>
    <HeaderWrapper>
      <PageHeading>Pages</PageHeading>
    </HeaderWrapper>
    <PanelWrapper>
      <PanelDescription>Coming soon</PanelDescription>
    </PanelWrapper>
  </React.Fragment>
);

export default PagesPanel;
