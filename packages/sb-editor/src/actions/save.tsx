import {Action} from 'redux';
import {Dispatch} from 'react-redux';
import * as React from 'react';
import {ThunkAction} from 'redux-thunk';

import {defineMessages, FormattedMessage} from '@pinecast/i18n';
import req from '@pinecast/xhr';
import {url} from '@pinecast/common/helpers';

import {actionFactory} from '../actions';
import {ReducerType as RootReducerType} from '../reducer';

const messages = defineMessages({
  errorWhileSaving: {
    id: 'sb-editor.actions.save.error.contacting',
    description: 'Error message when saving theme to Pinecast',
    defaultMessage: 'Error while saving to Pinecast',
  },
  invalidTheme: {
    id: 'sb-editor.actions.save.error.invalid',
    description: 'Error message when theme is invalid',
    defaultMessage: 'Submitted theme is not valid',
  },
});

export type SaveActionPayload = {
  saving: boolean;
  error: React.ReactNode | null;
};

export const setSaveState = actionFactory<SaveActionPayload>('save.setStatus');

export const doSave: ThunkAction<
  void,
  RootReducerType,
  void,
  Action
> = () => async (dispatch: Dispatch<any>, getState: () => RootReducerType) => {
  await dispatch(setSaveState({saving: true, error: null}));
  const {slug, theme} = getState();
  let response;
  try {
    response = await req({
      body: JSON.stringify(theme),
      method: 'POST',
      url: url`/sites/site_builder/editor/save/theme/${slug || ''}`,
    });
  } catch (e) {
    return dispatch(
      setSaveState({
        saving: false,
        error: <FormattedMessage {...messages.errorWhileSaving} />,
      }),
    );
  }
  let parsed;
  try {
    parsed = JSON.parse(response);
  } catch (e) {
    return dispatch(
      setSaveState({
        saving: false,
        error: <FormattedMessage {...messages.errorWhileSaving} />,
      }),
    );
  }

  const {success} = parsed;
  if (!success) {
    return dispatch(
      setSaveState({
        saving: false,
        error: <FormattedMessage {...messages.invalidTheme} />,
      }),
    );
  }

  await dispatch({type: 'clearSave'});
  return dispatch(setSaveState({saving: false, error: null}));
};
