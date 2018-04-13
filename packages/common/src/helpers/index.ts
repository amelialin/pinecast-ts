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
