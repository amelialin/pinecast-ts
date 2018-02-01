import {actionFactory} from '../actions';
import {ReducerType} from '../reducers/preview';

export const changePath = actionFactory<ReducerType['path']>(
  'preview.changePath',
);
export const refresh = actionFactory<ReducerType['refreshIncrement']>(
  'preview.refresh',
);
