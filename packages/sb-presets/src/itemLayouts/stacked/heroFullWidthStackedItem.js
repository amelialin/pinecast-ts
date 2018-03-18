export default ({
  position = 'center top',
  source = 'coverart',
  textStyleType = 'heroItem',
} = {}) => ({
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

              extendsStyles: ['textStyles', 'heroItemSecondary'],
              styles: {},
            },
            {
              type: 'block.link',
              children: [
                {
                  type: 'block.text',
                  tagName: 'h1',

                  textContent: ['title'],

                  extendsStyles: ['textStyles', `${textStyleType}Heading`],
                  styles: {
                    margin: '25px 0 50px',
                  },
                },
              ],
              props: {
                href: {name: 'episode', params: {id: ['id']}},
              },
              extendsStyles: ['textStyles', `${textStyleType}Heading`],
              styles: {
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
            outerPadding: '0 15px',
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
