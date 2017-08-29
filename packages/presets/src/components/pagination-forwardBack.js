import {buttons, styles} from './paginationHelpers/previousNext';


export default ({nextText, previousText}) => ({
    type: 'pagination.forwardBack',
    layout: {
        nextText,
        previousText,
    },
    template: {
        tagName: 'nav',
        elements: [
            ...buttons,
        ],
        styles: Object.assign({padding: '40px 0'}, styles),
    },

    tag: 'pagination.forwardBack',
    tagMetadata: {
        nextText,
        previousText,
    },
});
