import {CSS} from '@pinecast/styles';

import {ComponentContext, getsContext} from '../componentContext';
import {Element} from '../primitives';

import {layoutElements} from './index';

export default getsContext(
  (
    {element, item, style}: {element: Element; item: Object; style: CSS},
    {ctx}: {ctx: ComponentContext},
  ): any => {
    const children: Element['children'] = [];
    if (ctx.resources.logo) {
      children.push({
        type: 'image',
        elementOptions:
          element.elementOptions && element.elementOptions.imageElementOptions,
        propPaths: {
          src: ['site', 'logo_url'],
        },
        styles: {
          maxWidth: 300,
          maxHeight: 300,
          ...(element.elementOptions && element.elementOptions.imageStyles),
        },
      });
    } else {
      children.push({
        type: 'block.text',
        elementOptions: {},
        textContent: ['podcast', 'name'],
        extendsStyles: ['textStyles', 'logo'],
        styles: element.elementOptions && element.elementOptions.textStyles,
      });
    }

    return layoutElements(item, children);
  },
);
