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
    name: 'Ghost',
    style: {
      background: 'rgba(255, 255, 255, 0.5)',
      border: '2px solid #000',
      fontSize: 16,
      padding: '0.5em 1em',
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
