import {actionFactory} from '../actions';
import {ReducerType} from '../reducer';

export const changeChromePage = actionFactory<ReducerType['page']>(
  'switchPage',
);
