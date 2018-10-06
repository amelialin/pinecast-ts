import * as React from 'react';

import DateTimePicker from '@pinecast/common/DateTimePicker';

class DateState extends React.Component {
  props: {
    children: (
      props: {date: Date | null; onChange: (date: Date) => void},
    ) => React.ReactNode;
  };
  state: {
    date: Date | null;
  } = {date: null};

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
  name: 'Date time picker',
  examples: [
    {
      title: 'Basic use',
      render: () => (
        <DateState>
          {({date, onChange}) => (
            <DateTimePicker onChange={onChange} value={date} />
          )}
        </DateState>
      ),
    },
    {
      title: 'No input',
      render: () => (
        <DateState>
          {({date, onChange}) => (
            <DateTimePicker hasInput={false} onChange={onChange} value={date} />
          )}
        </DateState>
      ),
    },
    {
      title: 'Do not include time',
      render: () => (
        <DateState>
          {({date, onChange}) => (
            <DateTimePicker
              includeTime={false}
              onChange={onChange}
              value={date}
            />
          )}
        </DateState>
      ),
    },
  ],
};
