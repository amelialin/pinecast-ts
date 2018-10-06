const {Chart} = require('react-google-charts');
import * as numeral from 'numeral';
import * as React from 'react';

import {
  defineMessages,
  FormattedMessage,
  injectIntl,
  InjectedIntlProps,
} from '@pinecast/i18n';
import Group from '@pinecast/common/Group';
import Switch from '@pinecast/common/Switch';
import {Table, TableHeaderCell, TableBodyCell} from '@pinecast/common/Table';

import CSVLink from '../CSVLink';
import {GranularGeographicData} from '../types';
import * as persist from '../persist';
import SubToolbar from './components/SubToolbar';

const messages = defineMessages({
  mapView: {
    id: 'db-analytics.CityChart.type.map',
    description: 'Option to view city chart as a map',
    defaultMessage: 'Map',
  },
  tableView: {
    id: 'db-analytics.CityChart.type.table',
    description: 'Option to view city chart as a table',
    defaultMessage: 'Table',
  },

  city: {
    id: 'db-analytics.CityChart.header.city',
    description: 'Heading for city column in a table',
    defaultMessage: 'City',
  },
  count: {
    id: 'db-analytics.CityChart.header.count',
    description: 'Heading for count column in a table',
    defaultMessage: 'Count',
  },
});

// These are for Google, not users
const header = ['Latitude', 'Longitude', 'Name', 'Count'];
const extractor = (x: {
  lat: string;
  lon: string;
  label: string;
  count: number;
}) => [+x.lat, +x.lon, x.label, x.count];

type OwnProps = {
  data: GranularGeographicData;
};
type Props = OwnProps & InjectedIntlProps;

class CityChart extends React.Component {
  props: Props;
  state: {showing: 'map' | 'table'} = {
    showing: persist.get('cityChart.chartType', 'map') as 'map' | 'table',
  };

  handleChartTypeChange = (checked: boolean) => {
    const val = checked ? 'table' : 'map';
    persist.set('cityChart.chartType', val);
    this.setState({showing: val});
  };

  getCSVData = () => {
    const {intl} = this.props;
    return [
      [intl.formatMessage(messages.city), intl.formatMessage(messages.count)],
      ...this.props.data.map(d => [d.label, d.count]),
    ];
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
                <TableHeaderCell>
                  <FormattedMessage {...messages.city} />
                </TableHeaderCell>
                <TableHeaderCell style={{textAlign: 'right'}}>
                  <FormattedMessage {...messages.count} />
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

export default injectIntl(CityChart) as React.ComponentType<OwnProps>;
