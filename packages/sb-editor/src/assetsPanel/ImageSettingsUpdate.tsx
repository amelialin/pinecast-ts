import * as React from 'react';

import Callout from '@pinecast/common/Callout';
import LoadingState from '@pinecast/common/LoadingState';
import xhr from '@pinecast/xhr';

export default class ImageSettingsUpdate extends React.PureComponent {
  props: {
    children: JSX.Element;
    csrf: string;
    onFileUpdate: (url: string | null) => void;
    slug: string;
  };
  state: {
    saving: boolean;
    error: string | null;
  } = {
    saving: false,
    error: null,
  };

  handleClear = () => {
    this.handleNewFile(null);
  };
  handleNewFile = async (newFile: string | null) => {
    this.setState({saving: true, error: null});

    try {
      const {children, csrf, slug} = this.props;
      const imageType = React.Children.only(children).props.imageType;
      const result = await xhr({
        body: JSON.stringify({
          [imageType]: newFile,
        }),
        headers: {'X-CSRFToken': csrf},
        method: 'POST',
        url: `/sites/site_builder/editor/assets/${encodeURIComponent(slug)}`,
      });
      this.props.onFileUpdate(JSON.parse(result)[imageType]);
    } catch {
      if (newFile) {
        this.setState({
          error: 'We could not update Pinecast with the new image.',
        });
      } else {
        this.setState({
          error: 'We could not update Pinecast to clear the image.',
        });
      }
    }

    this.setState({saving: false});
  };

  renderSaving() {
    return <LoadingState title="Updating website assets…" />;
  }

  renderError() {
    const {error} = this.state;
    if (!error) {
      return null;
    }

    return <Callout type="negative">{error}</Callout>;
  }

  render() {
    if (this.state.saving) {
      return this.renderSaving();
    }

    const child = React.Children.only(this.props.children);
    return (
      <React.Fragment>
        {this.renderError()}
        {React.cloneElement(child, {
          onCleared: this.handleClear,
          onNewFile: this.handleNewFile,
        })}
      </React.Fragment>
    );
  }
}
