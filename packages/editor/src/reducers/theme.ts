import {primitives} from '@pinecast/sb-components';

import {Action, actionReducer} from '../actions';
import {actionHandler, reduceReducers} from './util';

// TODO: move some of this to a types file?
export type EmbedWidgetThemes = 'minimal' | 'thick' | 'slim';
export type FontKeys = 'logo' | 'headings' | 'body';
export type FontHashType = {[key in FontKeys]: string};
export interface PartialFontHashType {
  readonly logo?: string;
  readonly headings?: string;
  readonly body?: string;
}
export interface PartialStylingType {
  readonly buttons?: primitives.ButtonStyle;
  readonly embed?: {theme: EmbedWidgetThemes};
}
export interface ReducerType {
  readonly $type: string;
  readonly colors?: {[key: string]: string};
  readonly fonts?: PartialFontHashType;
  readonly styling?: PartialStylingType;
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
    styling: reduceReducers(
      actionReducer<ReducerType['styling']>(
        'theme.changeButtons',
        (
          state = undefined,
          {payload}: Action<PartialStylingType['buttons']>,
        ) => ({
          ...state,
          buttons: payload,
        }),
      ),
      actionReducer<ReducerType['styling']>(
        'theme.changeEmbedWidget',
        (state = undefined, {payload}: Action<EmbedWidgetThemes>) => {
          if (payload === 'minimal') {
            const out = {...state};
            delete out['embed'];
            return out;
          } else {
            return {...state, embed: {theme: payload}};
          }
        },
      ),
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
