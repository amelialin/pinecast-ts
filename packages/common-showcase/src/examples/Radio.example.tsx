import * as React from 'react';

import Radio from '@pinecast/common/Radio';
import Label from '@pinecast/common/Label';
import {InlineCode} from '@pinecast/common/Text';

export default {
  name: 'Radio',
  examples: [
    {
      title: 'Unchecked',
      render: () => (
        <Label text="Field">
          <Radio
            checked={false}
            name="1"
            onChange={() => {}}
            text="Unchecked"
          />
          <Radio
            checked={false}
            name="1"
            onChange={() => {}}
            text="Unchecked 2"
          />
        </Label>
      ),
    },
    {
      title: 'Checked',
      render: () => (
        <Label text="Field">
          <Radio checked name="2" onChange={() => {}} text="Checked" />
          <Radio
            checked={false}
            name="2"
            onChange={() => {}}
            text="Unchecked"
          />
        </Label>
      ),
    },
    {
      title: 'Disabled',
      render: () => (
        <Label text="Field">
          <Radio checked disabled name="3" onChange={() => {}} text="Checked" />
          <Radio
            checked={false}
            disabled
            name="3"
            onChange={() => {}}
            text="Unchecked"
          />
        </Label>
      ),
    },
    {
      title: 'Disabled',
      render: () => (
        <Label text="Field">
          <Radio
            alignInput="top"
            checked
            name="3"
            onChange={() => {}}
            text={
              <div>
                <div>
                  <b>
                    With <InlineCode>alignInput="top"</InlineCode>
                  </b>
                </div>
                <div>Second line</div>
              </div>
            }
          />
          <Radio
            alignInput="center"
            checked={false}
            name="3"
            onChange={() => {}}
            text={
              <div>
                <div>
                  <b>
                    With <InlineCode>alignInput="center"</InlineCode>
                  </b>
                </div>
                <div>Second line</div>
              </div>
            }
          />
        </Label>
      ),
    },
  ],
};
