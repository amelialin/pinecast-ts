import {ItemSourceContext} from '../itemSourceContext';

export default function renderN<T>(
  consume: number,
  itemSource: ItemSourceContext<T>,
  renderer: (item: T, i: number) => JSX.Element,
): Array<JSX.Element> {
  const output: Array<JSX.Element> = [];
  if (consume === -1) {
    consume = Infinity;
  }
  for (let i = 0; i < consume; i += 1) {
    if (!itemSource.hasNextItem()) {
      break;
    }
    const {value: item, done} = itemSource.getItem();
    if (done) {
      break;
    }
    if (!item) {
      i -= 1;
      continue;
    }
    output.push(renderer(item, i));
  }
  return output;
}
