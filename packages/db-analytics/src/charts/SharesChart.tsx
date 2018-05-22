import * as React from 'react';

import styled from '@pinecast/styles';

import CSVLink from '../CSVLink';
import {BreakdownData} from '../types';
import SubToolbar from './components/SubToolbar';

const Wrapper = styled('div', {});

export default class SharesChart extends React.Component {
  props: {
    data: BreakdownData;
  };

  getCSVData = () => {
    const {data} = this.props;
    const total = data.reduce((acc, cur) => acc + cur.value, 0);
    return [
      ['Type', 'Count', 'Percentage'],
      ...data.map(d => [d.label, d.value, d.value / total]),
    ];
  };

  render() {
    return (
      <React.Fragment>
        <SubToolbar>
          <CSVLink data={this.getCSVData} />
        </SubToolbar>
        <Wrapper />
      </React.Fragment>
    );
  }
}
