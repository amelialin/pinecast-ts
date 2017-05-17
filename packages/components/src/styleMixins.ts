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
