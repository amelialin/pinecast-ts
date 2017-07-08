export default ({nextText, previousText}) => ({
    type: 'pagination.forwardBack',
    layout: {
        nextText,
        previousText,
    },
    template: {
        tagName: 'nav',
        elements: [
            {
                type: 'mount',
                props: {mount: 'previousLink'},
            },
            {
                type: 'mount',
                props: {mount: 'nextLink'},
            },
        ],
        styles: {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            padding: '40px 0',
        },
    },

    tag: 'pagination.forwardBack',
    tagMetadata: {
        nextText,
        previousText,
    },
});
