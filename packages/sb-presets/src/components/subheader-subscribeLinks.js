export default (data = {}) => {
  const {
    elementOptions = {innerPadding: '40px 0', outerPadding: '0 15px'},
    subscribeText,
    style,
  } = data;

  return {
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
          elementOptions: elementOptions,
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
    tagOptions: {
      subscribeText: 'Subscribe with',
      ...data,
    },
  };
};
