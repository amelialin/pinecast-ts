export default ({
  includes,
  layout = null,
  elementOptions = null,
  style = null,
}) => ({
  type: 'links.linkBar',
  layout: Object.assign(
    {
      includes,
      textStyle: {
        color: 'text',
      },
    },
    layout,
  ),
  template: {
    tagName: 'nav',
    elements: [
      {
        type: 'layout.fixedWrapper',
        children: [
          {
            type: 'mount',
            props: {mount: 'links'},
          },
        ],
        elementOptions: Object.assign(
          {
            bgColor: 'secondaryAccent',
            fgColor: 'secondaryAccent',
            innerPadding: '40px 0',
            maxWidth: 960,
          },
          elementOptions,
        ),
        styles: Object.assign({textAlign: 'left'}, style),
      },
    ],
  },

  tag: 'links.linkBar',
  tagMetadata: {
    includes,
  },
});
