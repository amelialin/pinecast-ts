import {applyMiddleware, compose, createStore} from 'redux';
import thunk from 'redux-thunk';

import {actionReducer} from './actions';
import previewReducer, {
  initialState as previewInitialState,
  ReducerType as PreviewReducerType,
} from './reducers/preview';

export interface ReducerType {
  readonly page: 'presets' | 'colors' | 'typography';
  readonly preview: PreviewReducerType;
}

const initialState: ReducerType = {
  page: 'presets',
  preview: previewInitialState,
};

const reducer = (state: ReducerType = initialState, action): ReducerType =>
  state
    ? {
        ...state,
        page: actionReducer<ReducerType['page']>(
          'switchPage',
          (state, action) => action.payload,
        )(state.page, action),
        preview: previewReducer(state.preview, action),
      }
    : initialState;

declare var __REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
const composeEnhancers =
  typeof __REDUX_DEVTOOLS_EXTENSION_COMPOSE__ !== 'undefined'
    ? __REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;
export const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(thunk)),
);
