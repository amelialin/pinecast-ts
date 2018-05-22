const {Chart} = require('react-google-charts');
import * as React from 'react';

import CSVLink from '../CSVLink';
import {GeographicData} from '../types';
import SubToolbar from './components/SubToolbar';

export default class CountryChart extends React.Component {
  props: {
    data: GeographicData;
  };

  render() {
    const {data} = this.props;
    return (
      <React.Fragment>
        <SubToolbar>
          <CSVLink data={() => data} />
        </SubToolbar>
        <Chart
          chartType="GeoChart"
          data={data}
          height="500px"
          options={{height: '600px', width: null}}
          width={null}
        />
      </React.Fragment>
    );
  }
}
