import DropzoneComponent from 'react-dropzone';
import * as React from 'react';

import styled from '@pinecast/styles';

const BlockB = styled('b', {display: 'block', fontWeight: 500});
const BlockSpan = styled('span', {display: 'block'});
const U = styled('span', {color: '#4e7287', textDecoration: 'underline'});
const Stub = styled('b', {
  ':empty + .Dropzone-dropzone:focus': {
    boxShadow:
      '0 1px 2px rgba(0, 0, 0, 0.1), 0 3px 4px rgba(0, 0, 0, 0.025), rgba(167, 210, 243, 0.5) 0 0 0 3.5px inset !important',
    outline: 'none',
  },
});

interface Props {
  accept?: string | Array<string>;
  label: React.ReactNode;
  onChange: (file: File) => void;
}

const baseStyle: React.CSSProperties = {
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

const Dropzone = ({accept, label, onChange}: Props) => (
  <React.Fragment>
    <Stub />
    <DropzoneComponent
      accept={accept}
      activeStyle={{
        ...baseStyle,
        borderColor: '#c9d9e0',
        boxShadow:
          '0 1px 2px rgba(0, 0, 0, 0.1), 0 3px 4px rgba(0, 0, 0, 0.025), rgba(167, 210, 243, 0.75) 0 0 0 2px inset',
      }}
      className="Dropzone-dropzone"
      disableClick // We do this because it's inside a label
      disablePreview
      onDrop={(files: Array<File>) => files.length && onChange(files[0])}
      style={{
        ...baseStyle,
        boxShadow:
          '0 1px 2px rgba(0, 0, 0, 0.1), 0 3px 4px rgba(0, 0, 0, 0.025), 0 0 0 transparent inset',
      }}
    >
      <BlockB>{label}</BlockB>
      <BlockSpan>
        {/* TODO(i18n): This needs formatted translation */}
        or <U>click here</U> to browse
      </BlockSpan>
    </DropzoneComponent>
  </React.Fragment>
);

export default Dropzone;
