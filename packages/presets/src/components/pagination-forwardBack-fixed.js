import {buttons, styles as baseStyles} from './paginationHelpers/previousNext';

export default ({bgColor, fgColor, nextText, previousText, styles}) => ({
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
          maxWidth: 'var(--fixedWidthMax)',
        },
        children: [...buttons],
        styles: {padding: '40px 0', ...baseStyles, ...styles},
      },
    ],
  },

  tag: 'pagination.forwardBack',
  tagMetadata: {
    nextText,
    previousText,
  },
});
