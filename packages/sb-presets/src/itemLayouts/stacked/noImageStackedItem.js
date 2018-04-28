export default () => ({
  elements: [
    {
      type: 'block.text',
      elementOptions: {
        transform: 'date.fromNow',
      },
      textContent: ['publish'],

      extendsStyles: ['textStyles', 'itemSecondary'],
      styles: {
        margin: 0,
        padding: '0 0 10px',
      },
    },
    {
      type: 'block.link',
      props: {
        href: {name: 'episode', params: {id: ['id']}},
      },

      children: [
        {
          type: 'block.text',
          tagName: 'h1',
          textContent: ['title'],
          extendsStyles: ['textStyles', 'itemHeading'],
          styles: {
            margin: 0,
          },
        },
      ],

      extendsStyles: ['textStyles', 'itemHeading'],
    },
    {
      type: 'block.text',
      tagName: 'h2',

      textContent: ['subtitle'],

      extendsStyles: ['textStyles', 'itemSubtitle'],
      styles: {
        margin: '10px 0 0',
      },
    },
    {
      type: 'block.text',
      tagName: 'div',

      textContent: ['description'],
      textContentFilter: 'raw',

      elementOptions: {
        maxLineFade: {
          color: 'background',
          height: 40,
        },
        maxLines: 10,
      },

      extendsStyles: ['textStyles', 'itemSummary'],
      styles: {
        margin: 0,
      },
    },
    {
      type: 'block.link',
      children: [
        {
          type: 'block.text',
          tagName: 'span',

          textContent: 'Read more…',

          styles: {
            color: 'secondaryAccent',
          },
        },
      ],
      props: {
        href: {name: 'episode', params: {id: ['id']}},
      },
      styles: {
        color: 'secondaryAccent',
        marginTop: 15,

        ':hover': {
          textDecoration: 'underline',
        },
      },
    },
  ],
  tagName: 'article',
  styles: {
    padding: '30px 0 50px',
  },
});
