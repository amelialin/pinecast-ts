export default (data = {}) => {
  const {
    elementOptions: {imageElementOptions, ...elementOptions} = {},
    logoMode = 'logo',
    logoSize = 300,
    showSubtitle = false,
    style = {},
    textAlign = 'center',
  } = data;

  const logoMode_ = {
    maxWidth: logoSize,
    maxHeight: logoSize,
  };
  const bannerMode = {
    maxHeight: logoSize,
    maxWidth: '100%',
  };

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
                      ...imageElementOptions,
                      alignX: textAlign,
                    },
                    imageStyles: {
                      ...(logoMode === 'banner' ? bannerMode : logoMode_),
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
      logoMode,
      logoSize,
      showSubtitle,
      textAlign,
      style,
      ...data,
    },
  };
};
