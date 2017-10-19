import * as hyphenateStyleName from 'fbjs/lib/hyphenateStyleName';
import {isUnitlessNumber} from 'react-dom/lib/CSSProperty';

export const unitlessCSSProperties = new Set<string>();
Object.keys(isUnitlessNumber).forEach(key =>
  unitlessCSSProperties.add(hyphenateStyleName(key)),
);

// NOTE: This is a special exception, because there's almost literally no
// reason to use a unitless value with line-height, and it's a source of many
// errors.
unitlessCSSProperties.delete('line-height');
