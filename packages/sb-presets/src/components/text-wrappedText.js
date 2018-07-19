export default data => {
  const {
    elementOptions = {
      bgColor: 'accent',
      fgColor: 'accent',
      innerPadding: '20px 0',
    },
    style,
    text = ['podcast', 'copyright'],
  } = data;
  return {
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
    tagOptions: {
      elementOptions,
      text,
      ...data,
    },
  };
};
