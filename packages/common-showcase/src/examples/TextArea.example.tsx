import * as React from 'react';

import Label from '@pinecast/common/Label';
import TextArea from '@pinecast/common/TextArea';

export default {
  name: 'Text area',
  examples: [
    {
      title: 'Basic use',
      render: () => (
        <Label text="Text area field">
          <TextArea onChange={() => {}} value="" />
        </Label>
      ),
    },
    {
      title: 'With placeholder',
      render: () => (
        <Label text="Text area field">
          <TextArea
            onChange={() => {}}
            placeholder="This is the placeholder"
            value=""
          />
        </Label>
      ),
    },
    {
      title: 'Disabled',
      render: () => (
        <Label text="Text area field">
          <TextArea
            disabled
            onChange={() => {}}
            placeholder="This is the placeholder"
            value=""
          />
        </Label>
      ),
    },
    {
      title: 'Invalid',
      render: () => (
        <Label text="Text area field">
          <TextArea
            invalid
            onChange={() => {}}
            placeholder="This is the placeholder"
            value=""
          />
        </Label>
      ),
    },
  ],
};
