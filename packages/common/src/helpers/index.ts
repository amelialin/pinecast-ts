export {default as compose} from './compose';

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

export function nullThrows<T>(val: T | null | undefined): T {
  if (val == null) {
    throw new Error('unreachable');
  }
  return val;
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
  for (let key of leftKeys) {
    if (!rightKeys.includes(key)) {
      return false;
    }
    if ((left as any)[key] !== (right as any)[key]) {
      return false;
    }
  }
  return true;
}

export function url(
  strings: TemplateStringsArray,
  ...bits: Array<string | number | null>
): string {
  return strings
    .map((s, i) => {
      if (i) {
        return encodeURIComponent((bits[i - 1] || '').toString()) + s;
      }
      return s;
    })
    .join('');
}
