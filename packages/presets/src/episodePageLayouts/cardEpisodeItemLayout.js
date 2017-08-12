export default {
    elements: [
        {
            type: 'image',
            elementOptions: {
                alignX: 'center',
                square: 'element',
            },
            propPaths: {src: ['image_url']},
            styles: {
                marginBottom: 15,
                maxWidth: 300,
            },
        },
        {
            type: 'block.player',
            propPaths: {src: ['player_url']},
        },
        {
            type: 'layout.column',
            tagName: 'hgroup',
            children: [
                {
                    type: 'block.text',
                    tagName: 'h1',
                    styles: {
                        fontFamily: 'headings',
                        fontSize: 18,
                        fontWeight: 'bold',
                        margin: 0,
                        textTransform: 'uppercase',
                    },
                    textContent: ['title'],
                },
                {
                    type: 'block.text',
                    tagName: 'h2',
                    styles: {
                        color: 'buttons',
                        fontFamily: 'headings',
                        fontSize: 18,
                        margin: 0,
                    },
                    textContent: ['subtitle'],
                },
            ],
            styles: {
                padding: 10,
                textAlign: 'center',
            },
        },
        {
            type: 'layout.column',
            tagName: 'div',
            children: [
                {
                    type: 'block.text',
                    textContent: ['description'],
                    textContentFilter: 'raw',
                },
            ],
        },
    ],
    tagName: 'article',
    styles: {
        backgroundColor: 'secondaryBackground',
        boxShadow: '0 5px 5px rgba(0, 0, 0, 0.2)',
        maxWidth: 800,
        marginBottom: 50,
        marginLeft: 'auto',
        marginRight: 'auto',
        padding: 30,
    },
};
