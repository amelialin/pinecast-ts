export default ({
  maxLinesOfSummary = 10,
  padding = '30px 0 50px',
  readMoreText = 'Read more…',
  ordering = ['publish', 'title', 'subtitle', 'summary', 'readMore'],
} = {}) => {
  const results = {
    publish: {
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
    title: {
      type: 'block.link',
      propPaths: {href: ['site_url']},

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
    subtitle: {
      type: 'block.text',
      tagName: 'h2',

      textContent: ['subtitle'],

      extendsStyles: ['textStyles', 'itemSubtitle'],
      styles: {
        margin: '10px 0 0',
      },
    },
    summary: {
      type: 'block.text',
      tagName: 'div',

      textContent: ['description'],
      textContentFilter: 'raw',

      elementOptions: {
        maxLineFade: {
          color: 'background',
          height: 40,
        },
        maxLines: maxLinesOfSummary,
      },

      extendsStyles: ['textStyles', 'itemSummary'],
      styles: {
        margin: 0,
      },
    },
    readMore: {
      type: 'block.link',
      children: [
        {
          type: 'block.text',
          tagName: 'span',

          textContent: readMoreText,

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
    styles: {
      padding,
    },

    tag: 'stacked.noImage',
    tagOptions: {
      ordering,
      maxLinesOfSummary,
      padding,
      readMoreText,
    },
  };
};
