export function extractProps(item: Object, props?: {[key: string]: Array<string>}): {[prop: string]: Object} | null {
    if (!props) {
        return null;
    }
    return Object.keys(props).reduce((acc, cur) => {
        acc[cur] = extractPath(item, props[cur]);
        return acc;
    }, {});
}

export function extractPath(item: any, path: Array<string>): string | number | null {
    let x = item;
    for (const segment of path) {
        x = x[segment];
        if (typeof x === 'undefined') {
            return null;
        }
    }
    return x;
};
