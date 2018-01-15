import _themes from './themes';

export const themes = _themes;

export const metadata = {
  clarity: {name: 'Clarity'},
  panther: {name: 'Panther'},
  podcasty: {name: 'Podcasty'},
  smooth: {name: 'Smooth'},
  zen: {name: 'Zen'},
};

export function merge(base, extension, ...extensions) {
  if (extensions.length) {
    return extensions.reduce(
      (acc, cur) => merge(acc, cur),
      merge(base, extension),
    );
  }
  if (!base) {
    return extension;
  }
  if (base === extension) {
    return base;
  }
  const result = {...base};
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
