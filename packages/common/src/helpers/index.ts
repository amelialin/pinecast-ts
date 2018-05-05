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

export function suppose<T>(value: T | null | undefined): T {
  if (value == null) {
    throw new Error('Value was supposed to never be null.');
  }
  return value;
}
