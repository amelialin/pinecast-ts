import macroWrapper from './macro';

export default ({style, elementOptions} = {}) => ({
  markdown: macroWrapper({
    style,
    elementOptions,
    contents: [
      {
        type: 'block.text',
        tag_name: 'h1',
        textContent: ['title'],
        extendsStyles: ['textStyles', 'pageHeading'],
        styles: {},
      },
      {
        type: 'block.text',
        textContent: ['body'],
        textContentFilter: 'markdown',
      },
    ],
  }),
  contact: macroWrapper({
    style,
    elementOptions,
    contents: [
      {
        type: 'block.text',
        tag_name: 'h1',
        textContent: ['title'],
        extendsStyles: ['textStyles', 'pageHeading'],
        styles: {},
      },
      {
        type: 'func.narrowScope',
        elementOptions: {path: ['body']},
        children: [
          {
            type: 'helper.page.contact',
            elementOptions: {
              alignX: 'center',
              cellStyles: {
                padding: 5,
              },
            },
            styles: {
              marginBottom: 20,
              marginTop: 20,
            },
          },
        ],
      },
    ],
  }),
  hosts: macroWrapper({
    style,
    elementOptions,
    contents: [
      {
        type: 'block.text',
        tag_name: 'h1',
        textContent: ['title'],
        extendsStyles: ['textStyles', 'pageHeading'],
        styles: {},
      },
      {
        type: 'helper.page.hosts',
        elementOptions: {style: 'flow'},
        children: [
          {
            type: 'layout.column',
            elementOptions: {innerAlignX: 'center'},
            children: [
              {
                type: 'image',
                elementOptions: {
                  gravatar: ['email'],
                  round: 200,
                  square: 'element',
                },
                styles: {
                  width: 200,
                },
              },
              {
                type: 'block.text',
                textContent: ['name'],
                styles: {
                  fontSize: 20,
                  fontWeight: 'bold',
                  lineHeight: 32,
                },
              },
              {
                type: 'helper.page.contact',
                elementOptions: {
                  alignX: 'center',
                  cellStyles: {
                    padding: 5,
                  },
                },
                styles: {
                  marginBottom: 20,
                  marginTop: 20,
                },
              },
            ],
            styles: {
              padding: 15,
              textAlign: 'center',
            },
          },
        ],
      },
    ],
  }),
});
