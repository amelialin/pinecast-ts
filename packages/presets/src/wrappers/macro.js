export default ({
  contents,
  elementOptions,
  styles = {},
  tagName = 'article',
  type = 'layout.column',
}) => ({
  elements: [
    {
      type,
      elementOptions,
      children: contents,
      styles,
    },
  ],
  tag_name: tagName,
});
