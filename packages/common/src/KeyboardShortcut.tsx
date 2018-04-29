import * as React from 'react';

import styled from '@pinecast/styles';

export interface ShortcutKey {
  letter: string;
  metaKey?: boolean;
  optionKey?: boolean;
}

const Wrapper = styled('span', {display: 'inline-block', fontSize: '0.6em'});
const Spacer = styled('span', {margin: '0 0.25em'});

const userAgent = navigator.userAgent.toLowerCase();

const isMobile = userAgent.includes('mobile') || userAgent.includes('tablet');
const isMacOS = userAgent.includes('macintosh');
// const isWindows = userAgent.includes('windows');

function renderMeta() {
  if (isMacOS) {
    return '⌘';
  }
  return 'ctrl';
}
function renderOption() {
  if (isMacOS) {
    return '⌥';
  }
  return 'alt';
}

type AvailableStyles = {
  alignSelf?: React.CSSProperties['alignSelf'];
  color?: React.CSSProperties['color'];
  fontSize?: React.CSSProperties['fontSize'];
  fontWeight?: React.CSSProperties['fontWeight'];
  justifySelf?: React.CSSProperties['justifySelf'];
  letterSpacing?: React.CSSProperties['letterSpacing'];
  margin?: React.CSSProperties['margin'];
  marginBottom?: React.CSSProperties['marginBottom'];
  marginLeft?: React.CSSProperties['marginLeft'];
  marginRight?: React.CSSProperties['marginRight'];
  marginTop?: React.CSSProperties['marginTop'];
  opacity?: React.CSSProperties['opacity'];
  textDecoration?: React.CSSProperties['textDecoration'];
  textShadow?: React.CSSProperties['textShadow'];
  textTransform?: React.CSSProperties['textTransform'];
};

const KeyboardShortcut = ({
  style,
  ...shortcut
}: ShortcutKey & {style?: AvailableStyles}) => {
  if (isMobile) {
    return <span />;
  }
  const modifiers = [
    shortcut.metaKey ? renderMeta() : null,
    shortcut.optionKey ? renderOption() : null,
  ].filter(x => x);

  return (
    <Wrapper style={style}>
      {modifiers.reduce(
        (acc, cur) => (
          <React.Fragment>
            {cur}
            <Spacer>+</Spacer>
            {acc}
          </React.Fragment>
        ),
        <React.Fragment>{shortcut.letter.toUpperCase()}</React.Fragment>,
      )}
    </Wrapper>
  );
};

export default KeyboardShortcut;
