import * as React from 'react';

import AudioUploadPreview from '@pinecast/common/uploadHelpers/AudioUploadPreview';

const audio = new Blob([require('buffer-loader!./assets/audio.mp3')], {
  type: 'audio/mp3',
});

export default {
  name: 'Audio upload preview',
  examples: [
    {
      title: 'With a blob',
      render: () => (
        <AudioUploadPreview audioBlob={audio} height={96} onClear={() => {}} />
      ),
    },
    {
      title: 'Collecting time codes',
      render: () => (
        <AudioUploadPreview
          audioBlob={audio}
          collectTimeCodes
          height={96}
          onClear={() => {}}
        />
      ),
    },
  ],
};
