export default (data = {}) => {
  const {
    elementOptions: {imageElementOptions, imageStyles, ...elementOptions} = {},
    showSubtitle = false,
    style = {},
    textAlign = 'center',
  } = data;

  return {
    type: 'abstract',
    template: {
      elements: [
        {
          type: 'layout.fixedWrapper',
          elementOptions: elementOptions,
          children: [
            {
              type: 'block.link',
              elementOptions: {underlineOnHover: true},
              props: {
                href: {name: 'home'},
              },
              extendsStyles: ['textStyles', 'logo'],
              styles: {},

              children: [
                {
                  type: 'block.logo',
                  elementOptions: {
                    imageElementOptions: {
                      alignX: textAlign,
                      ...imageElementOptions,
                    },
                    imageStyles: {
                      ...imageStyles,
                    },
                  },
                },
              ],
            },
            showSubtitle && {
              type: 'block.text',
              textContent: ['podcast', 'subtitle'],
              extendsStyles: ['textStyles', 'subtitle'],
              styles: {
                marginTop: 24,
              },
            },
          ],
          styles: {
            textAlign,
            ...style,
          },
        },
      ],
      tagName: 'header',
    },

    tag: 'header.centeredFixed',
    tagOptions: {
      elementOptions,
      showSubtitle,
      textAlign,
      style,
      ...data,
    },
  };
};
