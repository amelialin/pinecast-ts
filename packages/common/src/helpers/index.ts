export function debounce(callback: () => void, timeout: number): (() => void) {
  let timer: null | number = null;
  const firer = () => {
    timer = null;
    callback();
  };
  return () => {
    if (timer !== null) {
      return;
    }
    timer = (setTimeout(firer, timeout) as any) as number;
  };
}

export function memoize<T, U>(funcToMemoize: (arg: T) => U): (arg: T) => U {
  const cache = new Map<T, U>();
  return (arg: T): U => {
    const cached = cache.get(arg);
    if (cached) {
      return cached;
    }
    const fresh = funcToMemoize(arg);
    cache.set(arg, fresh);
    return fresh;
  };
}

export function shallowCompare<T = {[key: string]: any}>(
  left: T,
  right: T,
): boolean {
  const leftKeys = Object.keys(left);
  const rightKeys = Object.keys(right);
  if (leftKeys.length !== rightKeys.length) {
    return false;
  }
  for (let key in leftKeys) {
    if (!(key in rightKeys)) {
      return false;
    }
  }
  return true;
}

export function suppose<T>(value: T | null | undefined): T {
  if (value == null) {
    throw new Error('Value was supposed to never be null.');
  }
  return value;
}
