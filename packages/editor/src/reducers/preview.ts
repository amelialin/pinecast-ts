import {Action, actionReducer} from '../actions';
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

  // data: {
  //     site: null,
  //     episode: {},
  //     episodes: {},
  // },
};

export default actionHandler<ReducerType>({
  path: actionReducer<ReducerType['path']>(
    'preview.changePath',
    (state, action) => action.payload,
  ),

  // data: actionHandler<ReducerType['data']>({
  //     site: actionReducer<ReducerType['data']['site']>('preview.data.setSite', (state, action) => action.payload),
  //     episode: actionReducer<ReducerType['data']['episode']>('preview.data.setEpisode', (state, {payload: {id, value}}) => ({...state, [id]: value})),
  //     episodes: actionReducer<ReducerType['data']['episodes']>('preview.data.setEpisodes', (state, {payload: {page, value}}) => ({...state, [page]: value})),
  // }),
});
