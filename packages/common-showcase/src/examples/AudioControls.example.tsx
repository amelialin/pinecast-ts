import * as React from 'react';

import AudioControls from '@pinecast/common/audio/AudioControls';

export default {
  name: 'Audio controls',
  examples: [
    {
      title: 'Paused',
      render: () => (
        <AudioControls
          playing={false}
          onPause={() => {}}
          onPlay={() => {}}
          onReset={() => {}}
        />
      ),
    },
    {
      title: 'Playing',
      render: () => (
        <AudioControls
          playing
          onPause={() => {}}
          onPlay={() => {}}
          onReset={() => {}}
        />
      ),
    },
  ],
};
