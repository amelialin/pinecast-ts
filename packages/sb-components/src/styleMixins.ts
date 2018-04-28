import {BackgroundImage} from './primitives';
import {ComponentContext} from './componentContext';

export function backgroundImage(
  bgImage: BackgroundImage,
  ctx: ComponentContext,
): React.CSSProperties | null {
  if (!bgImage) {
    return null;
  }

  return {
    backgroundImage: ctx.resources[bgImage.resourceId],
    backgroundSize: bgImage.sizing,
    backgroundRepeat: bgImage.repeat,
  };
}

export function alignment(
  alignment: 'left' | 'center' | 'right',
): React.CSSProperties | null {
  if (!alignment) {
    return null;
  }

  if (alignment === 'left') {
    return {marginRight: 'auto'};
  }
  if (alignment === 'right') {
    return {marginLeft: 'auto'};
  }
  if (alignment === 'center') {
    return {marginLeft: 'auto', marginRight: 'auto'};
  }

  throw new Error(`Unrecognized alignment ${alignment}`);
}
