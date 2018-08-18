import * as React from 'react';

import EmptyState from '@pinecast/common/EmptyState';

export default {
  name: 'Empty state',
  examples: [
    {
      title: 'Basic use',
      render: () => (
        <EmptyState
          copy="We didn't find anything that matches your search."
          title="There's nothing here."
        />
      ),
    },
    {
      title: 'No copy',
      render: () => (
        <EmptyState title="You haven't selected any categories yet." />
      ),
    },
    {
      title: 'Action',
      render: () => (
        <EmptyState
          actionLabel="Refresh"
          copy="0 of 100,000 records matched your query."
          onAction={() => {}}
          title="No results found."
        />
      ),
    },
  ],
};
