import {actionReducer} from '../actions';
import {actionHandler} from './util';

export interface ReducerType {
  readonly saving: boolean;
  readonly error: string | null;
}

export const initialState: ReducerType = {
  saving: false,
  error: null,
};

export default actionHandler<ReducerType>({
  saving: actionReducer<{saving: boolean; error: string | null}>(
    'save.setStatus',
    (state, action) => action.payload.saving,
  ),
  error: actionReducer<{saving: boolean; error: string | null}>(
    'save.setStatus',
    (state, action) => action.payload.error,
  ),
});
