export default ({content, showSubtitle = false}) => ({
    type: 'abstract',
    template: {
        elements: [
            {
                type: 'layout.fixedWrapper',
                elementOptions: {
                    maxWidth: 960,
                },
                children: [
                    Object.assign(
                        {
                            type: 'block.link',
                            elementOptions: {underlineOnHover: true},
                            props: {
                                href: {name: 'home'},
                            },
                            styles: {
                                color: 'foreground',
                                fontFamily: 'logo',
                                fontSize: 40,

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
                styles: {
                    backgroundColor: 'accent',
                    padding: '100px 0',
                    textAlign: 'center',
                },
            },
        ],
        tagName: 'header',
    },

    tag: 'header.centeredFixed',
    tagMetadata: {
        content,
    },
});
