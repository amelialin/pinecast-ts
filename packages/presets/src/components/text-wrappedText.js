export default data => ({
  type: 'abstract',
  template: {
    elements: [
      {
        type: 'layout.fixedWrapper',
        children: [
          {
            type: 'block.text',
            textContent: data.text,
          },
        ],
        elementOptions: {
          bgColor: 'accent',
          fgColor: 'accent',
          innerPadding: '20px 0',
          maxWidth: 'var(--fixedWidthMax)',
          ...data.elementOptions,
        },
        styles: {
          color: 'foreground',
          textAlign: 'left',
          ...data.style,
        },
      },
    ],
  },

  tag: 'text.wrappedText',
  tagOptions: {
    elementOptions: {},
    ...data,
  },
});
