import {Action, actionReducer} from '../actions';
import {actionHandler, reduceReducers} from './util';

export interface ReducerType {
  readonly $type: string;
  readonly colors?: {[key: string]: string};
  readonly fonts?: {
    readonly logo?: string;
    readonly headings?: string;
    readonly body?: string;
  };
}

export const initialState: ReducerType = {
  $type: 'panther',
};

export default reduceReducers(
  (state: ReducerType, action: Action<string>) => {
    if (action.type === 'theme.changePreset') {
      return {$type: action.payload};
    }
    return state;
  },
  actionHandler<ReducerType>({
    colors: actionReducer<ReducerType['colors']>(
      'theme.changeColor',
      (state = {}, {payload}: Action<{[colorName: string]: string}>) => ({
        ...state,
        ...payload,
      }),
    ),
    fonts: actionReducer<ReducerType['fonts']>(
      'theme.changeFont',
      (
        state = {},
        {payload}: Action<{logo?: string; headings?: string; body?: string}>,
      ) => ({...state, ...payload}),
    ),
  }),
  (state: ReducerType) => {
    Object.keys(state).forEach(key => {
      if (state[key] === undefined) {
        delete state[key];
      }
    });
    return state;
  },
);
