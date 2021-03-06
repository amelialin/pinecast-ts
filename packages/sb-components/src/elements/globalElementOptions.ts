import {CSS} from '@pinecast/styles';
import {Sub} from '@pinecast/common/types';

export type PositionObject = {
  bottom?: number;
  left?: number;
  location: 'absolute' | 'relative' | 'fixed';
  right?: number;
  top?: number;
};

export default function(
  acc: Sub<CSS> | null,
  elementOptions:
    | {[option: string]: string | number | PositionObject}
    | null
    | undefined,
): CSS | null {
  if (!elementOptions || !acc) {
    return acc;
  }
  return Object.entries(elementOptions).reduce((acc, [cur, value]) => {
    switch (cur) {
      case 'alignX':
        switch (value) {
          case 'left':
            acc.marginRight = 'auto';
            break;
          case 'center':
            acc.marginLeft = 'auto';
            acc.marginRight = 'auto';
            break;
          case 'right':
            acc.marginLeft = 'auto';
            break;
        }
        break;
      case 'innerAlignX':
        switch (value) {
          case 'left':
            if (acc.flexDirection === 'column') {
              acc.justifyContent = 'flex-start';
            } else {
              acc.alignItems = 'flex-start';
            }
            acc.textAlign = 'left';
            break;
          case 'center':
            if (acc.flexDirection === 'column') {
              acc.justifyContent = 'center';
            } else {
              acc.alignItems = 'center';
            }
            acc.textAlign = 'center';
            break;
          case 'right':
            if (acc.flexDirection === 'column') {
              acc.justifyContent = 'flex-end';
            } else {
              acc.alignItems = 'flex-end';
            }
            acc.textAlign = 'right';
            break;
        }
        break;
      case 'position':
        const {location, ...positioning} = value as PositionObject;
        acc.position = location;
        acc.bottom = 'bottom' in positioning ? positioning.bottom : acc.bottom;
        acc.left = 'left' in positioning ? positioning.left : acc.left;
        acc.right = 'right' in positioning ? positioning.right : acc.right;
        acc.top = 'top' in positioning ? positioning.top : acc.top;
        if ((positioning as Sub<typeof positioning>)['@mobile']) {
          const posMob = (positioning as Sub<typeof positioning>)['@mobile'];
          const accMob: Sub<CSS> = acc['@mobile'] || {};
          acc['@mobile'] = {
            ...accMob,
            bottom: 'bottom' in posMob ? posMob.bottom : accMob.bottom,
            left: 'left' in posMob ? posMob.left : accMob.left,
            right: 'right' in posMob ? posMob.right : accMob.right,
            top: 'top' in posMob ? posMob.top : accMob.top,
          } as any;
        }
        break;
      case 'underlineOnHover':
        acc[':hover'] = {
          ...acc[':hover'],
          textDecoration: 'underline',
        };
    }
    return acc;
  }, acc);
}
