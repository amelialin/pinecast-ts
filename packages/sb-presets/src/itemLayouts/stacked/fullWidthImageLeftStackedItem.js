export default ({
  imageSize = 300,
  maxLinesOfSummary = 3.5,
  padding,
  ordering = ['title', 'subtitle', 'summary', 'player'],
  style,
  textStyleType = 'item',
} = {}) => {
  const results = {
    title: {
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
          extendsStyles: ['textStyles', `${textStyleType}Heading`],
          styles: {
            margin: '0 0 0.5em',
          },
        },
      ],
      props: {
        href: {name: 'episode', params: {id: ['id']}},
      },
    },
    subtitle: {
      type: 'block.text',
      tagName: 'h2',

      textContent: ['subtitle'],

      elementOptions: {
        maxLines: 1,
        singleLineTruncation: 'ellipsis',
      },
      extendsStyles: ['textStyles', `${textStyleType}Subtitle`],
      styles: {
        margin: '0.5em 0',

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
          color: (style && style.backgroundColor) || 'secondaryBackground',
          height: 25,
        },
      },
      extendsStyles: ['textStyles', `${textStyleType}Summary`],
      styles: {
        marginBottom: 20,
      },
    },
    player: {
      type: 'block.player',
      propPaths: {src: ['player_url']},
    },
  };

  return {
    elements: [
      {
        type: 'image',
        elementOptions: {square: 'element'},
        propPaths: {src: ['image_url']},
        props: {alt: ''},
        styles: {
          flex: `0 0 ${imageSize}px`,
          height: imageSize,
          width: imageSize,
        },
      },
      {
        type: 'layout.column',
        children: ordering.map(x => results[x]),
        styles: {
          flex: '1 1',
          maxWidth: `calc(100% - ${imageSize}px)`,
          padding,

          '@mobile': {
            maxWidth: '100%',
            width: '100%',
          },
        },
      },
    ],
    tagName: 'article',
    styles: {
      backgroundColor: 'secondaryBackground',
      display: 'flex',
      marginBottom: 40,
      ...style,

      ':last-child': {
        marginBottom: (style && style.marginBottom) || 0,
      },
      '@mobile': {
        alignItems: 'center',
        flexDirection: 'column',
        ...(style && style['@mobile']),
      },
    },
  };
};
