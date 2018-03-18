export default ({
  contents,
  elementOptions = {},
  style = {},
  tagName = 'article',
  type = 'layout.fixedWrapper',
}) => ({
  elements: [
    {
      type,
      elementOptions,
      children: contents,
      styles: style,
    },
  ],
  tagName,
  tag: 'page.wrapper',
  tagMetadata: {},
});
