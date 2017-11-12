export default {
  elements: [
    {
      type: 'block.text',
      elementOptions: {
        transform: 'date.fromNow',
      },
      textContent: ['publish'],

      styles: {
        color: 'text',
        fontFamily: 'headings',
        fontSize: 13,
        fontWeight: 600,
        margin: 0,
        padding: '0 0 10px',
        textTransform: 'uppercase',
      },
    },
    {
      type: 'block.link',
      children: [
        {
          type: 'block.text',
          tagName: 'h1',

          textContent: ['title'],

          styles: {
            color: 'accent',
            fontSize: 30,
            fontWeight: 400,
            margin: 0,
          },
        },
        {
          type: 'block.text',
          tagName: 'h2',

          textContent: ['subtitle'],

          styles: {
            color: 'secondaryAccent',
            fontSize: 20,
            margin: '10px 0 0',

            ':empty': {
              display: 'none',
            },
          },
        },
      ],
      props: {
        href: {name: 'episode', params: {id: ['id']}},
      },
      styles: {
        color: 'accent',
        ':hover': {
          textDecoration: 'underline',
        },
      },
    },
    {
      type: 'block.text',
      tagName: 'div',

      textContent: ['description'],
      textContentFilter: 'raw',

      elementOptions: {
        maxLineFade: {
          color: 'secondaryBackground',
          height: 40,
        },
        maxLines: 10,
      },

      styles: {
        fontSize: 16,
        lineHeight: 20,
        margin: '20px 0 0',
      },
    },
    {
      type: 'block.link',
      children: [
        {
          type: 'block.text',
          tagName: 'span',

          textContent: 'Read more...',

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
        fontSize: 16,
        marginTop: 15,

        ':hover': {
          textDecoration: 'underline',
        },
      },
    },
  ],
  tagName: 'article',
  styles: {
    backgroundColor: 'secondaryBackground',
    padding: '30px 0',

    ':nth-child(n+1)': {
      borderTop: '1px solid #eee',
    },
  },
};
