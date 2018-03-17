import {ComponentContext} from './componentContext';

export function formatColor(
  color: string | null | undefined,
  ctx: ComponentContext,
): string | null {
  if (!color) {
    return null;
  }
  if (color[0] === '#') {
    return color;
  }
  return ctx.colors[color] || color;
}

export function formatInlineColor(
  colorString: string | null | undefined,
  ctx: ComponentContext,
): string | null {
  if (!colorString) {
    return null;
  }
  let i = 0;
  let replaced = colorString;
  while (true) {
    const x: null | RegExpExecArray = /var\(--color-([\w\-]+)\)/i.exec(
      colorString.slice(i),
    );
    if (!x) {
      break;
    }
    i += x.index + x[1].length + 1;
    replaced = replaced.replace(x[0], formatColor(x[1], ctx) || '');
  }
  return replaced;
}
