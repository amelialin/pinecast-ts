import {actionReducer} from '../actions';
import {actionHandler} from './util';

export interface ReducerType {
  readonly path: string;
  readonly refreshIncrement: number;

  // readonly data: {
  //     readonly site: Object | null,
  //     readonly episode: {[episodeId: string]: Object},
  //     readonly episodes: {[page: number]: Object},
  // },
}

export const initialState: ReducerType = {
  path: '/',
  refreshIncrement: 0,
};

export default actionHandler<ReducerType>({
  refreshIncrement: actionReducer<ReducerType['refreshIncrement']>(
    'preview.refresh',
    state => state + 1,
  ),
  path: actionReducer<ReducerType['path']>(
    'preview.changePath',
    (state, action) => action.payload,
  ),
});
