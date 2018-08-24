const hyphenateStyleName = require('fbjs/lib/hyphenateStyleName');

const isUnitlessNumber = {
  animationIterationCount: true,
  borderImageOutset: true,
  borderImageSlice: true,
  borderImageWidth: true,
  boxFlex: true,
  boxFlexGroup: true,
  boxOrdinalGroup: true,
  columnCount: true,
  columns: true,
  flex: true,
  flexGrow: true,
  flexPositive: true,
  flexShrink: true,
  flexNegative: true,
  flexOrder: true,
  gridRow: true,
  gridRowEnd: true,
  gridRowSpan: true,
  gridRowStart: true,
  gridColumn: true,
  gridColumnEnd: true,
  gridColumnSpan: true,
  gridColumnStart: true,
  fontWeight: true,
  lineClamp: true,
  lineHeight: true,
  opacity: true,
  order: true,
  orphans: true,
  tabSize: true,
  widows: true,
  zIndex: true,
  zoom: true,

  // SVG-related properties
  fillOpacity: true,
  floodOpacity: true,
  stopOpacity: true,
  strokeDasharray: true,
  strokeDashoffset: true,
  strokeMiterlimit: true,
  strokeOpacity: true,
  strokeWidth: true,
};

export const unitlessCSSProperties = new Set<string>(
  Object.keys(isUnitlessNumber).map(name => hyphenateStyleName(name)),
);

// NOTE: This is a special exception, because there's almost literally no
// reason to use a unitless value with line-height, and it's a source of many
// errors.
unitlessCSSProperties.delete('line-height');

export function compile(rule: string): string {
  const [prop, val] = rule.split(':', 2);
  if (!/^\-?\d+(\.\d+)?$/.exec(val) || unitlessCSSProperties.has(prop)) {
    return rule;
  }
  return `${prop}:${val}px`;
}
