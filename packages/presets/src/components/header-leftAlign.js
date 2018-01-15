export default ({content}) => ({
  type: 'abstract',
  template: {
    elements: [
      {
        type: 'layout.fixedWrapper',
        children: [
          Object.assign(
            {
              type: 'block.link',
              elementOptions: {underlineOnHover: true},
              props: {
                href: {name: 'home'},
              },
              styles: {
                color: 'foreground',
                fontFamily: 'logo',
                fontSize: 36,
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
        elementOptions: {
          bgColor: 'accent',
          fgColor: 'accent',
          innerPadding: '20px 0',
          lineHeight: '60px',
          maxWidth: 'var(--fixedWidthMax)',
          outerPadding: '0 15px',
        },
        styles: {
          textAlign: 'left',
        },
      },
    ],
    tagName: 'header',
  },

  tag: 'header.leftAlign',
  tagMetadata: {
    content,
  },
});
