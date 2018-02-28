import {merge, themes} from '@pinecast/sb-presets';

import {ReducerType} from '../reducer';

export const mergedTheme = (state: ReducerType) =>
  merge(themes[state.theme.$type], state.theme);
