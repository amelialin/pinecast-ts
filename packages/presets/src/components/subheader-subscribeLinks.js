export default ({style, subscribeText = 'Subscribe with'} = {}) => ({
  type: 'subheader.subscribeLinks',
  layout: {},
  template: {
    tagName: 'nav',
    elements: [
      {
        type: 'layout.fixedWrapper',
        children: [
          {
            type: 'block.text',
            styles: {
              flex: '1 1',
              fontSize: 20,
              fontWeight: 500,
            },
            textContent: subscribeText,
          },
          {
            type: 'mount',
            props: {mount: 'links'},
            styles: {
              '@mobile': {
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                width: '100%',
              },
            },
          },
        ],
        elementOptions: {
          innerPadding: '40px 0',
          maxWidth: 'var(--fixedWidthMax)',
          outerPadding: '0 15px',
        },
        styles: {
          alignItems: 'center',
          display: 'flex',

          '@mobile': {
            flexDirection: 'column',
            justifyContent: 'center',
          },
        },
      },
    ],
    styles: style,
  },

  tag: 'subheader.subscribeLinks',
});
