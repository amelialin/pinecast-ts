import * as React from 'react';

import {StyletronProvider} from 'styletron-react';

import ClientStyletron from './ClientStyletron';
import ServerStyletron from './ServerStyletron';
import styled from './styled';

export default styled;
export {ClientStyletron, ServerStyletron, StyletronProvider, styled};

export type CSSPropertiesWithMedia = React.CSSProperties & {
  [mediaQuery: string]: React.CSSProperties;
};

export type CSS = CSSPropertiesWithMedia & {
  ':active'?: CSSPropertiesWithMedia;
  ':focus'?: CSSPropertiesWithMedia;
  ':hover'?: CSSPropertiesWithMedia;
  ':visited'?: CSSPropertiesWithMedia;

  ':first-child'?: CSSPropertiesWithMedia;
  ':last-child'?: CSSPropertiesWithMedia;

  ':after'?: CSSPropertiesWithMedia & {content: string};
  ':before'?: CSSPropertiesWithMedia & {content: string};
  ':active:before'?: CSSPropertiesWithMedia & {content: string};
  ':focus:before'?: CSSPropertiesWithMedia & {content: string};
  ':hover:before'?: CSSPropertiesWithMedia & {content: string};
  ':active:after'?: CSSPropertiesWithMedia & {content: string};
  ':focus:after'?: CSSPropertiesWithMedia & {content: string};
  ':hover:after'?: CSSPropertiesWithMedia & {content: string};
};
