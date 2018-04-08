import * as React from 'react';

import {default as Form} from '@pinecast/common/Form';
import {default as Label} from '@pinecast/common/Label';
import {default as TextInput} from '@pinecast/common/TextInput';

export default {
  name: 'Form',
  examples: [
    {
      title: 'Basic use',
      render: () => (
        <Form
          onSubmit={() => {
            alert('Submitted!');
          }}
        >
          <Label text="What is your name?">
            <TextInput onChange={() => {}} value="" />
          </Label>
        </Form>
      ),
    },
  ],
};
