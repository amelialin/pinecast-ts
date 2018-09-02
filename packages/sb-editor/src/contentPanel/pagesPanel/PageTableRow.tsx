import * as React from 'react';

import {MeatballIconMenu} from '@pinecast/common/ContextMenu';
import {Page} from './types';
import {TableBodyCell} from '@pinecast/common/Table';

const PageTableRow = ({
  onDelete,
  onEdit,
  onNavigate,
  page,
}: {
  onDelete: (slug: string) => void;
  onEdit: (slug: string) => void;
  onNavigate: (path: string) => void;
  page: Page;
}) => (
  <tr>
    <TableBodyCell $wrapAt={150} title={page.title}>
      {page.title}
    </TableBodyCell>
    <TableBodyCell $wrapAt={100} title={page.slug}>
      {page.slug}
    </TableBodyCell>
    <TableBodyCell $wrapAt={100}>
      {page.page_type === 'markdown' && 'Markdown'}
      {page.page_type === 'hosts' && 'Hosts'}
      {page.page_type === 'contact' && 'Contact'}
    </TableBodyCell>
    <TableBodyCell style={{width: 30}}>
      <MeatballIconMenu
        onSelect={slug => {
          switch (slug) {
            case 'edit':
              onEdit(page.slug);
              return;
            case 'visit':
              onNavigate(`/${encodeURIComponent(page.slug)}`);
              return;
            case 'delete':
              onDelete(page.slug);
              return;
          }
        }}
        options={[
          {name: 'Edit…', slug: 'edit'},
          {name: 'Visit', slug: 'visit'},
          {name: 'Delete', slug: 'delete'},
        ]}
      />
    </TableBodyCell>
  </tr>
);

export default PageTableRow;
