export default {
  elements: [
    {
      type: 'image',
      elementOptions: {
        alignX: 'center',
        position: {
          location: 'absolute',
          left: -300,
          top: 0,
          '@mobile': {
            left: 0,
            top: -300,
          },
        },
        square: 'element',
      },
      propPaths: {src: ['image_url']},
      styles: {
        marginBottom: 15,
        height: 300,
        width: 300,
      },
    },
    {
      type: 'block.text',
      tagName: 'h1',
      extendsStyles: ['textStyles', 'pageHeading'],
      styles: {
        margin: 0,
      },
      textContent: ['title'],
    },
    {
      type: 'block.text',
      tagName: 'h2',
      extendsStyles: ['textStyles', 'pageSubtitle'],
      styles: {
        margin: 0,
      },
      textContent: ['subtitle'],
    },
    {
      type: 'block.player',
      propPaths: {src: ['player_url']},
      styles: {
        marginBottom: 20,
        marginTop: 30,
      },
    },
    {
      type: 'block.text',
      textContent: ['description'],
      textContentFilter: 'raw',
    },
  ],
  tagName: 'article',
  styles: {
    backgroundColor: 'secondaryBackground',
    borderLeftColor: 'secondaryAccent',
    borderLeftStyle: 'solid',
    borderLeftWidth: 300,
    borderTopColor: 'secondaryAccent',
    borderTopStyle: 'solid',
    borderTopWidth: 0,
    padding: '30px 20px',
    maxWidth: 'var(--fixedWidthMax)',
    marginBottom: 50,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 40,

    '@mobile': {
      borderLeftWidth: 0,
      borderTopWidth: 300,
      marginBottom: 0,
      marginTop: 0,
    },
  },
};
