import * as React from 'react';

import Label from '@pinecast/common/Label';
import TextInput from '@pinecast/common/TextInput';

export default {
  name: 'Label',
  examples: [
    {
      title: 'Basic use',
      render: () => (
        <Label text="Label with a text input">
          <TextInput onChange={() => {}} value="" />
        </Label>
      ),
    },
    {
      title: 'Basic use, sub text',
      render: () => (
        <Label text="Label with a text input" subText="This text goes below">
          <TextInput onChange={() => {}} value="" />
        </Label>
      ),
    },
    {
      title: 'One line',
      render: () => (
        <Label $oneLine text="Label with a text input">
          <TextInput onChange={() => {}} value="" />
        </Label>
      ),
    },
    {
      title: 'Label style',
      render: () => (
        <Label labelStyle={{color: 'green'}} text="Label with a text input">
          <TextInput onChange={() => {}} value="" />
        </Label>
      ),
    },
    {
      title: 'With an error',
      render: () => (
        <Label
          text="Label with a text input"
          error="Oh no, you messed up this time."
        >
          <TextInput invalid onChange={() => {}} value="" />
        </Label>
      ),
    },
  ],
};