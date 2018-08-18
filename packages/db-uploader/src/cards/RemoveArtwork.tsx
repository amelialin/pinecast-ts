import * as React from 'react';

import Button, {ButtonGroup} from '@pinecast/common/Button';
import Card from '@pinecast/common/Card';
import {gettext} from '@pinecast/i18n';

import Trash from '../icons/trash';

export default ({
  onAccept,
  onCancel,
}: {
  onAccept: () => void;
  onCancel: () => void;
}) => (
  <Card whiteBack style={{textAlign: 'center'}}>
    <Trash width={44} height={46} style={{margin: '0 auto'}} />
    <b style={{display: 'block', marginBottom: '0.25em'}}>
      {gettext('Remove episode artwork?')}
    </b>
    <span style={{display: 'block', marginBottom: '0.75em'}}>
      {gettext(
        'Removing artwork will revert to the podcast cover art on your feed podcast website. To change artwork in podcast apps, you must upload a new audio file.',
      )}
    </span>
    <ButtonGroup>
      <Button onClick={onAccept} $isPrimary>
        {gettext('Remove artwork')}
      </Button>
      <Button onClick={onCancel} style={{marginRight: 0}}>
        {gettext('Cancel')}
      </Button>
    </ButtonGroup>
  </Card>
);
