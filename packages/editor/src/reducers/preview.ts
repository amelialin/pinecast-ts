import {actionReducer} from '../actions';
import {actionHandler} from './util';

export interface ReducerType {
  readonly path: string;

  // readonly data: {
  //     readonly site: Object | null,
  //     readonly episode: {[episodeId: string]: Object},
  //     readonly episodes: {[page: number]: Object},
  // },
}

export const initialState: ReducerType = {
  path: '/',
};

export default actionHandler<ReducerType>({
  path: actionReducer<ReducerType['path']>(
    'preview.changePath',
    (state, action) => action.payload,
  ),
});
