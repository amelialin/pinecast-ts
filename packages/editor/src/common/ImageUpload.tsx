import * as React from 'react';

import styled from '@pinecast/sb-styles';

import Card from './Card';
import Label from './Label';

const dropZoneStyle = {
  alignItems: 'stretch',
  cursor: 'pointer',
  padding: 0,
  textAlign: 'center',
};

const DashedWrap = styled('div', {
  border: '3px dashed #b7c9d1',
  borderRadius: 2,
  display: 'flex',
  flexDirection: 'column',
  padding: '40px 20px',
  transition: 'border-color 0.2s',
  width: '100%',

  ':hover': {
    borderColor: '#c9d9e0',
  },
});
const BlockB = styled('b', {display: 'block', fontWeight: 500});
const BlockSpan = styled('span', {display: 'block'});
const U = styled('span', {textDecoration: 'underline'});

const NativeFileInput = styled(
  'input',
  {
    display: 'block',
    height: 0,
    opacity: 0,
    ':focus + .imageUpload-dropZone': {
      boxShadow:
        '0 1px 2px rgba(0, 0, 0, 0.15), 0 3px 4px rgba(0, 0, 0, 0.05), 0 0 0 0.5px rgba(0, 0, 0, .15), rgba(167, 210, 243, 0.75) 0 0 0 2px inset',
    },
  },
  {accept: 'image/png, image/jpg, image/jpeg', type: 'file'},
);

export default class ImageUpload extends React.PureComponent {
  ongoingUpload: {abort: () => void} | null = null;

  props: {
    imageType: string;
    labelText: string;
    onCleared: () => void;
    onNewFile: (signedURL: string) => void;
    value: string | null;
  };
  state: {
    error: JSX.Element | string | null;
    selectedFile: File | null;
    uploading: boolean;
    uploadProgress: number;
  } = {
    error: null,
    selectedFile: null,
    uploading: false,
    uploadProgress: 0,
  };

  handleGotFile = (e: React.FormEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    if (!files || !files.length) {
      return;
    }

    this.setState({
      selectedFile: files[0],
      uploading: true,
    });
  };

  render() {
    return (
      <Label text={this.props.labelText}>
        <NativeFileInput onChange={this.handleGotFile} />
        <Card className="imageUpload-dropZone" style={dropZoneStyle}>
          <DashedWrap>
            <BlockB>Drop an image here</BlockB>
            <BlockSpan>
              or <U>click here</U> to browse
            </BlockSpan>
          </DashedWrap>
        </Card>
      </Label>
    );
  }
}
