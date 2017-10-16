export interface Action<T> {
    type: string,
    payload: T,
};

export function actionReducer<T>(listenForType: string, reducer: (state: T, action: Action<any>) => T): ((state: T, action: Action<any>) => T) {
    return (state: T, action: Action<any>): T => {
        if (action.type === listenForType) {
            return reducer(state, action);
        }
        return state;
    };
};

export function actionFactory<T>(name: string): ((payload: T) => Action<T>) {
    return payload => ({
        type: name,
        payload: payload,
    });
};
