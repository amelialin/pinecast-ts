import * as React from 'react';

import Link from '@pinecast/common/Link';
import {
  Table as CommonTable,
  TableHeaderCell,
  TableBodyCell,
} from '@pinecast/common/Table';

import CSVLink from '../CSVLink';
import SubToolbar from './components/SubToolbar';
import {TabularData} from '../types';

export default class Table extends React.Component {
  props: {
    data: TabularData;
  };

  getCSVData = () => {
    const [headers, ...rows] = this.props.data;
    return [
      headers as Array<string>,
      ...rows.map(([label, ...cols]): Array<string | number> => {
        if (typeof label === 'string') {
          return [label, ...(cols as Array<string | number>)];
        }
        return [
          `${label.title} - ${label.href}`,
          ...(cols as Array<string | number>),
        ];
      }),
    ];
  };

  render() {
    const [headers, ...rows] = this.props.data;
    return (
      <React.Fragment>
        <SubToolbar>
          <CSVLink data={this.getCSVData} />
        </SubToolbar>
        <CommonTable style={{marginBottom: 0}}>
          <thead>
            <tr>
              {headers.map((header, i) => (
                <TableHeaderCell
                  key={i}
                  style={{textAlign: i > 0 ? 'right' : undefined}}
                >
                  {header}
                </TableHeaderCell>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map(([label, body], i) => {
              return (
                <tr key={i}>
                  <TableBodyCell>
                    {typeof label === 'string' ? (
                      label
                    ) : (
                      <Link
                        href={label.href}
                        style={{textDecoration: 'underline'}}
                      >
                        {label.title}
                      </Link>
                    )}
                  </TableBodyCell>
                  <TableBodyCell style={{textAlign: 'right'}}>
                    {body}
                  </TableBodyCell>
                </tr>
              );
            })}
          </tbody>
        </CommonTable>
      </React.Fragment>
    );
  }
}
