import * as React from 'react';

import {DEFAULT_FONT} from '@pinecast/common/constants';
import Label from '@pinecast/common/Label';
import OptionButton from '@pinecast/common/OptionButton';
import styled, {CSS} from '@pinecast/styles';

import AsyncFontPreview from './AsyncFontPreview';
import fontKeyNames from '../../shared/fontNames';

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

const styleOverride: CSS = {
  marginBottom: 30,
  width: '100%',
};

interface Font {
  logo: string;
  headings: string;
  body: string;
}
export default class FontPreset extends React.PureComponent {
  props: {
    onClick: (newFont: Font) => void;
    preset: Font & {name: string};
    selected: boolean;
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
    const {preset, selected} = this.props;

    return (
      <OptionButton
        bright
        onClick={this.handleClick}
        selected={selected}
        style={styleOverride}
      >
        <Label
          text={preset.name}
          labelStyle={{cursor: 'pointer', marginBottom: 10}}
          style={{marginBottom: 0}}
        >
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
      </OptionButton>
    );
  }
}
