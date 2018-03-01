export default function merge(base, extension, ...extensions) {
  if (extensions.length) {
    return extensions.reduce(
      (acc, cur) => merge(acc, cur),
      merge(base, extension),
    );
  }
  if (!base) {
    return {...extension};
  }
  const result = {...base};
  if (!extension || base === extension) {
    return result;
  }
  Object.entries(extension).forEach(([key, val]) => {
    if (
      !(key in result) ||
      typeof val !== 'object' ||
      typeof result[key] !== 'object' ||
      Array.isArray(result[key]) ||
      Array.isArray(val)
    ) {
      result[key] = val;
      return;
    }

    result[key] = merge(result[key], val);
  });
  return result;
}
