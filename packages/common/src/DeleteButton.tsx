import * as React from 'react';

import styled, {CSS} from '@pinecast/styles';
import {defineMessages, I18n, Message} from '@pinecast/i18n';

const messages = defineMessages({
  delete: {
    id: 'common.DeleteButton.delete',
    description: 'Delete button label',
    defaultMessage: 'Delete',
  },
});

const DeleteButton_ = styled(
  'button',
  ({$idleColor = '#c6caca'}: {$idleColor?: string}) => ({
    backgroundColor: 'transparent',
    border: 0,
    borderRadius: 0,
    cursor: 'pointer',
    display: 'inline-flex',
    height: 20,
    marginTop: -3,
    padding: 0,
    position: 'relative',
    verticalAlign: 'middle',
    width: 20,

    ':before': {
      backgroundColor: $idleColor,
      bottom: '25%',
      content: '""',
      display: 'block',
      height: 2,
      left: '25%',
      margin: 'auto',
      position: 'absolute',
      right: '25%',
      top: '25%',
      transform: 'rotate(45deg)',
      transformOrigin: 'center',
      transition: 'background-color 0.25s',
    },
    ':after': {
      backgroundColor: $idleColor,
      bottom: '25%',
      content: '""',
      display: 'block',
      height: 2,
      left: '25%',
      margin: 'auto',
      position: 'absolute',
      right: '25%',
      top: '25%',
      transform: 'rotate(-45deg)',
      transformOrigin: 'center',
      transition: 'background-color 0.25s',
    },
    ':hover:before': {
      backgroundColor: '#bf1d1d',
    },
    ':hover:after': {
      backgroundColor: '#bf1d1d',
    },
  }),
  {type: 'button'},
);

const DeleteButton = ({
  idleColor,
  label,
  onClick,
  style,
}: {
  idleColor?: string;
  label?: Message;
  onClick: () => void;
  style?: CSS;
}) => (
  <I18n>
    {({intl}) => (
      <DeleteButton_
        $idleColor={idleColor}
        aria-label={intl.formatMessage(label || messages.delete)}
        onClick={e => {
          e.preventDefault();
          onClick();
        }}
        style={style}
        title={intl.formatMessage(label || messages.delete)}
      />
    )}
  </I18n>
);

export default DeleteButton;
