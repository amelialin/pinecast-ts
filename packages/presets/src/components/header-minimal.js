export default ({content, showSubtitle = false, subtitleStyle = {}}) => ({
  type: 'abstract',
  template: {
    elements: [
      Object.assign(
        {
          type: 'block.link',
          elementOptions: {underlineOnHover: true},
          extendsStyles: ['textStyles', 'logo'],
          props: {
            href: {name: 'home'},
          },
          styles: {},
        },
        content === 'text' && {
          textContent: ['podcast', 'name'],
        },
        content === 'logo' && {
          children: [
            {
              type: 'image',
              elementOptions: {alignX: 'center'},
              propPaths: {
                src: ['image_url'],
              },
            },
          ],
        },
      ),
      showSubtitle && {
        type: 'block.text',
        textContent: ['podcast', 'subtitle'],
        extendsStyles: ['textStyles', 'subtitle'],
        styles: {
          marginTop: 25,
          ...subtitleStyle,
        },
      },
    ],
    tagName: 'header',
  },

  tag: 'header.minimal',
  tagMetadata: {
    content,
  },
});
