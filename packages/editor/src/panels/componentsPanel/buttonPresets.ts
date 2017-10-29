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
      fontSize: 14,
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
        'linear-gradient(180deg, var(--color-buttons) 0, rgb(225,157,60) 100%), rgb(253, 218, 134)',
      borderWidth: 0,
      borderBottomWidth: 4,
      borderColor: 'buttons',
      borderRadius: '7px 7px 9px 9px',
      boxShadow:
        '0 -1px 1px 0 rgba(255,255,255,0.701961) inset, 0 1px 1px 0 var(--color-buttons)',
      fontSize: 16,
      padding: '0.75em 1.5em',
      textShadow: '0 1px 1px rgba(0, 0, 0, 0.5)',
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
];
export default presets;
