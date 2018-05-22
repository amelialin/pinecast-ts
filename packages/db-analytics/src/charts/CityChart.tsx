const {Chart} = require('react-google-charts');
import * as React from 'react';

import CSVLink from '../CSVLink';
import {GranularGeographicData} from '../types';
import SubToolbar from './components/SubToolbar';

const header = ['Latitude', 'Longitude', 'Name', 'Count'];
const extractor = (x: {
  lat: string;
  lon: string;
  label: string;
  count: number;
}) => [+x.lat, +x.lon, x.label, x.count];

export default class CityChart extends React.Component {
  props: {
    data: GranularGeographicData;
  };

  getCSVData = () => {
    return [['City', 'Count'], ...this.props.data.map(d => [d.label, d.count])];
  };

  render() {
    const {data} = this.props;
    return (
      <React.Fragment>
        <SubToolbar>
          <CSVLink data={this.getCSVData} />
        </SubToolbar>
        <Chart
          chartType="GeoChart"
          data={[header, ...data.map(extractor)]}
          height="500px"
          options={{
            sizeAxis: {colors: ['white', 'green']},
            displayMode: 'markers',
            height: '500px',
            region: data[0].code, // Just a little hack
            width: null,
          }}
          width={null}
        />
      </React.Fragment>
    );
  }
}
