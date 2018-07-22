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
      title: 'With sizes',
      render: () => (
        <React.Fragment>
          <Label text="Text input field">
            <TextInput onChange={() => {}} size="normal" value="Normal size" />
          </Label>
          <Label text="Text input field">
            <TextInput onChange={() => {}} size="large" value="Large size" />
          </Label>
        </React.Fragment>
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
    {
      title: 'With prefix',
      render: () => (
        <React.Fragment>
          <Label text="Text input field">
            <TextInput onChange={() => {}} prefix="$" value="20.00" />
          </Label>
          <Label text="Text input field">
            <TextInput
              onChange={() => {}}
              prefix="$"
              size="large"
              value="20.00"
            />
          </Label>
        </React.Fragment>
      ),
    },
    {
      title: 'With suffix',
      render: () => (
        <React.Fragment>
          <Label text="Text input field">
            <TextInput onChange={() => {}} suffix="px" value="32" />
          </Label>
          <Label text="Text input field">
            <TextInput
              onChange={() => {}}
              suffix="px"
              size="large"
              value="32"
            />
          </Label>
        </React.Fragment>
      ),
    },
    {
      title: 'With prefix and suffix',
      render: () => (
        <React.Fragment>
          <Label text="Text input field">
            <TextInput
              onChange={() => {}}
              prefix="$"
              suffix="USD"
              value="1,000.00"
            />
          </Label>
          <Label text="Text input field">
            <TextInput
              onChange={() => {}}
              prefix="$"
              suffix="USD"
              size="large"
              value="1,000.00"
            />
          </Label>
        </React.Fragment>
      ),
    },
  ],
};
