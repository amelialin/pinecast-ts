const {Chart} = require('react-google-charts');
import * as numeral from 'numeral';
import * as React from 'react';

import Group from '@pinecast/common/Group';
import Switch from '@pinecast/common/Switch';
import {Table, TableHeaderCell, TableBodyCell} from '@pinecast/common/Table';

import CSVLink from '../CSVLink';
import {GeographicData} from '../types';
import * as persist from '../persist';
import SubToolbar from './components/SubToolbar';

export default class CountryChart extends React.Component {
  props: {
    data: GeographicData;
  };
  state: {showing: 'map' | 'table'} = {
    showing: persist.get('countryChart.chartType', 'map') as 'map' | 'table',
  };

  handleChartTypeChange = (checked: boolean) => {
    const val = checked ? 'table' : 'map';
    persist.set('countryChart.chartType', val);
    this.setState({showing: val});
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
            <CSVLink data={() => data} />
          </Group>
        </SubToolbar>
        {showing === 'map' ? (
          <Chart
            chartType="GeoChart"
            data={data}
            height="500px"
            options={{height: '600px', width: null}}
            width={null}
          />
        ) : (
          <Table style={{marginBottom: 0}}>
            <thead>
              <tr>
                <TableHeaderCell>Country</TableHeaderCell>
                <TableHeaderCell>Country code</TableHeaderCell>
                <TableHeaderCell style={{textAlign: 'right'}}>
                  Count
                </TableHeaderCell>
              </tr>
            </thead>
            <tbody>
              {data
                .slice(1)
                .sort((a, b) => (b[2] as number) - (a[2] as number))
                .map(([code, country, count], i) => {
                  return (
                    <tr key={i}>
                      <TableBodyCell>{country}</TableBodyCell>
                      <TableBodyCell>{code}</TableBodyCell>
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
