import Dropzone from 'react-dropzone';
import * as React from 'react';

import styled from '@pinecast/sb-styles';

import {dropZoneStyle} from './styles';

const BlockB = styled('b', {display: 'block', fontWeight: 500});
const BlockSpan = styled('span', {display: 'block'});
const U = styled('span', {color: '#4e7287', textDecoration: 'underline'});
const Stub = styled('b', {
  ':empty + .ImageUpload-ImageUploadDropzone-dropzone:focus': {
    boxShadow:
      '0 1px 2px rgba(0, 0, 0, 0.15), 0 3px 4px rgba(0, 0, 0, 0.05), rgba(167, 210, 243, 0.5) 0 0 0 3.5px inset !important',
    outline: 'none',
  },
});

interface Props {
  onChange: (file: File) => void;
}

const baseStyle = {
  border: '3px dashed #b7c9d1',
  borderRadius: 3,
  cursor: 'pointer',
  display: 'flex',
  flexDirection: 'column',
  lineHeight: '20px',
  margin: '0 0 20px',
  overflow: 'hidden',
  padding: '40px 20px',
  textAlign: 'center',
  transition: 'border-color 0.2s, box-shadow 0.2s',
};

const ImageUploadDropzone = ({onChange}: Props) => (
  <React.Fragment>
    <Stub />
    <Dropzone
      accept="image/png, image/jpg, image/jpeg"
      activeStyle={{
        ...baseStyle,
        borderColor: '#c9d9e0',
        boxShadow:
          '0 1px 2px rgba(0, 0, 0, 0.15), 0 3px 4px rgba(0, 0, 0, 0.05), rgba(167, 210, 243, 0.75) 0 0 0 2px inset',
      }}
      className="ImageUpload-ImageUploadDropzone-dropzone"
      disablePreview
      onDrop={files => files.length && onChange(files[0])}
      style={{
        ...baseStyle,
        boxShadow:
          '0 1px 2px rgba(0, 0, 0, 0.15), 0 3px 4px rgba(0, 0, 0, 0.05), 0 0 0 transparent inset',
      }}
      tabIndex={0}
    >
      <BlockB>Drop an image here</BlockB>
      <BlockSpan>
        or <U>click here</U> to browse
      </BlockSpan>
    </Dropzone>
  </React.Fragment>
);

export default ImageUploadDropzone;
