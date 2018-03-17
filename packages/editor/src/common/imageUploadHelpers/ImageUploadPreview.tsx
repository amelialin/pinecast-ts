import * as React from 'react';

import styled, {CSS} from '@pinecast/styles';

import Button from '../Button';
import Card from '../Card';

const Wrapper = styled('div', {
  alignItems: 'center',
  display: 'flex',
  justifyContent: 'center',
  position: 'relative',
});
const Image = styled('img', {
  backgroundColor: '#eeefea',
  minHeight: 150,
});

const buttonStyle: CSS = {
  position: 'absolute',
  right: 0,
  top: 0,
};

const ImageUploadPreview = ({
  maxHeight,
  maxWidth,
  onClear,
  src,
}: {
  maxHeight: number | string;
  maxWidth: number | string;
  onClear: () => void;
  src: string;
}) => (
  <Card>
    <Wrapper style={{maxHeight, maxWidth}}>
      <Button onClick={onClear} style={buttonStyle}>
        Clear
      </Button>
      <Image src={src} style={{maxHeight, maxWidth}} />
    </Wrapper>
  </Card>
);

export default ImageUploadPreview;
