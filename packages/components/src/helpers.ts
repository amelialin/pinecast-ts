import {ComponentContext} from './componentContext';


export function formatColor(color: string | null | undefined, ctx: ComponentContext): string {
    if (!color) {
        return null;
    }
    if (color[0] === '#') {
        return color;
    }
    return ctx.colors[color];
};
