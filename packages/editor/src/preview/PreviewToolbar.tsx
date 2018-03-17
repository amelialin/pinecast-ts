import * as React from 'react';

import styled from '@pinecast/styles';

import FullScreenButton from './FullScreenButton';
import Select from '../common/Select';

const Toolbar = styled('div', {
  alignItems: 'center',
  background: '#b0b5b5',
  display: 'flex',
  height: 40,
  left: 0,
  padding: '0 4px',
  position: 'absolute',
  right: 0,
  top: 0,
});

export type FrameType = 'desktop' | 'mobile' | 'tablet';
export type OrientationType = null | 'portrait' | 'landscape';

const PreviewToolbar = ({
  frame,
  isFullScreen,
  orientation,
  onChange,
  onToggleFullScreen,
}: {
  frame: FrameType;
  isFullScreen: boolean;
  orientation: OrientationType;
  onChange: (frame: FrameType, orientatino: OrientationType) => void;
  onToggleFullScreen: (fullScreen: boolean) => void;
}) => (
  <Toolbar>
    <Select
      onChange={newFrame => onChange(newFrame, orientation)}
      options={{
        desktop: 'Desktop',
        phone: 'Phone',
        tablet: 'Tablet',
      }}
      style={{height: 30, marginBottom: 0}}
      value={frame || 'desktop'}
    />
    {frame !== 'desktop' && (
      <Select
        onChange={newOrientation => onChange(frame, newOrientation)}
        options={{
          portrait: 'Portrait',
          landscape: 'Landscape',
        }}
        style={{height: 30, marginBottom: 0, marginLeft: 4}}
        value={orientation || 'portrait'}
      />
    )}
    <FullScreenButton
      onClick={() => onToggleFullScreen(!isFullScreen)}
      style={{marginLeft: 4}}
    />
  </Toolbar>
);

export default PreviewToolbar;
