import * as React from 'react';

import Button, {ButtonGroup} from '@pinecast/common/Button';
import Dialog from '@pinecast/common/Dialog';
import {ModalOpener} from '@pinecast/common/ModalLayer';
import TextInput from '@pinecast/common/TextInput';

type Props = {
  coupon: string | null;
  onChangeCoupon: (coupon: string | null) => void;
};

const CouponModal = (props: Props) => (
  <ModalOpener
    renderModal={({handleClose}) => (
      <Dialog
        actions={
          <ButtonGroup>
            <Button
              onClick={() => {
                handleClose();
                props.onChangeCoupon(null);
              }}
            >
              Cancel
            </Button>
            <Button $isPrimary onClick={handleClose}>
              Set
            </Button>
          </ButtonGroup>
        }
        title="Add a coupon"
      >
        <TextInput
          onChange={props.onChangeCoupon}
          placeholder="Coupon code"
          value={props.coupon || ''}
        />
      </Dialog>
    )}
  >
    {({handleOpen}) => (
      <Button onClick={handleOpen} size="small">
        {props.coupon ? `Coupon: ${props.coupon}` : 'I have a coupon'}
      </Button>
    )}
  </ModalOpener>
);

export default CouponModal;
