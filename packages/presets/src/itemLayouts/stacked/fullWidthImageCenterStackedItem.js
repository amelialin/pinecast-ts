export default (
  {
    imageHeight = 250,
    maxLinesOfSummary = 10,
    ordering = ['date', 'title', 'subtitle', 'image'],
    style,
    textStyleType = 'item',
  } = {},
) => {
  const results = {
    date: {
      type: 'block.text',
      elementOptions: {
        transform: 'date.fromNow',
      },
      textContent: ['publish'],

      extendsStyles: ['textStyles', `${textStyleType}Secondary`],
      styles: {
        margin: 0,
      },
    },
    title: {
      type: 'block.link',
      children: [
        {
          type: 'block.text',
          tagName: 'h1',

          textContent: ['title'],

          extendsStyles: ['textStyles', `${textStyleType}Heading`],
          styles: {
            margin: 0,
          },
        },
      ],
      props: {
        href: {name: 'episode', params: {id: ['id']}},
      },
      styles: {
        color: 'text',
        ':hover': {
          textDecoration: 'underline',
        },
      },
    },
    subtitle: {
      type: 'block.text',
      tagName: 'h2',

      textContent: ['subtitle'],

      extendsStyles: ['textStyles', `${textStyleType}Subtitle`],
      styles: {
        margin: 0,
        ':empty': {
          display: 'none',
        },
      },
    },
    summary: {
      type: 'block.text',
      tagName: 'div',

      textContent: ['description'],
      textContentFilter: 'raw',

      elementOptions: {
        maxLines: maxLinesOfSummary,
        maxLineFade: {
          color: (style && style.backgroundColor) || '#fff',
          height: 25,
        },
      },
      extendsStyles: ['textStyles', `${textStyleType}Summary`],
      styles: {
        marginBottom: 20,
      },
    },
    image: {
      type: 'image',
      elementOptions: {square: 'background'},
      propPaths: {src: ['image_url']},
      props: {alt: ''},
      styles: {
        backgroundPosition: 'center',
        height: imageHeight,
        marginTop: 30,
        width: '100%',
      },
    },
    readMore: {
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
  };
  return {
    elements: ordering.map(x => results[x]),
    tagName: 'article',
    styles: style,
  };
};
