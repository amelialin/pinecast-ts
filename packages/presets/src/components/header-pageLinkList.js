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
    elements: data.fixed
      ? [
          {
            type: 'layout.fixedWrapper',
            children: mounts,
          },
        ]
      : mounts,
    tagName: 'nav',
    styles: {
      margin: '30px 0',
      ...data.style,
    },
  },
  tag: 'header.pageLinkList',
  tagOptions: {fixed: false, linkStyle: {}, ...data},
});
