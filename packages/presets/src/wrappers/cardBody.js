export default ({contents}) => ({
    elements: contents,
    tag_name: 'article',
    styles: {
        backgroundColor: 'foreground',
        boxShadow: '0 5px 5px rgba(0, 0, 0, 0.2)',
        maxWidth: 800,
        marginBottom: 50,
        marginLeft: 'auto',
        marginRight: 'auto',
        padding: 30,
    },
});
