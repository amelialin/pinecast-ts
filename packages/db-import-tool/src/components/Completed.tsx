import * as React from 'react';

import Card from '@pinecast/common/Card';
import {CSS} from '@pinecast/styles';
import {DashboardTitle, P} from '@pinecast/common/Text';

const cardStyles: CSS = {
  margin: '20px auto 100px',
  maxWidth: 600,
};

export default class Completed extends React.PureComponent {
  props: {feedURL: string};

  render() {
    return (
      <Card style={cardStyles} whiteBack>
        <DashboardTitle>That's it.</DashboardTitle>
        <P>Your podcast has finished importing. Congratulations!</P>
        <P>There is only one final step: setting up a feed redirect.</P>
      </Card>
    );
  }
}
