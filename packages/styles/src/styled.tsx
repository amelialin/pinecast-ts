import * as React from 'react';
import {styled} from 'styletron-react';

// This is a hack to disable Styletron's built-in autoprefixing.
declare function require(name: string);
const su = require('styletron-utils');
su.injectStylePrefixed = (styletron, styles, media, pseudo) =>
  su.injectStyle(styletron, styles, media, pseudo);

function wrapCtx(
  comp: React.StatelessComponent<any>,
  from: React.StatelessComponent,
) {
  comp.contextTypes = from.contextTypes;
  comp.displayName = `styledWrapper(${from.displayName})`;
}

const styleIdentity = ({$style}) => $style;

export default function(
  elemType: string,
  props?:
    | React.CSSProperties
    | ((props: any, ctx?: any) => React.CSSProperties)
    | null,
  defaultProps?: React.HTMLProps<any>,
): React.StatelessComponent<any> {
  // Basic validation
  if (elemType.toLowerCase() !== elemType) {
    throw new Error(
      `You aren't using lowercase letters for your element name. ${elemType.toLowerCase()} != ${elemType}`,
    );
  }

  let StyledComponent;
  if (!props) {
    StyledComponent = styled(elemType, styleIdentity);
  } else if (typeof props === 'object') {
    StyledComponent = styled(elemType, ({$style}) => ({...props, ...$style}));
  } else if (typeof props === 'function') {
    StyledComponent = styled(elemType, ({$style, ...rest}) => ({
      ...props(rest),
      ...$style,
    }));
  } else {
    throw new Error('Unrecognized style prop, typeof ${typeof props}');
  }

  StyledComponent.displayName = `styled(${elemType})`;
  StyledComponent.defaultProps = defaultProps;

  const out = (
    {
      style,
      ...props,
    }: {
      style?: React.CSSProperties;
      [prop: string]: any;
    },
    ctx: any,
  ) => {
    if (style) {
      return <StyledComponent $style={style} {...props} />;
    }
    if (defaultProps) {
      return StyledComponent({...defaultProps, ...props}, ctx);
    }
    return StyledComponent(props, ctx);
  };
  wrapCtx(out, StyledComponent);
  return out;
}
