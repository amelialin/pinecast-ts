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

export default (data = {}) => ({
  type: 'links.linkMount',
  layout: {
    linkStyle: {
      borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
      color: 'foreground',
      display: 'block',
      lineHeight: '2.5em',
      textDecoration: 'underline',

      ...data.linkStyle,
      ':last-child': {
        ...(data.linkStyle && data.linkStyle[':last-child']),
        borderBottom: '0',
      },
    },
  },
  template: {
    elements: [
      {
        type: 'layout.fixedWrapper',
        elementOptions: data.elementOptions || {},
        children: [
          {
            type: 'layout.column',
            children: [
              {
                type: 'block.text',
                textContent: data.col1Name,
                styles: {
                  fontFamily: 'logo',
                  fontSize: 28,
                  marginBottom: 20,
                },
              },
              ...(data.col1Items || ['pageLinks', 'siteLinks']).map(
                x => mounts[x],
              ),
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
                textContent: data.col2Name,
                styles: {
                  fontFamily: 'logo',
                  fontSize: 28,
                  marginBottom: 20,
                },
              },
              ...(data.col2Items || ['subLinks']).map(x => mounts[x]),
            ],
            styles: {
              flex: '1 1',
              padding: '0 40px',
            },
          },
        ],
        styles: {
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
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
    col1Name: 'Menu',
    col1Items: ['pageLinks', 'siteLinks'],
    col2Name: 'Subscribe',
    col2Items: ['subLinks'],
    elementOptions: {},
    linkStyle: null,
    ...data,
  },
});
