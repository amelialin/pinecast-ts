export default (data = {}) => {
  const {
    includes = ['links', 'pages'],
    elementOptions = {},
    layout = null,
    style,
    textAlign = 'left',
  } = data;

  return {
    type: 'links.linkBar',
    layout: {
      includes: includes,
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
          elementOptions: elementOptions,
          styles: {textAlign, ...style},
        },
      ],
    },

    tag: 'links.linkBar',
    tagOptions: {
      includes,
      elementOptions,
      layout,
      style,
      textAlign,
      ...data,
    },
  };
};
