import {connect} from 'react-redux';
import * as React from 'react';

import styled from '@pinecast/sb-styles';

import ErrorState from '../common/ErrorState';
import ImageSettingsUpdate from './ImageSettingsUpdate';
import ImageUpload from '../common/ImageUpload';
import LoadingState from '../common/LoadingState';
import {PageHeading, PanelDescription, PanelWrapper} from '../panelComponents';
import {ReducerType} from '../reducer';
import {refresh} from '../actions/preview';
import request, {clearCache} from '../data/requests';

const HeaderWrapper = styled('div', {
  alignItems: 'center',
  display: 'flex',
  justifyContent: 'space-between',
});

interface Assets {
  site_favicon: string;
  site_logo: string;
}

class AssetsPanel extends React.PureComponent {
  props: {
    csrf: string;
    slug: string;
  };
  state: {
    data: Assets | null;
    error: JSX.Element | string | null;
  } = {data: null, error: null};

  componentDidMount() {
    const {slug} = this.props;
    request(`/sites/site_builder/editor/assets/${encodeURIComponent(slug)}`)
      .then(data => JSON.parse(data))
      .then(
        parsed => {
          this.setState({data: parsed});
        },
        () => {
          this.setState({
            error: 'Failed to load assets from Pinecast',
          });
        },
      );
  }

  handleGotNewLogo = (newLogo: string | null) => {
    this.setState({data: {...this.state.data, site_logo: newLogo}});
  };

  renderInputs() {
    const {csrf, slug} = this.props;
    const {data} = this.state;
    if (!data) {
      return null;
    }
    return (
      <ImageSettingsUpdate
        csrf={csrf}
        onFileUpdate={this.handleGotNewLogo}
        slug={slug}
      >
        <ImageUpload
          imageType="site_logo"
          labelText="Logo"
          value={data.site_logo}
        />
      </ImageSettingsUpdate>
    );
  }

  renderLoadingOrError() {
    if (this.state.error) {
      return <ErrorState title={this.state.error} />;
    }
    return <LoadingState title="Loading asset data…" />;
  }

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

          {this.state.data ? this.renderInputs() : this.renderLoadingOrError()}
        </PanelWrapper>
      </React.Fragment>
    );
  }
}

export default connect(
  (state: ReducerType) => ({
    csrf: state.csrf,
    slug: state.slug,
  }),
  {onRefresh: refresh},
)(AssetsPanel);
