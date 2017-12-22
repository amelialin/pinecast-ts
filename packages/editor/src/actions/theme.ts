import {primitives} from '@pinecast/sb-components';

import {actionFactory} from '../actions';
import {EmbedWidgetThemes, ReducerType} from '../reducers/theme';

export const changePreset = actionFactory<ReducerType['$type']>(
  'theme.changePreset',
);
export const changeFont = actionFactory<ReducerType['fonts']>(
  'theme.changeFont',
);
export const changeColor = actionFactory<ReducerType['colors']>(
  'theme.changeColor',
);
export const changeButtonStyle = actionFactory<primitives.ButtonType>(
  'theme.changeButtons',
);
export const changeEmbedWidget = actionFactory<EmbedWidgetThemes>(
  'theme.changeEmbedWidget',
);
export const changePageStyle = actionFactory<primitives.PageStyle>(
  'theme.changePageStyle',
);
