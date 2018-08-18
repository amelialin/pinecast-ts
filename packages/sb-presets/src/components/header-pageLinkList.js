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

export default (data = {}) => {
  const {
    elementOptions = {},
    includes = ['siteLinks', 'pageLinks'],
    linkStyle = {},
    openInNewWindow = false,
    textAlign = 'left',
    style,
  } = data;

  return {
    type: 'links.linkMount',
    layout: {
      linkStyle: {
        marginRight: 20,
        whiteSpace: 'nowrap',
        ...linkStyle,
      },
    },
    template: {
      elements: [
        {
          type: 'layout.fixedWrapper',
          children: includes.filter(x => mounts[x]).map(x => mounts[x]),
          elementOptions: elementOptions,
        },
      ],
      tagName: 'nav',
      styles: {
        margin: '30px 0',
        textAlign,
        ...style,
      },
    },
    tag: 'header.pageLinkList',
    tagOptions: {
      elementOptions,
      includes,
      linkStyle,
      openInNewWindow,
      textAlign,
      style,
      ...data,
    },
  };
};
