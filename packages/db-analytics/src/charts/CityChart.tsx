const {Chart} = require('react-google-charts');
import * as numeral from 'numeral';
import * as React from 'react';

import Group from '@pinecast/common/Group';
import Switch from '@pinecast/common/Switch';
import {Table, TableHeaderCell, TableBodyCell} from '@pinecast/common/Table';

import CSVLink from '../CSVLink';
import {GranularGeographicData} from '../types';
import * as persist from '../persist';
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
  state: {showing: 'map' | 'table'} = {
    showing: persist.get('cityChart.chartType', 'map') as 'map' | 'table',
  };

  handleChartTypeChange = (checked: boolean) => {
    const val = checked ? 'table' : 'map';
    persist.set('cityChart.chartType', val);
    this.setState({showing: val});
  };

  getCSVData = () => {
    return [['City', 'Count'], ...this.props.data.map(d => [d.label, d.count])];
  };

  render() {
    const {data} = this.props;
    const {showing} = this.state;
    return (
      <React.Fragment>
        <SubToolbar>
          <Group spacing={16}>
            <Switch
              activeColor="#708d9e"
              checked={showing === 'table'}
              offText="Map"
              onChange={this.handleChartTypeChange}
              style={{paddingBottom: 0}}
              text="Table"
            />
            <CSVLink data={this.getCSVData} />
          </Group>
        </SubToolbar>
        {showing === 'map' ? (
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
        ) : (
          <Table style={{marginBottom: 0}}>
            <thead>
              <tr>
                <TableHeaderCell>City</TableHeaderCell>
                <TableHeaderCell style={{textAlign: 'right'}}>
                  Count
                </TableHeaderCell>
              </tr>
            </thead>
            <tbody>
              {data
                .slice(0)
                .sort((a, b) => b.count - a.count)
                .map(({label, count}, i) => {
                  return (
                    <tr key={i}>
                      <TableBodyCell>{label}</TableBodyCell>
                      <TableBodyCell style={{textAlign: 'right'}}>
                        {numeral(count).format('0,0')}
                      </TableBodyCell>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
        )}
      </React.Fragment>
    );
  }
}
