export default ({contents}) => ({
    elements: [
        {
            type: 'layout.fixedWrapper',
            elementOptions: {
                fgColor: 'secondaryBackground',
                maxWidth: 960,
            },
            children: contents,
            styles: {
                padding: 40,
            },
        },
    ],
    tag_name: 'article',
});
