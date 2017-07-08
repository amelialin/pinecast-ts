export default {
    elements: [
        {
            type: 'block.link',
            children: [
                {
                    type: 'image',
                    elementOptions: {alignX: 'center', square: 'element'},
                    props: {
                        alt: '',
                    },
                    propPaths: {
                        src: ['image_url'],
                    },
                    styles: {
                        height: 300,
                        width: 300,
                    },
                },
                {
                    type: 'block.text',
                    tagName: 'strong',

                    textContent: ['title'],

                    elementOptions: {
                        maxLines: 2,
                        maxLinesOnHover: 4,
                        maxLineFade: {color: 'background', height: 10},
                    },
                    styles: {
                        fontSize: 16,
                        fontWeight: 'normal',
                        lineHeight: 22,
                        marginBottom: 16,
                        marginTop: 16,
                        paddingLeft: 15,
                        paddingRight: 15,
                    },
                },
            ],
            props: {
                href: {name: 'episode', params: {id: ['id']}},
            },
        },
    ],
    tagName: 'article',
    styles: {
        display: 'block',
        textAlign: 'center',
    },
};
