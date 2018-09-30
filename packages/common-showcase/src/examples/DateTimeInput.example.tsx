import * as React from 'react';

import DateTimeInput from '@pinecast/common/DateTimeInput';

class DateState extends React.Component {
  props: {
    children: (
      props: {date: Date; onChange: (date: Date) => void},
    ) => React.ReactNode;
  };
  state: {
    date: Date;
  } = {date: new Date()};

  handleChange = (newState: Date) => {
    this.setState({date: newState});
  };
  render() {
    return this.props.children({
      date: this.state.date,
      onChange: this.handleChange,
    });
  }
}

export default {
  name: 'Date time input',
  examples: [
    {
      title: 'Basic use',
      render: () => (
        <DateState>
          {({date, onChange}) => (
            <DateTimeInput onChange={onChange} value={date} />
          )}
        </DateState>
      ),
    },
  ],
};
