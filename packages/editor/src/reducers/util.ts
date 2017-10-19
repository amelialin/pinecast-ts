import {Action} from '../actions';

type Reducer<T> = (state: T, action: Action<any>) => T;

export function reduceReducers<T>(...reducers: Array<Reducer<T>>): Reducer<T> {
  return (state: T, action: Action<any>) =>
    reducers.reduce((acc, cur) => cur(acc, action), state);
}

export function actionHandler<T>(handlers: {
  [key: string]: Reducer<any>;
}): Reducer<T> {
  return (state: T, action: Action<any>): T => {
    let updated = false;
    return Object.entries(handlers)
      .map(([key, val]): Reducer<T> => {
        return (state: T, action: Action<T>): T => {
          const recomputed = val(state[key], action);
          if (recomputed === state[key]) {
            return state;
          }
          if (!updated) {
            state = Object.assign({}, state);
          }
          state[key] = recomputed;
          updated = true;
          return state;
        };
      })
      .reduce((acc, cur) => cur(acc, action), state);
  };
}
