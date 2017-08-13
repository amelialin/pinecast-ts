import mosaicBody from '../wrappers/mosaicBody';
import mosaicEpisodeItemLayout from '../episodePageLayouts/mosaicEpisodeItemLayout';
import slabEpisodePostLayout from '../itemLayouts/slabEpisodePostLayout';
import headerCenteredFixed from '../components/header-centeredFixed';
import linksLinkBar from '../components/links-linkBar';
import paginationForwardBack from '../components/pagination-forwardBack';


export default {
    colors: {
        background: '#34495e',
        secondaryBackground: '#fcfaff',
        accent: '#27ae60',
        text: '#000',
        buttons: '#c0392b',
        buttonsText: '#fff',

        foreground: '#fff',
        links: '#d35400',

        secondaryAccent: '#d35400',
    },
    fonts: {
        logo: 'Lobster',
        headings: 'Lato',
        body: 'Lato',
    },
    styling: {
        buttons: {
            bgColor: 'buttons',
            paddingX: 1,
            paddingY: 0.5,
            roundedCorners: true,
            textColor: 'buttonsText',
            textSize: 20,
        },
        page: {
            backgroundColor: 'background',
            fontSize: 12,
            padding: '40px 0',
        },
    },

    layout: {
        header: [
            headerCenteredFixed({content: 'text', showSubtitle: true}),
        ],
        footer: [
            paginationForwardBack({nextText: 'Back in time', previousText: 'Onward to the Future'}),
            linksLinkBar({
                includes: ['pages', 'links'],
                elementOptions: {
                    bgColor: 'accent',
                    fgColor: 'accent',
                },
                layout: {
                    textStyle: {
                        color: 'foreground',
                        size: 18,
                    },
                },
                style: {
                    textAlign: 'center',
                },
            }),
        ],

        body: {
            home: {
                firstPagePrefix: [],
                segments: [
                    {
                        type: 'stacked',
                        consumeCount: -1,

                        alignment: 'center',
                        width: 960,

                        elementLayout: slabEpisodePostLayout,
                    },
                ],
            },
            episode: mosaicEpisodeItemLayout,
            page: {
                markdown: mosaicBody({
                    contents: [
                        {
                            type: 'block.text',
                            tag_name: 'h1',
                            textContent: ['title'],
                            styles: {
                                fontSize: 36,
                                fontWeight: 'bold',
                                marginBottom: 30,
                            },
                        },
                        {
                            type: 'block.text',
                            textContent: ['body'],
                            textContentFilter: 'markdown',
                        },
                    ],
                }),
                contact: mosaicBody({
                    contents: [
                        {
                            type: 'block.text',
                            tag_name: 'h1',
                            textContent: ['title'],
                            styles: {
                                fontSize: 36,
                                fontWeight: 'bold',
                                marginBottom: 30,
                            },
                        },
                        {
                            type: 'func.narrowScope',
                            elementOptions: {path: ['body']},
                            children: [
                                {
                                    type: 'helper.page.contact',
                                    elementOptions: {
                                        alignX: 'center',
                                        cellStyles: {
                                            padding: 5,
                                        },
                                    },
                                    styles: {
                                        marginBottom: 20,
                                        marginTop: 20,
                                    },
                                },
                            ],
                        },
                    ],
                }),
                hosts: mosaicBody({
                    contents: [
                        {
                            type: 'block.text',
                            tag_name: 'h1',
                            textContent: ['title'],
                            styles: {
                                fontSize: 36,
                                fontWeight: 'bold',
                                marginBottom: 30,
                            },
                        },
                        {
                            type: 'helper.page.hosts',
                            elementOptions: {style: 'flow'},
                            children: [
                                {
                                    type: 'layout.column',
                                    elementOptions: {innerAlignX: 'center'},
                                    children: [
                                        {
                                            type: 'image',
                                            elementOptions: {
                                                gravatar: ['email'],
                                                round: 200,
                                                square: 'element',
                                            },
                                            styles: {
                                                width: 200,
                                            },
                                        },
                                        {
                                            type: 'block.text',
                                            textContent: ['name'],
                                            styles: {
                                                fontSize: 20,
                                                fontWeight: 'bold',
                                                lineHeight: 32,
                                            },
                                        },
                                        {
                                            type: 'helper.page.contact',
                                            elementOptions: {
                                                alignX: 'center',
                                                cellStyles: {
                                                    padding: 5,
                                                },
                                            },
                                            styles: {
                                                marginBottom: 20,
                                                marginTop: 20,
                                            },
                                        },
                                    ],
                                    styles: {
                                        padding: 15,
                                        textAlign: 'center',
                                    },
                                },
                            ],
                        },
                    ],
                }),
            },
        },
    },
};
