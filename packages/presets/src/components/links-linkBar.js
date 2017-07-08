export default ({includes}) => ({
    type: 'links.linkBar',
    layout: {
        includes,
        textStyle: {
            color: 'text',
        },
    },
    template: {
        tagName: 'nav',
        elements: [
            {
                type: 'layout.fixedWrapper',
                children: [
                    {
                        type: 'mount',
                        props: {mount: 'links'},
                    },
                ],
                elementOptions: {
                    bgColor: 'secondaryAccent',
                    fgColor: 'secondaryAccent',
                    innerPadding: '40px 0',
                    maxWidth: 960,
                },
                styles: {
                    textAlign: 'left',
                },
            }
        ],
    },

    tag: 'links.linkBar',
    tagMetadata: {
        includes,
    },
});
