import {ElementLayout} from '../primitives';
import {ComponentContext, getsContext} from '../componentContext';

import renderElements from '../elements';

export default getsContext(
  ({template}: {template: ElementLayout}, {ctx}: {ctx: ComponentContext}) =>
    renderElements('root', ctx.data, template),
);
