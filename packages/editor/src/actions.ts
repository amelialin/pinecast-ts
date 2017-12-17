export interface Action<T> {
  type: string;
  payload: T;
}

export function actionReducer<T>(
  listenForType: string,
  reducer: (state: T, action: Action<any>) => T,
): ((state: T, action: Action<any>) => T) {
  return (state: T, action: Action<any>): T => {
    if (action.type === listenForType) {
      const result = reducer(state, action);
      if (result === state) {
        return state;
      }

      const typeofResult = typeof result;

      if (
        typeofResult !== typeof state ||
        ((result && !state) || (state && !result))
      ) {
        return result;
      }

      const resultIsArray = Array.isArray(result);
      if (typeofResult === 'object' && !resultIsArray) {
        const newKeys = Object.keys(result);

        if (
          newKeys.length === Object.keys(state).length &&
          newKeys.every(key => state[key] === result[key])
        ) {
          return state;
        }
      } else if (resultIsArray && Array.isArray(state)) {
        if (((result as any) as Array<any>).every((x, i) => x === state[i])) {
          return state;
        }
      }

      return result;
    }
    return state;
  };
}

export function actionFactory<T>(name: string): ((payload: T) => Action<T>) {
  return payload => ({
    type: name,
    payload: payload,
  });
}
