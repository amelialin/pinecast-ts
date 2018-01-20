export default ({content, showSubtitle = false, style, elementOptions}) => ({
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
          Object.assign(
            {
              type: 'block.link',
              elementOptions: {underlineOnHover: true},
              props: {
                href: {name: 'home'},
              },
              extendsStyles: ['textStyles', 'logo'],
              styles: {},
            },
            content === 'text' && {
              textContent: ['podcast', 'name'],
            },
            content === 'logo' && {
              children: [
                {
                  type: 'image',
                  elementOptions: {alignX: 'center'},
                  propPaths: {
                    src: ['image_url'],
                  },
                },
              ],
            },
          ),
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
