const {Chart} = require('react-google-charts');
import * as numeral from 'numeral';
import * as React from 'react';

import {defineMessages, FormattedMessage} from '@pinecast/i18n';
import Group from '@pinecast/common/Group';
import Switch from '@pinecast/common/Switch';
import {Table, TableHeaderCell, TableBodyCell} from '@pinecast/common/Table';

import CSVLink from '../CSVLink';
import {GeographicData} from '../types';
import * as persist from '../persist';
import SubToolbar from './components/SubToolbar';

const messages = defineMessages({
  mapView: {
    id: 'db-analytics.CountryChart.type.map',
    description: 'Option to view country chart as a map',
    defaultMessage: 'Map',
  },
  tableView: {
    id: 'db-analytics.CountryChart.type.table',
    description: 'Option to view country chart as a table',
    defaultMessage: 'Table',
  },

  country: {
    id: 'db-analytics.CountryChart.header.country',
    description: 'Heading for country column in a table',
    defaultMessage: 'Country',
  },
  code: {
    id: 'db-analytics.CountryChart.header.code',
    description: 'Heading for country code column in a table',
    defaultMessage: 'Country code',
  },
  count: {
    id: 'db-analytics.CountryChart.header.count',
    description: 'Heading for count column in a table',
    defaultMessage: 'Count',
  },
});

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
              offText={<FormattedMessage {...messages.mapView} />}
              onChange={this.handleChartTypeChange}
              style={{paddingBottom: 0}}
              text={<FormattedMessage {...messages.tableView} />}
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
                <TableHeaderCell>
                  <FormattedMessage {...messages.country} />
                </TableHeaderCell>
                <TableHeaderCell>
                  <FormattedMessage {...messages.code} />
                </TableHeaderCell>
                <TableHeaderCell style={{textAlign: 'right'}}>
                  <FormattedMessage {...messages.count} />
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
