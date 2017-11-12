import slabBody from '../wrappers/slabBody';
import slabEpisodeItemLayout from '../episodePageLayouts/slabEpisodeItemLayout';
import slabEpisodePostLayout from '../itemLayouts/slabEpisodePostLayout';
import headerCenteredFixed from '../components/header-centeredFixed';
import paginationForwardBackFixed from '../components/pagination-forwardBack-fixed';

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
      borderRadius: 3,
      boxShadow: '0 2px 0.5px rgba(0, 0, 0, 0.15)',
      padding: '0.5em 1em',
      fontSize: 20,
    },
    page: {
      backgroundColor: 'background',
      fontSize: 12,
      padding: '40px 0',
    },
  },

  layout: {
    header: [headerCenteredFixed({content: 'text', showSubtitle: true})],
    footer: [
      paginationForwardBackFixed({
        fgColor: 'secondaryBackground',
        nextText: 'Back in time',
        previousText: 'Onward to the Future',
      }),
      {
        type: 'links.linkMount',
        layout: {
          linkStyle: {
            borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
            color: 'foreground',
            display: 'block',
            lineHeight: '2.5em',
            textDecoration: 'underline',

            ':last-child': {
              borderBottom: '0',
            },
          },
        },
        template: {
          elements: [
            {
              type: 'layout.fixedWrapper',
              elementOptions: {
                maxWidth: 960,
              },
              children: [
                {
                  type: 'layout.column',
                  children: [
                    {
                      type: 'block.text',
                      textContent: 'Menu',
                      styles: {
                        fontFamily: 'logo',
                        fontSize: 28,
                        marginBottom: 20,
                      },
                    },
                    {
                      type: 'mount',
                      props: {mount: 'pageLinks'},
                    },
                    {
                      type: 'mount',
                      props: {mount: 'siteLinks'},
                    },
                  ],
                  styles: {
                    flex: '1 1',
                    padding: '0 40px',
                  },
                },
                {
                  type: 'layout.column',
                  children: [
                    {
                      type: 'block.text',
                      textContent: 'Subscribe',
                      styles: {
                        fontFamily: 'logo',
                        fontSize: 28,
                        marginBottom: 20,
                      },
                    },
                    {
                      type: 'mount',
                      props: {mount: 'subLinks'},
                    },
                  ],
                  styles: {
                    flex: '1 1',
                    padding: '0 40px',
                  },
                },
              ],
              styles: {
                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                color: 'foreground',
                display: 'flex',
                fontSize: 14,
                padding: '20px 0 50px',
                textAlign: 'center',
              },
            },
          ],
          tagName: 'footer',
          styles: {
            marginBottom: 40,
          },
        },
        tag: 'footer.columnsFixed',
        tagMetadata: {
          cols: ['page,site', 'sub'],
        },
      },
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
      episode: slabEpisodeItemLayout,
      page: {
        markdown: slabBody({
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
        contact: slabBody({
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
        hosts: slabBody({
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
