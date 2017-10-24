import {Action, actionReducer} from '../actions';
import {actionHandler, reduceReducers} from './util';

// TODO: move some of this to a types file?
export type FontKeys = 'logo' | 'headings' | 'body';
export type FontHashType = {[key in FontKeys]: string};
export interface PartialFontHashType {
  readonly logo?: string;
  readonly headings?: string;
  readonly body?: string;
}
export interface ReducerType {
  readonly $type: string;
  readonly colors?: {[key: string]: string};
  readonly fonts?: PartialFontHashType;
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
      (state = undefined, {payload}: Action<PartialFontHashType>) => ({
        ...state,
        ...payload,
      }),
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
