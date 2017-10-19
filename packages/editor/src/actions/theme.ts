import {actionFactory} from '../actions';
import {ReducerType} from '../reducers/theme';

export const changePreset = actionFactory<ReducerType['$type']>(
  'theme.changePreset',
);
export const changeFont = actionFactory<ReducerType['fonts']>(
  'theme.changeFont',
);
export const changeColor = actionFactory<ReducerType['colors']>(
  'theme.changeColor',
);
