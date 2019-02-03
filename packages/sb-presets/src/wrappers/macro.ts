import {CSS} from '@pinecast/styles';
import {primitives} from '@pinecast/sb-components';

export default ({
  contents,
  elementOptions = {},
  style = {},
  tagName = 'article',
  type = 'layout.fixedWrapper',
}: {
  contents: primitives.Element['children'];
  elementOptions?: primitives.Element['elementOptions'];
  style?: CSS;
  tagName?: string;
  type?: primitives.Element['type'];
}): primitives.ElementLayout => ({
  elements: [
    {
      type,
      elementOptions,
      children: contents,
      styles: style,
    } as primitives.Element,
  ],
  tagName,
  tag: 'page.wrapper',
  tagOptions: {},
});
