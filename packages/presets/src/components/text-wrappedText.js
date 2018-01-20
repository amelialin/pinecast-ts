export default ({text, elementOptions = null, style = null}) => ({
  type: 'abstract',
  template: {
    elements: [
      {
        type: 'layout.fixedWrapper',
        children: [
          {
            type: 'block.text',
            textContent: text,
          },
        ],
        elementOptions: {
          bgColor: 'accent',
          fgColor: 'accent',
          innerPadding: '20px 0',
          maxWidth: 'var(--fixedWidthMax)',
          ...elementOptions,
        },
        styles: {
          color: 'foreground',
          textAlign: 'left',
          ...style,
        },
      },
    ],
  },

  tag: 'text.wrappedText',
  tagMetadata: {
    text,
    style,
  },
});
