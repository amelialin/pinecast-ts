const uppercasePattern = /[A-Z]/g;
const msPattern = /^ms-/;
const cache: {[prop: string]: string} = {};

export default function hyphenateStyleName(prop: string): string {
  return prop in cache
    ? cache[prop]
    : (cache[prop] = prop
        .replace(uppercasePattern, '-$&')
        .toLowerCase()
        .replace(msPattern, '-ms-'));
}
