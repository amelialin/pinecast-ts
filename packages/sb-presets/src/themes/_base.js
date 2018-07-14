export default {
  textStyles: {
    logo: {
      color: 'accent',
      fontFamily: 'logo',
      fontSize: 50,
    },
    subtitle: {
      color: 'secondaryAccent',
      fontFamily: 'headings',
      fontSize: 30,
    },
    pageHeading: {},
    navigationLinks: {
      color: 'links',
      textDecoration: 'none',

      ':hover': {
        textDecoration: 'underline',
      },
    },
    itemHeading: {},
    itemSubtitle: {},
    itemSecondary: {},
    itemSummary: {},
    footerText: {},

    heroItemSecondary: {
      color: 'foreground',
      fontWeight: 500,
      fontSize: 16,
    },
    heroItemHeading: {
      color: 'secondaryAccent',
      fontWeight: 500,
      fontSize: 20,
    },
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
      fontSize: 16,
    },
  },

  options: {
    fixedWidthMax: null,
    rootFlexibleHeight: true,
    defaultConsumeCount: 10,
  },
};
