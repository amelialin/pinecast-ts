const mounts = {
  siteLinks: {
    type: 'mount',
    props: {mount: 'siteLinks'},
  },
  pageLinks: {
    type: 'mount',
    props: {mount: 'pageLinks'},
  },
};

export default (data = {}) => ({
  type: 'links.linkMount',
  layout: {
    linkStyle: {
      marginRight: 20,
      whiteSpace: 'nowrap',
      ...data.linkStyle,
    },
  },
  template: {
    elements: [
      {
        type: 'layout.fixedWrapper',
        children: (data.includes || ['siteLinks', 'pageLinks'])
          .filter(x => mounts[x])
          .map(x => mounts[x]),
        elementOptions: data.elementOptions,
      },
    ],
    tagName: 'nav',
    styles: {
      margin: '30px 0',
      textAlign: data.textAlign || 'left',
      ...data.style,
    },
  },
  tag: 'header.pageLinkList',
  tagOptions: {
    elementOptions: {},
    includes: ['siteLinks', 'pageLinks'],
    linkStyle: {},
    openInNewWindow: false,
    textAlign: 'left',
    ...data,
  },
});
