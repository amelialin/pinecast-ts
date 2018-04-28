export interface Action<T> {
  type: string;
  payload: T;
}

export function arrayReducer<T>(
  listenForType: string,
): ((state: Array<T>, action: Action<[number, T]>) => Array<T>) {
  return (state: Array<T>, action: Action<[number, T]>) => {
    if (action.type === listenForType) {
      const updated = [...(state || [])];
      updated[action.payload[0]] = action.payload[1];
      return updated;
    }
    return state;
  };
}
export function overrideReducer<T>(
  listenForType: string,
): ((state: T, action: Action<any>) => T) {
  return (state: T, action: Action<any>) => {
    if (action.type === listenForType) {
      return action.payload;
    }
    return state;
  };
}
export function deleteArrayItem<T>(
  listenForType: string,
): ((state: Array<T>, action: Action<any>) => Array<T>) {
  return (state: Array<T>, action: Action<any>) => {
    if (action.type === listenForType) {
      const copy = [...(state || [])];
      copy.splice(action.payload, 1);
      return copy;
    }
    return state;
  };
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
