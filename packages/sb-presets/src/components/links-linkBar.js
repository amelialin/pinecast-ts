export default (data = {}) => ({
  type: 'links.linkBar',
  layout: {
    includes: data.includes,
    textStyle: {
      color: 'text',
    },
    ...data.layout,
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
          ...data.elementOptions,
        },
        styles: {textAlign: 'left', ...data.style},
      },
    ],
  },

  tag: 'links.linkBar',
  tagOptions: {
    includes: ['links', 'pages'],
    elementOptions: {},
    layout: null,
    openInNewWindow: false,
    ...data,
  },
});
