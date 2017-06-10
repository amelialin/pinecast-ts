import {BackgroundImage} from './primitives';
import {ComponentContext} from './componentContext';


export function backgroundImage(bgImage: BackgroundImage, ctx: ComponentContext): Object {
    if (!bgImage) {
        return null;
    }

    return {
        backgroundImage: bgImage.resourceId,
        backgroundSize: bgImage.sizing,
        backgroundRepeat: bgImage.repeat,
    };
};

export function alignment(alignment: 'left' | 'center' | 'right'): Object {
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
};
