export default ({contents}) => ({
    elements: contents,
    tag_name: 'article',
    styles: {
        backgroundColor: 'secondaryBackground',
        maxWidth: 960,
        marginBottom: 50,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 50,
        padding: 30,

        '@mobile': {
            marginBottom: 0,
            marginTop: 0,
            padding: 15,
        },
    },
});
