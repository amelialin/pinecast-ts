import * as React from 'react';

import {default as ImageUpload} from '@pinecast/common/ImageUpload';

export default {
  name: 'Image upload',
  examples: [
    {
      title: 'Basic use',
      render: () => (
        <ImageUpload
          imageType="site_logo"
          labelText="Choose an image to use as your logo."
          onCleared={() => {}}
          onNewFile={async () => {}}
          slug="slug"
          value={null}
        />
      ),
    },
  ],
};
