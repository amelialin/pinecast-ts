const mounts = {
  pageLinks: {
    type: 'mount',
    props: {mount: 'pageLinks'},
  },
  siteLinks: {
    type: 'mount',
    props: {mount: 'siteLinks'},
  },
  subLinks: {
    type: 'mount',
    props: {mount: 'subLinks'},
  },
};

export default (data = {}) => {
  const {
    bgStyle = 'dark',
    elementOptions = {},
    col1Items = ['pageLinks', 'siteLinks'],
    col1Name = 'Menu',
    col2Items = ['subLinks'],
    col2Name = 'Subscribe',
    linkStyle = null,
  } = data;
  return {
    type: 'links.linkMount',
    elementOptions: elementOptions,
    layout: {
      linkStyle: {
        borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
        color: 'foreground',
        display: 'block',
        lineHeight: '2.5em',
        textDecoration: 'underline',

        ...linkStyle,
        ':last-child': {
          ...(linkStyle && linkStyle[':last-child']),
          borderBottom: '0',
        },
      },
    },
    template: {
      elements: [
        {
          type: 'layout.fixedWrapper',
          elementOptions: {},
          children: [
            {
              type: 'layout.column',
              children: [
                {
                  type: 'block.text',
                  textContent: col1Name,
                  styles: {
                    fontFamily: 'logo',
                    fontSize: 28,
                    marginBottom: 20,
                  },
                },
                ...col1Items.map(x => mounts[x]),
              ],
              styles: {
                flex: '1 1',
                padding: '0 40px',
              },
            },
            {
              type: 'layout.column',
              children: [
                {
                  type: 'block.text',
                  textContent: col2Name,
                  styles: {
                    fontFamily: 'logo',
                    fontSize: 28,
                    marginBottom: 20,
                  },
                },
                ...col2Items.map(x => mounts[x]),
              ],
              styles: {
                flex: '1 1',
                padding: '0 40px',
              },
            },
          ],
          styles: {
            backgroundColor:
              bgStyle === 'dark'
                ? 'rgba(0, 0, 0, 0.5)'
                : 'rgba(255, 255, 255, 0.5)',
            color: 'foreground',
            display: 'flex',
            fontSize: 14,
            padding: '20px 0 50px',
            textAlign: 'center',
          },
        },
      ],
      tagName: 'footer',
      styles: {
        marginBottom: 40,
      },
    },
    tag: 'footer.columnsFixed',
    tagOptions: {
      bgStyle,
      elementOptions,
      col1Items,
      col1Name,
      col2Items,
      col2Name,
      linkStyle,
      ...data,
    },
  };
};
