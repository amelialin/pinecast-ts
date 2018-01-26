import * as React from 'react';
import * as PropTypes from 'prop-types';

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
): React.ComponentType<any> {
  // Basic validation
  if (elemType.toLowerCase() !== elemType) {
    throw new Error(
      `You aren't using lowercase letters for your element name. ${elemType.toLowerCase()} != ${elemType}`,
    );
  }

  return class StyledElement extends React.PureComponent {
    props: {
      className?: string;
      style?: React.CSSProperties;
      [key: string]: any;
    };

    static contextTypes = {
      styletron: PropTypes.object,
    };
    static defaultProps = defaultProps;
    static displayName = `Styled(${elemType})`;

    render() {
      const {className, style, ...ownProps} = this.props;
      const styleResult = {};
      if (typeof props === 'function') {
        Object.assign(styleResult, props(ownProps), style);
      } else {
        Object.assign(styleResult, props, style);
      }

      for (const key in ownProps) {
        if (key[0] === '$') {
          delete ownProps[key];
        }
      }

      const styletronClassNames: string = su.injectStyle(
        this.context.styletron,
        styleResult,
      );
      if (className) {
        ownProps.className = `${styletronClassNames} ${className}`;
      } else {
        ownProps.className = styletronClassNames;
      }
      return React.createElement(elemType, ownProps);
    }
  };
}
