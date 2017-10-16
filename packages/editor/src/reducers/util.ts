import {Action} from '../actions';

type Reducer<T> = (state: T, action: Action<any>) => T;

export function reduceReducers<T>(...reducers: Array<Reducer<T>>): Reducer<T> {
  return (state: T, action: Action<any>) =>
    reducers.reduce((acc, cur) => cur(acc, action), state);
}

export function actionHandler<T>(handlers: {
  [key: string]: Reducer<any>;
}): Reducer<T> {
  return (state: T, action: Action<any>): T =>
    Object.entries(handlers)
      .map(([key, val]): Reducer<T> => {
        return (state: T, action: Action<T>): T => {
          state[key] = val(state[key], action);
          return state;
        };
      })
      .reduce((acc, cur) => cur(acc, action), {...(state as any)});
}
