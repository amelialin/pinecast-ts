import * as React from 'react';

import {ButtonGroup, default as Button} from '@pinecast/common/Button';
import {default as Dialog} from '@pinecast/common/Dialog';
import {default as ModalLayer} from '@pinecast/common/ModalLayer';

import Toggler from '../helpers/Toggler';

export default {
  name: 'Dialog',
  examples: [
    {
      title: 'Basic use',
      render: () => (
        <Dialog title="Dialog title">
          This is the contents of the dialog.
        </Dialog>
      ),
    },
    {
      title: 'Widths',
      render: () => (
        <div>
          <Dialog size="small" title="Dialog title">
            Small
          </Dialog>
          <Dialog size="medium" title="Dialog title">
            Medium
          </Dialog>
          <Dialog size="large" title="Dialog title">
            Large
          </Dialog>
        </div>
      ),
    },
    {
      title: 'Actions',
      render: () => (
        <Dialog
          actions={
            <ButtonGroup>
              <Button>Cancel</Button>
              <Button $isPrimary>Pretty good</Button>
            </ButtonGroup>
          }
          title="Dialog title"
        >
          How's it going?
        </Dialog>
      ),
    },
    {
      title: 'With ModalLayer',
      render: () => (
        <Toggler>
          {({toggle, open}) => (
            <div>
              <Button onClick={toggle}>Toggle dialog</Button>
              {open && (
                <ModalLayer onClose={() => toggle(false)} open={open}>
                  <Dialog title="Dialog title">
                    This is the contents of the dialog. Press ESC to close.
                  </Dialog>
                </ModalLayer>
              )}
            </div>
          )}
        </Toggler>
      ),
    },
  ],
};
