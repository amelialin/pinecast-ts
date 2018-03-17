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
        elementOptions: {
          maxWidth: 'var(--fixedWidthMax)',
        },
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
              {
                type: 'mount',
                props: {mount: 'pageLinks'},
              },
              {
                type: 'mount',
                props: {mount: 'siteLinks'},
              },
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
              {
                type: 'mount',
                props: {mount: 'subLinks'},
              },
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
    linkStyle: null,
    ...data,
  },
});
