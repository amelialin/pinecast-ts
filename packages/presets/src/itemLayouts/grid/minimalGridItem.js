export default ({size = 300, style, showSubtitle, textStyle}) => ({
  elements: [
    {
      type: 'block.link',
      children: [
        {
          type: 'image',
          elementOptions: {alignX: 'center', square: 'element'},
          props: {
            alt: '',
          },
          propPaths: {
            src: ['image_url'],
          },
          styles: {
            height: size,
            width: size,
          },
        },
        {
          type: 'block.text',
          tagName: 'strong',

          extendsStyles: ['textStyles', 'itemHeading'],
          textContent: ['title'],

          elementOptions: {
            maxLines: 2,
            maxLinesOnHover: 4,
            maxLineFade: {color: 'background', height: 10},
          },
          styles: {
            marginBottom: 16,
            marginTop: 16,
          },
        },
        showSubtitle && {
          type: 'block.text',
          tagName: 'p',
          extendsStyles: ['textStyles', 'itemSubtitle'],
          textContent: ['subtitle'],
          elementOptions: {
            maxLines: 3,
            maxLinesOnHover: 4,
            maxLineFade: {color: 'background', height: 5},
          },
          styles: {
            marginBottom: 16,
            marginTop: -16,
          },
        },
      ],
      props: {
        href: {name: 'episode', params: {id: ['id']}},
      },
    },
  ],
  tagName: 'article',
  styles: {
    display: 'block',
    textAlign: 'center',
    ...style,
  },
});
