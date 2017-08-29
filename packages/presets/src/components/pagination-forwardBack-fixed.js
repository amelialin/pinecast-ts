import {buttons, styles} from './paginationHelpers/previousNext';


export default ({bgColor, fgColor, nextText, previousText}) => ({
    type: 'pagination.forwardBack',
    layout: {
        nextText,
        previousText,
    },
    template: {
        tagName: 'nav',
        elements: [
            {
                type: 'layout.fixedWrapper',
                elementOptions: {
                    bgColor,
                    fgColor,
                    maxWidth: 960,
                },
                children: [
                    ...buttons,
                ],
                styles: Object.assign({padding: '40px 0'}, styles),
            },
        ],
    },

    tag: 'pagination.forwardBack',
    tagMetadata: {
        nextText,
        previousText,
    },
});
