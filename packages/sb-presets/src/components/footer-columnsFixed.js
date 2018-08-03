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

export default (
  data = {
    bgStyle: 'dark',
    elementOptions: {},
    col1Items: ['pageLinks', 'siteLinks'],
    col1Name: 'Menu',
    col2Items: ['subLinks'],
    col2Name: 'Subscribe',
    linkStyle: null,
  },
) => ({
  type: 'links.linkMount',
  elementOptions: data.elementOptions,
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
        elementOptions: {},
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
              ...data.col1Items.map(x => mounts[x]),
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
              ...data.col2Items.map(x => mounts[x]),
            ],
            styles: {
              flex: '1 1',
              padding: '0 40px',
            },
          },
        ],
        styles: {
          backgroundColor:
            data.bgStyle === 'dark'
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
  tagOptions: data,
});
