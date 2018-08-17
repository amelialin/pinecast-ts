import * as React from 'react';

import Asset from './assets';

export default class ImageViewer extends React.PureComponent {
  props: {
    height: number;
    source: string | Asset;
    width: number;
  } & React.HTMLAttributes<HTMLImageElement>;
  state:
    | {
        source: string | Asset;
        url: string;
      }
    | {source: null; url: null} = {source: null, url: null};

  static deriveStateFromProps(
    {source}: ImageViewer['props'],
    state: ImageViewer['state'],
  ): ImageViewer['state'] {
    if (source === state.source) {
      return state;
    }
    if (state.source instanceof Asset) {
      URL.revokeObjectURL(state.url!);
    }
    return {
      source,
      url:
        typeof source === 'string'
          ? source
          : URL.createObjectURL(source.getAsBlob()),
    };
  }

  componentWillUnmount() {
    if (this.state.source instanceof Blob) {
      URL.revokeObjectURL(this.state.url!);
    }
  }

  render() {
    const {
      props: {source, ...props},
      state: {url},
    } = this;
    void source;
    return <img alt="" {...props} src={url!} />;
  }
}
