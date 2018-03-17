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
export const changeButtonStyle = actionFactory<React.CSSProperties>(
  'theme.changeButtons',
);
export const changeEmbedWidget = actionFactory<EmbedWidgetThemes>(
  'theme.changeEmbedWidget',
);
export const changePageStyle = actionFactory<Partial<primitives.PageStyle>>(
  'theme.changePageStyle',
);
export const changePageOptions = actionFactory<ReducerType['options']>(
  'theme.changePageOptions',
);

export const setHeaderLayouts = actionFactory<
  Array<primitives.ComponentLayout>
>('theme.changeLayout.header');
export const setHeroLayouts = actionFactory<Array<primitives.ComponentLayout>>(
  'theme.changeLayout.hero',
);
export const setFooterLayouts = actionFactory<
  Array<primitives.ComponentLayout>
>('theme.changeLayout.footer');
