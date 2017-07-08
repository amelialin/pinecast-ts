export default ({text}) => ({
    type: 'abstract',
    template: {
        elements: [
            {
                type: 'layout.fixedWrapper',
                children: [
                    {
                        type: 'block.text',
                        styles: {color: 'foreground'},
                        textContent: text,
                    },
                ],
                elementOptions: {
                    bgColor: 'accent',
                    fgColor: 'accent',
                    innerPadding: '20px 0',
                    maxWidth: 960,
                },
                styles: {textAlign: 'left'},
            }
        ],
    },

    tag: 'text.wrappedText',
    tagMetadata: {
        text,
    },
});
