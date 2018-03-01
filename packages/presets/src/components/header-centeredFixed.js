export default data => ({
  type: 'abstract',
  template: {
    elements: [
      {
        type: 'layout.fixedWrapper',
        elementOptions: {
          maxWidth: 'var(--fixedWidthMax)',
          ...data.elementOptions,
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
                    ...(data.elementOptions || {}).imageElementOptions,
                  },
                  imageStyles: {
                    ...(data.elementOptions || {}).imageStyles,
                  },
                },
              },
            ],
          },
          data.showSubtitle && {
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

          ...data.style,
        },
      },
    ],
    tagName: 'header',
  },

  tag: 'header.centeredFixed',
  tagOptions: {
    elementOptions: {},
    showSubtitle: false,
    ...data,
  },
});
