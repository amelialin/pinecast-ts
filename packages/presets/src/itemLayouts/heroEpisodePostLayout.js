export default ({position, source} = {position: 'center top', source: 'coverart'}) => ({
    elements: [
        {
            type: 'image.background',
            propPaths: {
                image: ['image_url'],
            },
            props: {
                position,
            },
            children: [
                {
                    type: 'layout.fixedWrapper',
                    children: [
                        {
                            type: 'block.text',
                            tagName: 'h1',

                            textContent: 'Latest Episode',

                            styles: {
                                color: 'buttons',
                                fontSize: 18,
                                fontWeight: 'bold',
                                textTransform: 'uppercase',
                            },
                        },
                        {
                            type: 'block.link',
                            children: [
                                {
                                    type: 'block.text',
                                    tagName: 'h1',

                                    textContent: ['title'],

                                    styles: {
                                        fontSize: 36,
                                        fontWeight: 600,
                                        lineHeight: 30,
                                        margin: '50px 0 60px',
                                        textTransform: 'uppercase',
                                    },
                                },
                            ],
                            props: {
                                href: {name: 'episode', params: {id: ['id']}},
                            },
                            styles: {
                                color: 'buttonsText',
                                ':hover': {
                                    textDecoration: 'underline',
                                },
                            },
                        },
                        {
                            type: 'block.player',
                            propPaths: {src: ['player_url']},
                            styles: {
                                margin: '20px 0',
                            },
                        },
                    ],
                    elementOptions: {
                        bgColor: 'rgba(0, 0, 0, 0.5)',
                        innerPadding: '50px 0 30px',
                        maxWidth: 960,
                    },
                },
            ],
        },
    ],
    tagName: 'article',
    styles: {
        marginBottom: 50,
    },
});
