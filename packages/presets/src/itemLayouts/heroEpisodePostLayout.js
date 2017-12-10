export default (
  {position, source} = {position: 'center top', source: 'coverart'},
) => ({
  elements: [
    {
      type: 'image.background',
      propPaths: {
        image: ['image_url'],
      },
      props: {
        position,
      },
      children: [
        {
          type: 'layout.fixedWrapper',
          children: [
            {
              type: 'block.text',
              tagName: 'h1',

              textContent: 'Latest Episode',

              styles: {
                color: 'foreground',
                fontSize: 18,
                fontFamily: 'headings',
                fontWeight: '500',
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
                    fontFamily: 'headings',
                    fontSize: 36,
                    fontWeight: 600,
                    lineHeight: 30,
                    margin: '50px 0 60px',
                    textTransform: 'uppercase',
                  },
                },
              ],
              props: {
                href: {name: 'episode', params: {id: ['id']}},
              },
              styles: {
                color: 'foreground',
                ':hover': {
                  textDecoration: 'underline',
                },
              },
            },
            {
              type: 'block.player',
              propPaths: {src: ['player_url']},
              styles: {
                margin: '20px 0',
              },
            },
          ],
          elementOptions: {
            bgColor: 'rgba(0, 0, 0, 0.5)',
            innerPadding: '50px 0 30px',
            maxWidth: 960,
          },
        },
      ],
    },
  ],
  tagName: 'article',
  styles: {
    marginBottom: 50,
  },
});
