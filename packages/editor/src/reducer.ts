import {applyMiddleware, compose, createStore} from 'redux';
import thunk from 'redux-thunk';

import {actionReducer} from './actions';
import previewReducer, {
  initialState as previewInitialState,
  ReducerType as PreviewReducerType,
} from './reducers/preview';
import saveReducer, {
  initialState as saveInitialState,
  ReducerType as SaveReducerType,
} from './reducers/save';
import themeReducer, {
  initialState as themeInitialState,
  ReducerType as ThemeReducerType,
} from './reducers/theme';

export interface ReducerType {
  readonly csrf: string | null;
  readonly slug: string | null;
  readonly needsSave: boolean;

  readonly page: 'presets' | 'colors' | 'typography' | 'components';
  readonly preview: PreviewReducerType;
  readonly save: SaveReducerType;
  readonly theme: ThemeReducerType;
}

const initialState: ReducerType = {
  csrf: null,
  slug: null,
  needsSave: false,

  page: 'presets',
  preview: previewInitialState,
  save: saveInitialState,
  theme: themeInitialState,
};

type InitAction = {type: 'init'; payload: {csrf: string; slug: string}};

function reducer(state: ReducerType = initialState, action): ReducerType {
  if (!state) {
    return initialState;
  }

  const themeState = themeReducer(state.theme, action);
  const needsSave =
    action.type === 'clearSave'
      ? false
      : state.needsSave || themeState !== state.theme;

  return {
    ...state,
    csrf:
      action.type === 'init' ? (action as InitAction).payload.csrf : state.csrf,
    slug:
      action.type === 'init' ? (action as InitAction).payload.slug : state.slug,
    needsSave,

    page: actionReducer<ReducerType['page']>(
      'switchPage',
      (state, action) => action.payload,
    )(state.page, action),
    preview: previewReducer(state.preview, action),
    save: saveReducer(state.save, action),
    theme: themeState,
  };
}

// Boring middleware stuff
declare var __REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
const composeEnhancers =
  typeof __REDUX_DEVTOOLS_EXTENSION_COMPOSE__ !== 'undefined'
    ? __REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;
export const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(thunk)),
);
