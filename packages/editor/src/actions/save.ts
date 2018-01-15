import {ThunkAction} from 'redux-thunk';

import {Action, actionFactory} from '../actions';
import {ReducerType} from '../reducers/save';
import {ReducerType as RootReducerType} from '../reducer';
import req from '../data/xhr';

export type SaveActionPayload = {saving: boolean; error: string | null};

export const setSaveState = actionFactory<SaveActionPayload>('save.setStatus');

export const doSave: ThunkAction<void, RootReducerType, void> = () => async (
  dispatch,
  getState,
) => {
  await dispatch(setSaveState({saving: true, error: null}));
  const {csrf, slug, theme} = getState();
  let response;
  try {
    response = await req({
      body: JSON.stringify(theme),
      headers: {'X-CSRFToken': csrf},
      method: 'POST',
      url: `/sites/site_builder/editor/save/theme/${encodeURIComponent(slug)}`,
    });
  } catch (e) {
    return dispatch(
      setSaveState({saving: false, error: 'Error while saving to Pinecast'}),
    );
  }
  let parsed;
  try {
    parsed = JSON.parse(response);
  } catch (e) {
    return dispatch(
      setSaveState({saving: false, error: 'Could not parse server response'}),
    );
  }

  const {success} = parsed;
  if (!success) {
    return dispatch(
      setSaveState({saving: false, error: 'Submitted theme is not valid'}),
    );
  }

  await dispatch({type: 'clearSave'});
  return dispatch(setSaveState({saving: false, error: null}));
};
