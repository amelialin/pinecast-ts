export default ({
  imageHeight = 250,
  imageStyle = 'rectangle',
  maxLinesOfSummary = 10,
  ordering = ['date', 'title', 'subtitle', 'image'],
  style,
  textStyleType = 'item',
} = {}) => {
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
      propPaths: {href: ['site_url']},
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
          color: (style && style.backgroundColor) || 'background',
          height: 25,
        },
      },
      extendsStyles: ['textStyles', `${textStyleType}Summary`],
      styles: {
        marginBottom: 20,
      },
    },
    image: {
      type: imageStyle === 'square' ? 'image' : 'image.background',
      elementOptions: {
        square: imageStyle === 'square' ? 'element' : undefined,
      },
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
      propPaths: {href: ['site_url']},
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

    tag: 'stacked.fullWidthImageCenter',
    tagOptions: {
      imageHeight,
      imageStyle,
      maxLinesOfSummary,
      ordering,
      style,
      textStyleType,
    },
  };
};
