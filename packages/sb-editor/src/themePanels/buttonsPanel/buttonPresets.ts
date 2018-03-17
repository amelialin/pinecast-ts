import * as React from 'react';

export interface Preset {
  name: string;
  style: React.CSSProperties;
}

const presets: Array<Preset> = [
  {
    name: 'Material',
    style: {
      borderRadius: 2,
      boxShadow:
        '0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12)',
      fontSize: 16,
      padding: '0.75em 1.5em',
      transition: 'box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1)',

      ':hover': {
        boxShadow:
          '0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)',
      },
      ':active': {
        boxShadow:
          '0px 5px 5px -3px rgba(0, 0, 0, 0.2), 0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12)',
      },
    },
  },
  {
    name: 'Candy',
    style: {
      backgroundImage:
        'linear-gradient(180deg, var(--color-buttons) 0, rgba(225, 255, 255, 0.25) 100%)',
      borderWidth: 0,
      borderBottomWidth: 4,
      borderColor: 'buttons',
      borderRadius: '7px 7px 9px 9px',
      boxShadow:
        '0 -1px 1px 0 rgba(255,255,255,0.701961) inset, 0 1px 1px 0 var(--color-buttons)',
      fontSize: 16,
      padding: '0.75em 1.5em',
      position: 'relative',
      textShadow: '0 1px 1px rgba(0, 0, 0, 0.5)',
      top: 0,
      transition: 'all 30ms cubic-bezier(0.42, 0, 0.58, 1)',

      ':hover': {
        backgroundImage:
          'linear-gradient(180deg, rgba(225, 255, 255, 0.1) 0, rgba(225, 255, 255, 0.35) 100%)',
      },
      ':active': {
        boxShadow: '0 0 0 0 transparent inset, 0 0 0 var(--color-buttons)',
        top: 2,
      },
    },
  },
  {
    name: 'Evergreen',
    style: {
      borderRadius: 2,
      boxShadow: 'rgba(0, 0, 0, 0.25) 0px -3px 0px 0px inset',
      fontSize: 16,
      fontWeight: 500,
      padding: '0.75em 1.5em calc(0.75em + 2px)',
      position: 'relative',
      textTransform: 'uppercase',
      top: 0,
      transition: 'top 0.2s',

      ':active': {
        top: 2,
      },
    },
  },
  {
    name: 'Flat',
    style: {
      backgroundImage:
        'linear-gradient(180deg, transparent 0, transparent 100%)',
      borderRadius: 3,
      boxShadow: 'none',
      fontSize: 16,
      padding: '0.75em 1.5em',
      transition: 'background-image 0.2s',

      ':hover': {
        backgroundImage:
          'linear-gradient(180deg, rgba(255, 255, 255, 0.1) 0, transparent 100%)',
      },
      ':active': {
        backgroundImage:
          'linear-gradient(180deg, rgba(0, 0, 0, 0.1) 0, transparent 100%)',
      },
    },
  },
  {
    name: 'Pill',
    style: {
      borderRadius: 100,
      boxShadow: 'none',
      fontSize: 16,
      padding: '0.65em 2em',
      transform: 'scale(1)',
      transition: 'transform 0.2s',

      ':hover': {
        transform: 'scale(1.05)',
      },
      ':active': {
        transform: 'scaleX(0.9)',
      },
    },
  },
  {
    name: 'Isometric',
    style: {
      borderRadius: 0,
      boxShadow: 'none',
      fontSize: 16,
      left: 0,
      padding: '1em 1.5em',
      position: 'relative',
      top: 0,
      transition: 'top 0.2s, left 0.2s',

      ':active': {
        left: 4,
        outline: 0,
        top: 4,
      },

      ':before': {
        backgroundColor: 'buttons',
        backgroundImage:
          'linear-gradient(to top right, rgba(0, 0, 0, 0.2) 0, rgba(0, 0, 0, 0.2) 100%)',
        bottom: -8,
        content: '""',
        height: 8,
        left: 4,
        position: 'absolute',
        transform: 'skewX(45deg)',
        transition: 'height 0.2s, left 0.2s, bottom 0.2s',
        width: '100%',
      },
      ':after': {
        backgroundColor: 'buttons',
        backgroundImage:
          'linear-gradient(to top right, rgba(0, 0, 0, 0.275) 0, rgba(0, 0, 0, 0.275) 100%)',
        bottom: -5,
        content: '""',
        height: '100%',
        position: 'absolute',
        right: -8,
        transform: 'skewY(45deg)',
        transition: 'width 0.2s, right 0.2s, bottom 0.2s',
        width: 8,
      },

      ':active:before': {
        bottom: -4,
        height: 4,
        left: 2,
      },
      ':active:after': {
        bottom: -3,
        right: -4,
        width: 4,
      },
    },
  },
  {
    name: 'Glitch',
    style: {
      borderRadius: 0,
      boxShadow: 'none',
      fontSize: 16,
      padding: '1em 1.5em',
      position: 'relative',
      textTransform: 'uppercase',
      top: 0,
      transition: 'top 0.2s',

      ':active': {
        outline: 0,
        top: 4,
      },

      ':before': {
        backgroundColor: 'buttons',
        backgroundImage:
          'linear-gradient(to top right, rgba(0, 0, 0, 0.2) 0, rgba(0, 0, 0, 0.2) 100%)',
        bottom: -5,
        content: '""',
        height: 5,
        left: 0,
        position: 'absolute',
        transition: 'height 0.2s, bottom 0.2s',
        width: '100%',
      },
      ':after': {
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        bottom: -5,
        content: '""',
        height: '100%',
        position: 'absolute',
        right: -5,
        transition: 'width 0.2s, right 0.2s, bottom 0.2s',
        width: 5,
      },

      ':active:before': {
        bottom: -2,
        height: 2,
      },
      ':active:after': {
        bottom: -2,
        right: -2,
        width: 2,
      },
    },
  },
  {
    name: 'Slant',
    style: {
      borderRadius: 0,
      boxShadow: 'none',
      fontSize: 16,
      margin: '0 10px',
      padding: '1em 30px',
      position: 'relative',
      zIndex: 2,

      ':before': {
        backgroundColor: 'buttons',
        bottom: 0,
        content: '""',
        display: 'block',
        right: -5,
        position: 'absolute',
        top: 0,
        transform: 'skewX(-10deg)',
        transition: 'left 0.2s, right 0.2s',
        width: 20,
        zIndex: 0,
      },
      ':after': {
        backgroundColor: 'buttons',
        bottom: 0,
        content: '""',
        display: 'block',
        left: -5,
        position: 'absolute',
        top: 0,
        transform: 'skewX(-10deg)',
        transition: 'left 0.2s, right 0.2s',
        width: 20,
        zIndex: 0,
      },

      ':hover:before': {
        right: -10,
      },
      ':hover:after': {
        left: -10,
      },
      ':active:before': {
        right: -7,
      },
      ':active:after': {
        left: -7,
      },
    },
  },
];
export default presets;
