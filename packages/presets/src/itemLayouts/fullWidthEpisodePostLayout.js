export default {
  elements: [
    {
      type: 'image',
      elementOptions: {square: 'element'},
      propPaths: {src: ['image_url']},
      props: {alt: ''},
      styles: {
        flex: '0 0 300px',
        height: 300,
        width: 300,
      },
    },
    {
      type: 'layout.column',
      children: [
        {
          type: 'block.link',
          children: [
            {
              type: 'block.text',
              tagName: 'h1',

              textContent: ['title'],

              elementOptions: {
                maxLines: 1,
                singleLineTruncation: 'ellipsis',
              },
              styles: {
                color: 'inherit',
                fontFamily: 'headings',
                fontSize: 30,
                fontWeight: 600,
                lineHeight: 30,
                margin: '0 0 0.5em',
                textDecoration: 'underline',
              },
            },
          ],
          props: {
            href: {name: 'episode', params: {id: ['id']}},
          },
        },
        {
          type: 'block.text',
          tagName: 'h2',

          textContent: ['subtitle'],

          elementOptions: {
            maxLines: 1,
            singleLineTruncation: 'ellipsis',
          },
          styles: {
            fontSize: 16,
            fontWeight: 600,
            lineHeight: 16,
            margin: '0.5em 0',
            textTransform: 'uppercase',

            ':empty': {
              display: 'none',
            },
          },
        },
        {
          type: 'block.text',
          tagName: 'div',

          textContent: ['description'],
          textContentFilter: 'raw',

          elementOptions: {
            maxLines: 3.5,
            maxLineFade: {color: '#fff', height: 25},
          },
          styles: {
            fontSize: 12,
            lineHeight: 18,
            marginBottom: 20,
          },
        },
        {
          type: 'block.player',
          propPaths: {src: ['player_url']},
        },
      ],
      styles: {
        flex: '1 1',
        maxWidth: '100%',
        padding: '30px 20px',
      },
    },
  ],
  tagName: 'article',
  styles: {
    backgroundColor: '#fff',
    display: 'flex',
    marginBottom: 40,

    '@mobile': {
      alignItems: 'center',
      flexDirection: 'column',
    },
  },
};
