import * as React from 'react';

import UploadProgress from '@pinecast/common/uploadHelpers/UploadProgress';

export default {
  name: 'Upload progress',
  examples: [
    {
      title: 'Basic use',
      render: () => (
        <UploadProgress onAbort={() => {}} uploads={[{percent: 20}]} />
      ),
    },
    {
      title: 'Multiple uploads',
      render: () => (
        <UploadProgress
          onAbort={() => {}}
          uploads={[
            {name: 'Audio', percent: 60},
            {name: 'Artwork', percent: 20},
          ]}
        />
      ),
    },
  ],
};
