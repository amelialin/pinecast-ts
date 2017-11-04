export default ({content, showSubtitle = false}) => ({
    type: 'abstract',
    template: {
        elements: [
            Object.assign(
                {
                    type: 'block.link',
                    elementOptions: {underlineOnHover: true},
                    props: {
                        href: {name: 'home'},
                    },
                    styles: {
                        color: 'accent',
                        fontFamily: 'logo',
                        fontSize: 50,
                    },
                },
                content === 'text' &&
                    {
                        textContent: ['podcast', 'name'],
                    },
                content === 'logo' &&
                    {
                        children: [
                            {
                                type: 'image',
                                elementOptions: {alignX: 'center'},
                                propPaths: {
                                    src: ['image_url'],
                                },
                            }
                        ],
                    }
            ),
            showSubtitle &&
                {
                    type: 'block.text',
                    textContent: ['podcast', 'subtitle'],
                    styles: {
                        color: 'foreground',
                        fontFamily: 'headings',
                        fontSize: 20,
                        marginTop: 25,
                    },
                },
        ],
        tagName: 'header',
    },

    tag: 'header.minimal',
    tagMetadata: {
        content,
    },
});
