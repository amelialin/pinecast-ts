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
  readonly wasLoaded: boolean;
  readonly needsSave: boolean;

  readonly page: 'theme' | 'links' | 'pages' | 'assets' | 'settings';
  readonly themePage:
    | 'presets'
    | 'colors'
    | 'typography'
    | 'page'
    | 'embedPlayer'
    | 'buttons';
  readonly preview: PreviewReducerType;
  readonly save: SaveReducerType;
  readonly theme: ThemeReducerType;
}

const initialState: ReducerType = {
  csrf: null,
  slug: null,
  wasLoaded: false,
  needsSave: false,

  page: 'theme',
  themePage: 'presets',
  preview: previewInitialState,
  save: saveInitialState,
  theme: themeInitialState,
};

function reducer(state: ReducerType = initialState, action): ReducerType {
  if (!state) {
    return initialState;
  }

  const themeState = themeReducer(
    action.type === 'init' ? action.payload.theme || state.theme : state.theme,
    action,
  );
  const needsSave =
    action.type === 'clearSave' || action.type === 'init'
      ? false
      : state.needsSave || themeState !== state.theme;

  return {
    ...state,
    csrf: action.type === 'init' ? action.payload.csrf : state.csrf,
    slug: action.type === 'init' ? action.payload.slug : state.slug,
    wasLoaded: action.type === 'init.loaded' ? true : state.wasLoaded,
    needsSave,

    page: actionReducer<ReducerType['page']>(
      'switchPage',
      (state, action) => action.payload,
    )(state.page, action),
    themePage: actionReducer<ReducerType['themePage']>(
      'switchThemePage',
      (state, action) => action.payload,
    )(state.themePage, action),
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
