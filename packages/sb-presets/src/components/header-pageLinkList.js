const mounts = [
  {
    type: 'mount',
    props: {mount: 'siteLinks'},
  },
  {
    type: 'mount',
    props: {mount: 'pageLinks'},
  },
];

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
        children: mounts,
        elementOptions: data.elementOptions,
      },
    ],
    tagName: 'nav',
    styles: {
      margin: '30px 0',
      ...data.style,
    },
  },
  tag: 'header.pageLinkList',
  tagOptions: {
    elementOptions: {},
    openInNewWindow: false,
    linkStyle: {},
    ...data,
  },
});
