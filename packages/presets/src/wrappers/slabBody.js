export default ({contents}) => ({
  elements: [
    {
      type: 'layout.fixedWrapper',
      elementOptions: {
        fgColor: 'secondaryBackground',
        maxWidth: 'var(--fixedWidthMax)',
      },
      children: contents,
      styles: {
        padding: 40,
      },
    },
  ],
  tag_name: 'article',
});
