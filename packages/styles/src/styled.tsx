import * as React from 'react';
import * as PropTypes from 'prop-types';

import {renderExampleMode} from './exampleMode';
import {CSS, Omit, PseudoElementType} from './types';

const isFirefox =
  typeof navigator !== 'undefined' && navigator.userAgent.includes('Gecko/');
const isEdge =
  typeof navigator !== 'undefined' && navigator.userAgent.includes('Edge/');

declare function require(
  name: 'styletron-utils',
): {injectStyle(styletron: Object, declarations: Object): string};
const su = require('styletron-utils');

declare var process: {env: {[key: string]: string}};

export type HTMLProps = Omit<React.AllHTMLAttributes<any>, 'style'>;
export type StyledProps = {
  className?: string;
  onRef?: (el: SVGElement | HTMLElement | null) => void;
  style?: CSS;
} & HTMLProps & {[key: string]: any};

function styled(elemType: string): React.ComponentType<StyledProps>;
function styled<T>(
  elemType: string,
  props: CSS | {[key: string]: string | number | CSS | undefined},
  defaultProps?: HTMLProps,
): React.ComponentType<StyledProps>;
function styled<T>(
  elemType: string,
  props: (props: T) => CSS,
  defaultProps?: HTMLProps,
): React.ComponentType<T & StyledProps>;

function styled<T>(
  elemType: string,
  props?: CSS | {[key in keyof CSS]: CSS[key] | CSS} | ((props: T) => CSS),
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
      const {className, onRef, style, ...ownProps} = this.props as StyledProps;
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

      if (isFirefox) {
        for (const key in styleResult) {
          if (key.includes('-webkit')) {
            delete (styleResult as any)[key];
          }
        }
      }
      if (isEdge) {
        for (const key in styleResult) {
          if (key.includes('::placeholder') || key.includes('-webkit')) {
            delete (styleResult as any)[key];
          }
        }
      }
      if (process.env.NODE_ENV !== 'production') {
        const sr = styleResult as CSS;
        ([':before', ':after', '::before', '::after'] as Array<
          keyof CSS
        >).forEach(pseudoElement => {
          const pe: PseudoElementType | undefined = sr[pseudoElement] as any;
          if (!pe || pe.content == null) {
            return;
          }
          if (typeof pe.content !== 'string') {
            console.error(
              "Pseudo-element 'content' descriptor must not be a number.",
            );
            return;
          }
          if (
            !(
              (pe.content.startsWith('attr(') && pe.content.endsWith(')')) ||
              (pe.content.startsWith('"') && pe.content.endsWith('"')) ||
              (pe.content.startsWith("'") && pe.content.endsWith("'"))
            )
          ) {
            console.error(
              `Pseudo-element 'content' descriptor must be either attr() function or a string; got '${
                pe.content
              }' instead.`,
            );
          }
        });
      }
      if (onRef) {
        (ownProps as any).ref = onRef;
      }

      if (this.context.styletron.exampleMode) {
        return renderExampleMode(elemType, className, ownProps, styleResult);
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
