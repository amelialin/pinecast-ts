export default ({
  includes,
  layout = null,
  elementOptions = null,
  style = null,
}) => ({
  type: 'links.linkBar',
  layout: {
    includes,
    textStyle: {
      color: 'text',
    },
    ...layout,
  },
  template: {
    tagName: 'nav',
    elements: [
      {
        type: 'layout.fixedWrapper',
        children: [
          {
            type: 'mount',
            props: {mount: 'links'},
          },
        ],
        elementOptions: {
          maxWidth: 'var(--fixedWidthMax)',
          ...elementOptions,
        },
        styles: {textAlign: 'left', ...style},
      },
    ],
  },

  tag: 'links.linkBar',
  tagMetadata: {
    includes,
  },
});
