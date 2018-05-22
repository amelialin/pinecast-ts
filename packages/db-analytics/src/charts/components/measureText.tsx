import {DEFAULT_FONT} from '@pinecast/common/constants';
import {nullThrows} from '@pinecast/common/helpers';

const c = document.createElement('canvas');
const ctx: CanvasRenderingContext2D = nullThrows(c.getContext('2d'));
if (!ctx) {
  throw new Error('Browser is too old.');
}

export default function measureText(
  text: string,
  font = `14px ${DEFAULT_FONT}, sans-serif`,
): number {
  ctx.font = font;
  return ctx.measureText(text).width;
}
