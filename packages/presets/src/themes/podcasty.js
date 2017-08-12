import mosaicBody from '../wrappers/mosaicBody';
import mosaicEpisodeItemLayout from '../episodePageLayouts/mosaicEpisodeItemLayout';
import fullWidthEpisodePostLayout from '../itemLayouts/fullWidthEpisodePostLayout';
import heroEpisodePostLayout from '../itemLayouts/heroEpisodePostLayout';
import headerLeftAlign from '../components/header-leftAlign';
import linksLinkBar from '../components/links-linkBar';
import paginationForwardBack from '../components/pagination-forwardBack';
import subheaderSubscribeLinks from '../components/subheader-subscribeLinks';
import textWrappedText from '../components/text-wrappedText';


export default {
    colors: {
        background: '#ddd',
        secondaryBackground: '#fff',
        accent: '#222',
        text: '#444',
        buttons: '#c0392b',
        buttonsText: '#fff',

        foreground: '#ddd',
        links: '#c0392b',

        secondaryAccent: '#bbb',
    },
    fonts: {
        logo: 'Pacifico',
        headings: 'Roboto',
        body: 'Roboto',
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
            padding: '0',
        },
    },

    layout: {
        header: [
            headerLeftAlign({content: 'text'}),
        ],
        footer: [
            paginationForwardBack({nextText: 'Back in time', previousText: 'Onward to the Future'}),
            textWrappedText({
                text: ['podcast', 'copyright'],
                elementOptions: {
                    bgColor: 'secondaryAccent',
                    fgColor: 'secondaryAccent',
                    innerPadding: '100px 0',
                },
                style: {
                    color: 'text',
                    fontSize: 18,
                },
            }),
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
                firstPagePrefix: [
                    {
                        type: 'stacked',
                        consumeCount: 1,

                        width: 'full',

                        elementLayout: heroEpisodePostLayout(),
                    },
                ],
                firstPageAfterPrefix: [
                    subheaderSubscribeLinks({style: {margin: '-50px 0 -30px'}}),
                ],
                segments: [
                    {
                        type: 'stacked',
                        consumeCount: -1,

                        alignment: 'center',
                        padding: '30px 0 0',
                        width: 960,

                        elementLayout: fullWidthEpisodePostLayout,
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
