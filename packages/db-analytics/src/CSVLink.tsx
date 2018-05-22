import {Buffer} from 'buffer';
import * as React from 'react';
const stringify = require('csv-stringify/lib/sync');

import Button from '@pinecast/common/Button';
import {CSS} from '@pinecast/styles';

export default class CSVLink extends React.Component {
  props: {
    data: () => Array<Array<string | number>>;
    style?: CSS;
  };

  shouldComponentUpdate(newProps: CSVLink['props']) {
    return newProps.data !== this.props.data;
  }

  render() {
    const {data, style} = this.props;
    return (
      <Button
        href={`data:text/csv;base64,${Buffer.from(stringify(data())).toString(
          'base64',
        )}`}
        size="small"
        style={style}
      >
        CSV
      </Button>
    );
  }
}
