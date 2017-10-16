import {actionFactory} from '../actions';
import {ReducerType} from '../reducers/preview';

export const changePath = actionFactory<ReducerType['path']>(
  'preview.changePath',
);
