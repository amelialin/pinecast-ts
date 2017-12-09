export default {
  elements: [
    {
      type: 'layout.column',
      elementOptions: {
        fgColor: 'background',
      },
      children: [
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
          type: 'image',
          elementOptions: {square: 'background'},
          propPaths: {src: ['image_url']},
          props: {alt: ''},
          styles: {
            backgroundPosition: 'center',
            height: 250,
            marginTop: 30,
            width: '100%',
          },
        },
        {
          type: 'block.player',
          propPaths: {src: ['player_url']},
          styles: {
            marginBottom: 40,
            marginTop: 40,
          },
        },
        {
          type: 'block.text',
          textContent: ['description'],
          textContentFilter: 'raw',

          styles: {
            fontSize: 16,
          },
        },
      ],
      styles: {
        padding: '30px 0',
      },
    },
  ],
  tagName: 'article',
};
