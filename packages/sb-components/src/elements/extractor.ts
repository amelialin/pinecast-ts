export function extractProps(
  item: Object,
  props?: {[key: string]: Array<string>},
): {[prop: string]: Object} | null {
  if (!props) {
    return null;
  }
  return Object.entries(props).reduce(
    (acc, [key, val]) => {
      acc[key] = extractPath(item, val);
      return acc;
    },
    {} as {[key: string]: any},
  );
}

export function extractPath(
  item: any,
  path: Array<string>,
): string | number | null {
  let x = item;
  for (const segment of path) {
    x = x[segment];
    if (typeof x === 'undefined') {
      return null;
    }
  }
  return x;
}
