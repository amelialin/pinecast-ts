export default data => {
  const {
    elementOptions: {imageElementOptions, imageStyles, ...elementOptions} = {},
    showSubtitle,
    style,
    textAlign,
  } = data;

  return {
    type: 'abstract',
    template: {
      elements: [
        {
          type: 'layout.fixedWrapper',
          elementOptions: {
            maxWidth: 'var(--fixedWidthMax)',
            ...elementOptions,
          },
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
                      alignX: 'center',
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
            textAlign: textAlign || 'center',

            ...style,
          },
        },
      ],
      tagName: 'header',
    },

    tag: 'header.centeredFixed',
    tagOptions: {
      elementOptions: {},
      showSubtitle: false,
      textAlign: 'center',
      ...data,
    },
  };
};
