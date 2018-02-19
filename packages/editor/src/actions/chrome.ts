import {actionFactory} from '../actions';
import {ReducerType} from '../reducer';

export const changeChromePage = actionFactory<ReducerType['page']>(
  'switchPage',
);
export const changeThemePage = actionFactory<ReducerType['themePage']>(
  'switchThemePage',
);
export const changeLayoutPage = actionFactory<ReducerType['layoutPage']>(
  'switchLayoutPage',
);
