import * as React from 'react';

import Button, {ButtonGroup} from '@pinecast/common/Button';
import DeleteButton from '@pinecast/common/DeleteButton';
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
    <TableBodyCell style={{width: 100}}>
      <ButtonGroup style={{marginTop: -4, verticalAlign: 'middle'}}>
        <Button
          size="small"
          onClick={() => {
            onEdit(page.slug);
          }}
        >
          Edit
        </Button>
        <Button
          size="small"
          onClick={() => {
            onNavigate(`/${encodeURIComponent(page.slug)}`);
          }}
        >
          Visit
        </Button>
      </ButtonGroup>
    </TableBodyCell>
    <TableBodyCell style={{width: 30}}>
      <DeleteButton
        onClick={() => {
          onDelete(page.slug);
        }}
      />
    </TableBodyCell>
  </tr>
);

export default PageTableRow;
