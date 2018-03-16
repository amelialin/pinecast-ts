import * as React from 'react';
import * as PropTypes from 'prop-types';

import {CSS, CSSProperties} from './types';

declare function require(name: string);
const su = require('styletron-utils');

function wrapCtx(
  comp: React.StatelessComponent<any>,
  from: React.StatelessComponent,
) {
  comp.contextTypes = from.contextTypes;
  comp.displayName = `styledWrapper(${from.displayName})`;
}

const styleIdentity = ({$style}) => $style;

type HTMLProps = React.AllHTMLAttributes<any>;
type StyledProps = {
  className?: string;
  style?: CSS;
} & HTMLProps & {[key: string]: any};

function styled(elemType: string): React.ComponentType<StyledProps>;
function styled(
  elemType: string,
  props: CSSProperties, // FIXME: This should be CSS, but Typescript doesn't like it
  defaultProps?: HTMLProps,
): React.ComponentType<StyledProps>;
function styled<T>(
  elemType: string,
  props: (props: T) => CSS,
  defaultProps?: HTMLProps,
): React.ComponentType<T & StyledProps>;

function styled<T>(
  elemType: string,
  props?: CSS | ((props: T) => CSS),
  defaultProps?: HTMLProps,
): React.ComponentType<T & StyledProps> {
  // Basic validation
  if (process.env.NODE_ENV !== 'production') {
    if (elemType.toLowerCase() !== elemType) {
      throw new Error(
        `You aren't using lowercase letters for your element name. ${elemType.toLowerCase()} != ${elemType}`,
      );
    }
    if (elemType.includes('-')) {
      throw new Error(
        `You used a hyphen in your element name. No web components: ${elemType}`,
      );
    }
  }

  return (class StyledElement extends React.PureComponent {
    props: T & StyledProps;

    static contextTypes = {
      styletron: PropTypes.object,
    };
    static defaultProps = defaultProps;
    static displayName = `Styled(${elemType})`;

    render() {
      const {className, style, ...ownProps} = this.props as StyledProps;
      const styleResult = {};
      if (typeof props === 'function') {
        Object.assign(styleResult, props(ownProps as T), style);
      } else if (!props) {
        if (style) {
          Object.assign(styleResult, style);
        }
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
        (ownProps as any).className = `${styletronClassNames} ${className}`;
      } else {
        (ownProps as any).className = styletronClassNames;
      }
      return React.createElement(elemType, ownProps);
    }
  } as any) as React.ComponentType<T & StyledProps>;
}

export default styled;
