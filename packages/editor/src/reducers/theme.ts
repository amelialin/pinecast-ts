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
  readonly page?: primitives.PageStyle;
}
export interface PartialOptionsType {
  readonly embedtheme?: EmbedWidgetThemes;
  readonly fixedWidthMax?: string | null;
  readonly rootFlexibleHeight?: boolean;
}
export interface ReducerType {
  readonly $type: string;
  readonly colors?: {[key: string]: string};
  readonly fonts?: PartialFontHashType;
  readonly styling?: PartialStylingType;
  readonly options?: PartialOptionsType;
}

export const initialState: ReducerType = {
  $type: 'clarity',
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
        'theme.changePageStyle',
        (state = undefined, {payload}: Action<primitives.PageStyle>) => ({
          ...state,
          page: payload,
        }),
      ),
    ),
    options: reduceReducers(
      actionReducer<ReducerType['options']>(
        'theme.changeEmbedWidget',
        (state = undefined, {payload}: Action<EmbedWidgetThemes>) => {
          if (payload === 'minimal') {
            const out = {...state};
            delete out['embedTheme'];
            return out;
          } else {
            return {...state, embedTheme: payload};
          }
        },
      ),
      actionReducer<ReducerType['options']>(
        'theme.changePageOptions',
        (state = undefined, {payload}: Action<any>) => ({
          ...state,
          ...payload,
        }),
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
