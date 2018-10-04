import * as React from 'react';

import styled, {CSS} from '@pinecast/styles';

import * as AudioIcons from '../icons/audio';
import Group from '../Group';
import IconButton from '../IconButton';

const Wrapper = styled('div', {
  background: 'rgba(255, 255, 255, 0.8)',
  borderRadius: 2,
  boxShadow: 'rgba(0, 0, 0, 0.05) 0px 0px 1px',
  padding: 4,
});

type Props = {
  onPause: () => void;
  onPlay: () => void;
  onReset: () => void;
  playing: boolean;
  style?: CSS;
};

const iconProps = {
  height: 20,
};

const AudioControls = ({onPause, onPlay, onReset, playing, style}: Props) => (
  <Wrapper style={style}>
    <Group spacing={4}>
      <IconButton
        Component={AudioIcons.Reset}
        iconProps={iconProps}
        onClick={onReset}
        size="small"
      />
      {playing ? (
        <IconButton
          Component={AudioIcons.Pause}
          iconProps={iconProps}
          onClick={onPause}
          size="small"
        />
      ) : (
        <IconButton
          Component={AudioIcons.Play}
          iconProps={iconProps}
          onClick={onPlay}
          size="small"
        />
      )}
    </Group>
  </Wrapper>
);

export default AudioControls;
