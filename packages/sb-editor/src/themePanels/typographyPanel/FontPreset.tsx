import * as React from 'react';

import styled from '@pinecast/styles';

import AsyncFontPreview from './AsyncFontPreview';
import {DEFAULT_FONT} from '@pinecast/common/constants';
import fontKeyNames from '../../shared/fontNames';
import Label from '@pinecast/common/Label';

const Wrapper = styled(
  'button',
  {
    background: '#fff',
    border: 0,
    borderRadius: 3,
    boxShadow:
      '0 1px 2px rgba(0, 0, 0, 0.1), 0 3px 4px rgba(0, 0, 0, 0.025), 0 0 0 0.5px rgba(0, 0, 0, .15)',
    marginBottom: 30,
    padding: 15,
    textAlign: 'left',
    transition: 'box-shadow 0.2s',

    ':hover': {
      boxShadow:
        '0 1px 3px rgba(0, 0, 0, 0.15), 0 3px 5px rgba(0, 0, 0, 0.1), 0 0 0 0.5px rgba(0, 0, 0, .15)',
    },
    ':active': {
      boxShadow:
        '0 1px 0 rgba(0, 0, 0, 0.1), 0 1px 1px rgba(0, 0, 0, 0.15), 0 0 0 0.5px rgba(0, 0, 0, .15)',
    },
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
  fontFamily: DEFAULT_FONT,
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
    onClick: (newFont: Font) => void;
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
