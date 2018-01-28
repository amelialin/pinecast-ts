export default ({
  content,
  showSubtitle = false,
  style,
  elementOptions = {},
}) => ({
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
                    ...elementOptions.imageElementOptions,
                  },
                  imageStyles: {
                    ...elementOptions.imageStyles,
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
              marginTop: 25,
            },
          },
        ],
        styles: {
          textAlign: 'center',

          ...style,
        },
      },
    ],
    tagName: 'header',
  },

  tag: 'header.centeredFixed',
  tagMetadata: {
    content,
  },
});
