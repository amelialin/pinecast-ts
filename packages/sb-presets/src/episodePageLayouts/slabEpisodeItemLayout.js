export default {
  elements: [
    {
      type: 'layout.fixedWrapper',
      elementOptions: {
        fgColor: 'secondaryBackground',
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
            fontFamily: 'logo',
            fontSize: 16,
            fontWeight: 600,
            margin: 0,
            opacity: 0.4,
            padding: '20px 0',
            textAlign: 'center',
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
                color: 'text',
                fontSize: 30,
                fontWeight: 400,
                margin: 0,
                textAlign: 'center',
                textTransform: 'uppercase',
              },
            },
            {
              type: 'block.text',
              tagName: 'h2',

              textContent: ['subtitle'],

              styles: {
                color: 'secondaryAccent',
                fontSize: 20,
                margin: 0,
                textAlign: 'center',
                textTransform: 'uppercase',

                ':empty': {
                  display: 'none',
                },
              },
            },
          ],
          propPaths: {href: ['site_url']},
          styles: {
            color: 'text',
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
        },
      ],
      styles: {
        padding: 40,
      },
    },
  ],
  tagName: 'article',
};
