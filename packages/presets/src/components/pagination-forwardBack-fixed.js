import {buttons, styles as baseStyles} from './paginationHelpers/previousNext';

export default data => ({
  type: 'pagination.forwardBack',
  layout: {
    nextText: data.nextText,
    previousText: data.previousText,
  },
  template: {
    tagName: 'nav',
    elements: [
      {
        type: 'layout.fixedWrapper',
        elementOptions: {
          bgColor: data.bgColor,
          fgColor: data.fgColor,
          maxWidth: 'var(--fixedWidthMax)',
        },
        children: [...buttons],
        styles: {padding: '40px 0', ...baseStyles, ...data.styles},
      },
    ],
  },

  tag: 'pagination.forwardBack',
  tagOptions: data,
});
