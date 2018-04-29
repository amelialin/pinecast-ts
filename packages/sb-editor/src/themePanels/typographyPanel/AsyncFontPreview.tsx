import * as React from 'react';

import styled from '@pinecast/styles';

const Wrapper = styled('div');

export default class AsyncFontPreview extends React.PureComponent {
  props: {
    family: string;
  };
  state: {
    fontPreviews: {
      getFontComponent(family: string): React.StatelessComponent;
    } | null;
  } = {
    fontPreviews: null,
  };

  componentWillMount() {
    import(/* webpackChunkName: "resources" */ '@pinecast/sb-resources').then(
      ({fontPreviews}) => {
        this.setState({fontPreviews});
      },
    );
  }

  render() {
    const {props: {family}, state: {fontPreviews}} = this;
    if (!fontPreviews) {
      return <Wrapper>Loading...</Wrapper>;
    }

    const Preview = fontPreviews.getFontComponent(family);
    return (
      <Wrapper>
        <Preview />
      </Wrapper>
    );
  }
}
