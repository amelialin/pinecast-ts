export default {
    elements: [
        {
            type: 'image',
            elementOptions: {
                alignX: 'center',
                position: {
                    location: 'absolute',
                    left: -300,
                    top: 0,
                    '@mobile': {
                        left: 0,
                        top: -300,
                    },
                },
                square: 'element',
            },
            propPaths: {src: ['image_url']},
            styles: {
                marginBottom: 15,
                height: 300,
                width: 300,
            },
        },
        {
            type: 'block.text',
            tagName: 'h1',
            styles: {
                fontFamily: 'headings',
                fontSize: 30,
                fontWeight: 'bold',
                margin: 0,
            },
            textContent: ['title'],
        },
        {
            type: 'block.text',
            tagName: 'h2',
            styles: {
                color: 'buttons',
                fontFamily: 'headings',
                fontSize: 24,
                margin: 0,
            },
            textContent: ['subtitle'],
        },
        {
            type: 'block.player',
            propPaths: {src: ['player_url']},
            styles: {
                marginBottom: 40,
                marginTop: 40,
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
        borderLeftColor: 'secondaryAccent',
        borderLeftStyle: 'solid',
        borderLeftWidth: 300,
        borderTopColor: 'secondaryAccent',
        borderTopStyle: 'solid',
        borderTopWidth: 0,
        padding: '30px 20px',
        maxWidth: 960,
        marginBottom: 50,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 40,

        '@mobile': {
            borderLeftWidth: 0,
            borderTopWidth: 300,
            marginBottom: 0,
            marginTop: 0,
        },
    },
};
