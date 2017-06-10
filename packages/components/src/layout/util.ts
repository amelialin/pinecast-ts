import {ItemSourceContext} from '../itemSourceContext';


export default function renderN<T>(consume: number, itemSource: ItemSourceContext<T>, renderer: (item: T) => JSX.Element) {
    const output = [];
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
        output.push(renderer(item));
    }
    return output;
};
