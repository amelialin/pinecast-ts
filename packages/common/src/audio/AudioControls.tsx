import * as React from 'react';

import {defineMessages, I18n, InjectedIntlProps} from '@pinecast/i18n';
import styled, {CSS} from '@pinecast/styles';

import * as AudioIcons from '../icons/audio';
import Group from '../Group';
import IconButton from '../IconButton';

const messages = defineMessages({
  reset: {
    id: 'common.AudioControls.reset',
    description: 'Button to reset audio',
    defaultMessage: 'Reset',
  },
  pause: {
    id: 'common.AudioControls.pause',
    description: 'Button to pause audio',
    defaultMessage: 'Pause',
  },
  play: {
    id: 'common.AudioControls.play',
    description: 'Button to play audio',
    defaultMessage: 'Play',
  },
});

const Wrapper = styled(
  'div',
  {
    background: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 2,
    boxShadow: 'rgba(0, 0, 0, 0.05) 0px 0px 1px',
    padding: 4,
    transition: 'opacity 0.2s',
  },
  {className: 'AudioControls'},
);

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
    <I18n>
      {({intl}: InjectedIntlProps) => (
        <Group spacing={4}>
          <IconButton
            Component={AudioIcons.Reset}
            iconProps={iconProps}
            onClick={onReset}
            size="small"
            title={intl.formatMessage(messages.reset)}
          />
          {playing ? (
            <IconButton
              Component={AudioIcons.Pause}
              iconProps={iconProps}
              onClick={onPause}
              size="small"
              title={intl.formatMessage(messages.pause)}
            />
          ) : (
            <IconButton
              Component={AudioIcons.Play}
              iconProps={iconProps}
              onClick={onPlay}
              size="small"
              title={intl.formatMessage(messages.play)}
            />
          )}
        </Group>
      )}
    </I18n>
  </Wrapper>
);

export default AudioControls;
