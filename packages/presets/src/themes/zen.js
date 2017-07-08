import cardBody from '../wrappers/cardBody';
import cardEpisodeItemLayout from '../episodePageLayouts/cardEpisodeItemLayout';
import headerCentered from '../components/header-centered';
import linksLinkBar from '../components/links-linkBar';
import paginationForwardBack from '../components/pagination-forwardBack';
import simpleEpisodeTileLayout from '../itemLayouts/simpleEpisodeTileLayout';
import subheaderSubscribeLinks from '../components/subheader-subscribeLinks';
import textWrappedText from '../components/text-wrappedText';


export default {
    colors: {
        background: '#f0f0f0',
        accent: '#2196F3',
        text: '#000',
        buttons: '#009688',
        buttonsText: '#fff',

        foreground: '#fff',
        links: '#212121',

        secondaryAccent: '#96CFFF',
    },
    fonts: {
        logo: 'Righteous',
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
    },

    layout: {
        page: {
            backgroundColor: 'background',
            fontSize: 14,
            padding: '0',
        },

        header: [
            headerCentered({content: 'text'}),
            subheaderSubscribeLinks(),
        ],
        footer: [
            paginationForwardBack({nextText: 'Back in time', previousText: 'Onward to the Future'}),
            linksLinkBar({includes: ['pages', 'links']}),
            textWrappedText({text: ['podcast', 'copyright']}),
        ],

        body: {
            home: {
                firstPagePrefix: [],
                segments: [
                    {
                        type: 'grid',
                        consumeCount: -1,

                        alignment: 'center',
                        itemSpacing: 30,
                        maxItemsAcross: 3,
                        padding: 0,
                        width: 990,

                        elementLayout: simpleEpisodeTileLayout,
                    },
                ],
            },
            epsiode: cardEpisodeItemLayout,
            page: {
                markdown: cardBody({
                    contents: [
                        {
                            type: 'block.text',
                            tag_name: 'h1',
                            textContent: ['title'],
                            styles: {
                                fontSize: 26,
                                fontWeight: 'bold',
                                textAlign: 'center',
                            },
                        },
                        {
                            type: 'block.text',
                            textContent: ['body'],
                            textContentFilter: 'markdown',
                        },
                    ],
                }),
                contact: cardBody({
                    contents: [
                        {
                            type: 'block.text',
                            tag_name: 'h1',
                            textContent: ['title'],
                            styles: {
                                fontSize: 26,
                                fontWeight: 'bold',
                                textAlign: 'center',
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
                hosts: cardBody({
                    contents: [
                        {
                            type: 'block.text',
                            tag_name: 'h1',
                            textContent: ['title'],
                            styles: {
                                fontSize: 26,
                                fontWeight: 'bold',
                                textAlign: 'center',
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
