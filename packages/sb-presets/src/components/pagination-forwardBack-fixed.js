import {buttons, styles as baseStyles} from './paginationHelpers/previousNext';

export default (data = {}) => {
  const {
    elementOptions = {},
    nextText = 'Back in time',
    previousText = 'Onward to the future',
    styles = {},
  } = data;
  return {
    type: 'pagination.forwardBack',
    layout: {
      nextText: nextText,
      previousText: previousText,
    },
    template: {
      tagName: 'nav',
      elements: [
        {
          type: 'layout.fixedWrapper',
          elementOptions: elementOptions,
          children: [...buttons],
          styles: {padding: '40px 0', ...baseStyles, ...styles},
        },
      ],
    },

    tag: 'pagination.forwardBack',
    tagOptions: {
      elementOptions,
      nextText,
      previousText,
      styles,
      ...data,
    },
  };
};
