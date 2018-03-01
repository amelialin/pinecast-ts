import * as React from 'react';

import {StyletronProvider} from 'styletron-react';

import ClientStyletron from './ClientStyletron';
import ServerStyletron from './ServerStyletron';
import styled from './styled';

export default styled;
export {ClientStyletron, ServerStyletron, StyletronProvider, styled};

export type CSSProperties = React.CSSProperties;

export interface CSS extends CSSProperties {
  ':active'?: CSSProperties;
  ':focus'?: CSSProperties;
  ':hover'?: CSSProperties;
  ':visited'?: CSSProperties;

  ':first-child'?: CSSProperties;
  ':last-child'?: CSSProperties;

  ':after'?: CSSProperties & {content: string};
  ':before'?: CSSProperties & {content: string};
  ':active:before'?: CSSProperties & {content: string};
  ':focus:before'?: CSSProperties & {content: string};
  ':hover:before'?: CSSProperties & {content: string};
  ':active:after'?: CSSProperties & {content: string};
  ':focus:after'?: CSSProperties & {content: string};
  ':hover:after'?: CSSProperties & {content: string};

  '@media(mobile)'?: CSS;
}
