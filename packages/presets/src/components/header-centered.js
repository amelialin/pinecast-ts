export default ({content}) => ({
  type: 'abstract',
  template: {
    elements: [
      {
        type: 'layout.column',
        children: [
          Object.assign(
            {
              type: 'block.link',
              elementOptions: {underlineOnHover: true},
              extendsStyles: ['textStyles', 'logo'],
              props: {
                href: {name: 'home'},
              },
              styles: {
                textAlign: 'center',
              },
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
        ],
        styles: {
          backgroundColor: 'accent',

          padding: '200px 25%',
          '@mobile': {
            padding: '100px 5%',
          },
        },
      },
    ],
    tagName: 'header',
  },

  tag: 'header.centered',
  tagMetadata: {
    content,
  },
});
