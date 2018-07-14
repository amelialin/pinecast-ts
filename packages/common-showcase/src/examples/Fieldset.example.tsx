import * as React from 'react';

import Fieldset from '@pinecast/common/Fieldset';
import Label from '@pinecast/common/Label';
import TextInput from '@pinecast/common/TextInput';

export default {
  name: 'Fieldset',
  examples: [
    {
      title: 'Basic use',
      render: () => (
        <Fieldset label="Fieldset label">
          <Label text="What is your name?">
            <TextInput onChange={() => {}} value="" />
          </Label>
        </Fieldset>
      ),
    },
  ],
};
