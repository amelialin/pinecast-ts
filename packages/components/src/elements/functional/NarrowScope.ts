import {Element} from '../../primitives';
import {extractPath} from '../extractor';
import {layoutElements} from '../index';


export default (
    {element, item, style = {}}: {element: Element, item: Object, style: Object}
) => {
    const newScope = extractPath(item, (element.elementOptions || {}).path || []);
    if (!element.children) {
        throw new Error('Expected child on NarrowScope element');
    }
    return layoutElements(newScope, element.children.slice(0, 1), style)[0];
};
