import * as React from 'react';

import styled from '@pinecast/sb-styles';

import AsyncFontPreview from './AsyncFontPreview';
import {fontKeyNames} from '../../constants';
import Label from '../../common/Label';

const Wrapper = styled(
  'button',
  {
    background: '#fff',
    border: '1px solid #eee',
    borderRadius: 3,
    boxShadow:
      '0 2px 5px rgba(0, 0, 0, 0.2), 0 5px 12px rgba(0, 0, 0, 0.1), 0 0 0 0.5px rgba(50,50,93,.17)',
    marginBottom: 30,
    padding: 15,
    textAlign: 'left',
  },
  {type: 'button'},
);
const InnerWrapper = styled('div', {
  display: 'flex',
  flexWrap: 'wrap',
});
const PreviewWrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  marginBottom: 10,
  width: 250,
});

interface Font {
  logo: string;
  headings: string;
  body: string;
}
export default class FontPreset extends React.PureComponent {
  props: {
    onClick: (Font) => void;
    preset: Font & {name: string};
  };

  handleClick = () => {
    const preset = this.props.preset;
    this.props.onClick({
      logo: preset.logo,
      headings: preset.headings,
      body: preset.body,
    });
  };

  render() {
    const {preset} = this.props;

    return (
      <Wrapper onClick={this.handleClick}>
        <Label text={preset.name} labelStyle={{marginBottom: 10}}>
          <InnerWrapper>
            <PreviewWrapper>
              <AsyncFontPreview family={preset.logo} />
              <span>{fontKeyNames.logo}</span>
            </PreviewWrapper>
            <PreviewWrapper>
              <AsyncFontPreview family={preset.headings} />
              <span>{fontKeyNames.headings}</span>
            </PreviewWrapper>
            <PreviewWrapper>
              <AsyncFontPreview family={preset.body} />
              <span>{fontKeyNames.body}</span>
            </PreviewWrapper>
          </InnerWrapper>
        </Label>
      </Wrapper>
    );
  }
}
