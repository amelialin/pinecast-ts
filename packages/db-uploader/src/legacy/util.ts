let inst = 0;
export function getInstance(): string {
  inst += 1;
  return inst.toString(36);
}

export function guardCallback<T>(
  component: {state: {instance: string}},
  promise: Promise<T>,
): Promise<T> {
  const origInstance = component.state.instance;
  return new Promise((resolve, reject) => {
    promise.then(
      val => {
        if (component.state.instance !== origInstance) {
          return;
        }
        resolve(val);
      },
      err => {
        if (component.state.instance !== origInstance) {
          return;
        }
        reject(err);
      },
    );
  });
}
