import * as React from 'react';

import Label from '@pinecast/common/Label';
import TextInput from '@pinecast/common/TextInput';

export default {
  name: 'Text input',
  examples: [
    {
      title: 'Basic use',
      render: () => (
        <Label text="Text input field">
          <TextInput onChange={() => {}} value="" />
        </Label>
      ),
    },
    {
      title: 'With placeholder',
      render: () => (
        <Label text="Text input field">
          <TextInput
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
        <Label text="Text input field">
          <TextInput
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
        <Label text="Text input field">
          <TextInput
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
