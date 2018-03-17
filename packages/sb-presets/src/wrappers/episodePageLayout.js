import macroWrapper from './macro';

export default ({
  elementOptions,
  innerElementOptions = {},
  innerStyling = {},
  ordering = [],
  style,
}) => {
  const results = {
    title: {
      type: 'block.text',
      tagName: 'h1',
      extendsStyles: ['textStyles', 'pageHeading'],
      styles: {},
      textContent: ['title'],
    },
    subtitle: {
      type: 'block.text',
      tagName: 'h2',
      extendsStyles: ['textStyles', 'pageSubtitle'],
      styles: {
        margin: 0,
      },
      textContent: ['subtitle'],
    },
    publish: {
      type: 'block.text',
      elementOptions: {
        transform: 'date.fromNow',
      },
      textContent: ['publish'],

      extendsStyles: ['textStyles', 'pageSecondary'],
      styles: {
        margin: 0,
        padding: '0 0 10px',
      },
    },
    image: {
      type: 'image',
      elementOptions: {
        alignX: 'center',
        square: 'element',
      },
      propPaths: {src: ['image_url']},
      styles: {
        marginBottom: 15,
        maxWidth: 300,
      },
    },
    player: {
      type: 'block.player',
      propPaths: {src: ['player_url']},
    },
    description: {
      type: 'block.text',
      textContent: ['description'],
      textContentFilter: 'raw',
    },
  };

  function mergeStyle(name) {
    return {
      ...results[name],
      elementOptions: {
        ...results[name].elementOptions,
        ...innerElementOptions[name],
      },
      styles: {...results[name].styles, ...innerStyling[name]},
    };
  }
  function flattenOrdering(order) {
    return order.map(x => {
      if (Array.isArray(x)) {
        return {
          type: 'layout.row',
          children: flattenOrdering(x),
        };
      }
      return mergeStyle(x);
    });
  }
  return macroWrapper({
    contents: flattenOrdering(ordering),
    elementOptions,
    style,
  });
};
