import * as React from 'react';

import styled from '@pinecast/styles';

const styleNames: Partial<
  {[identifier in keyof React.CSSProperties]: React.ReactNode}
> = {
  boxShadow: 'Drop shadow',
};

const Wrapper = styled('dl', {
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  padding: 0,
});
const Key = styled('dt');
const Value = styled('dd');

class StyleNugget extends React.Component {
  props: {
    identifier: keyof React.CSSProperties;
  };
  render() {
    return (
      <React.Fragment>
        <Key>{styleNames[this.props.identifier]}</Key>
        <Value />
      </React.Fragment>
    );
  }
}

export default class StyleEditor extends React.Component {
  props: {
    allowedStyles: Array<keyof React.CSSProperties>;
  };

  static defaultProps: Partial<StyleEditor['props']> = {
    allowedStyles: ['boxShadow'],
  };
  render() {
    return (
      <Wrapper>
        {this.props.allowedStyles.map(ident => (
          <StyleNugget identifier={ident} />
        ))}
      </Wrapper>
    );
  }
}
