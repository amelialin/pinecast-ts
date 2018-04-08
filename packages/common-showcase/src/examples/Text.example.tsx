import * as React from 'react';

import {
  DashboardTitle,
  HelpText,
  InlineCode,
  LegalP,
  P,
  TextPill,
} from '@pinecast/common/Text';

export default {
  name: 'Text',
  examples: [
    {
      title: 'Dashboard title',
      render: () => (
        <DashboardTitle>
          The quick brown fox jumps over the lazy dog.
        </DashboardTitle>
      ),
    },
    {
      title: 'Paragraph',
      render: () => <P>The quick brown fox jumps over the lazy dog.</P>,
    },
    {
      title: 'Legal paragraph',
      render: () => (
        <LegalP>The quick brown fox jumps over the lazy dog.</LegalP>
      ),
    },
    {
      title: 'Text pill',
      render: () => (
        <TextPill>The quick brown fox jumps over the lazy dog.</TextPill>
      ),
    },
    {
      title: 'Help text',
      render: () => (
        <HelpText>The quick brown fox jumps over the lazy dog.</HelpText>
      ),
    },
    {
      title: 'Inline code',
      render: () => (
        <InlineCode>The quick brown fox jumps over the lazy dog.</InlineCode>
      ),
    },
  ],
};
