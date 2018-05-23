const E10 = Math.sqrt(50);
const E5 = Math.sqrt(10);
const E2 = Math.sqrt(2);

function getTickIncrement(min: number, max: number): number {
  if (min === max) {
    return 0;
  }
  const step = (max - min) / 5;
  const power = Math.floor(Math.log(step) / Math.LN10);
  const error = step / Math.pow(10, power);
  return power >= 0
    ? (error >= E10 ? 10 : error >= E5 ? 5 : error >= E2 ? 2 : 1) *
        Math.pow(10, power)
    : -Math.pow(10, -power) /
        (error >= E10 ? 10 : error >= E5 ? 5 : error >= E2 ? 2 : 1);
}
export function getTickValues(min: number, max: number): Array<number> {
  const step = getTickIncrement(min, max);
  if (step > 0) {
    const start = Math.ceil(min / step);
    const stop = Math.floor(max / step);
    return [...new Array(Math.ceil(stop - start + 1))].map(
      (_, i) => (start + i) * step,
    );
  } else {
    const start = Math.floor(min * step);
    const stop = Math.ceil(max * step);
    return [...new Array(Math.ceil(start - stop + 1))].map(
      (_, i) => (start - i) * step,
    );
  }
}
