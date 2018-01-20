export default ({
  contents,
  elementOptions = {maxWidth: 'var(--fixedWidthMax)'},
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
  tag_name: tagName,
});
