import * as React from 'react';

import styled from '@pinecast/sb-styles';

import ImageUpload from '../common/ImageUpload';
import {PageHeading, PanelDescription, PanelWrapper} from '../panelComponents';

const HeaderWrapper = styled('div', {
  alignItems: 'center',
  display: 'flex',
  justifyContent: 'space-between',
});

export default class AssetsPanel extends React.PureComponent {
  state: {existingLogoURL: string | null} = {existingLogoURL: null};

  handleGotNewLogo = (newLogo: string) => {};
  handleClearLogo = () => {};

  render() {
    return (
      <React.Fragment>
        <HeaderWrapper>
          <PageHeading>Assets</PageHeading>
        </HeaderWrapper>
        <PanelWrapper>
          <PanelDescription>
            Upload your own graphics and illustrations. Images may be up to 2MB
            and be either PNG or JPEG.
          </PanelDescription>

          <ImageUpload
            imageType="logo"
            labelText="Logo"
            onNewFile={this.handleGotNewLogo}
            onCleared={this.handleClearLogo}
            value={this.state.existingLogoURL}
          />
        </PanelWrapper>
      </React.Fragment>
    );
  }
}
