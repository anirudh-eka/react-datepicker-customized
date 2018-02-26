import React, { Component, Fragment } from 'react';
import logo from './logo.svg';
import './App.css';
import DatePicker from "react-datepicker";
import moment from "moment";
import 'react-datepicker/dist/react-datepicker.css';
import './react-datepickerOverrides.css'

function getMomentDayRange(currentDate, endDate) {
    return __getMomentDayRange([currentDate], endDate);
}

function __getMomentDayRange(dates, endDate) {
    const currentDate = dates.slice(-1)[0];
    if(currentDate && endDate && currentDate.isBefore(endDate)) {
        return __getMomentDayRange( dates.concat([currentDate.clone().add(1, 'days')]), endDate);
    }

    return dates;
}

class App extends Component {
    render() {

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
            <DatePickerWrapper/>
        </p>
      </div>
    );
  }
}

export default App;


class DatePickerWrapper extends Component {
    constructor (props) {
        super(props)
        this.state = {
            startDate: undefined,
            endDate: undefined,
            currentlySelecting: 'startDate'
        };
        this.handleChange = this.handleChange.bind(this);
        this.onStartDateInputChange = this.onStartDateInputChange.bind(this);
        this.onEndDateInputChange = this.onEndDateInputChange.bind(this);
    }

    handleChange(date) {
        if (this.state.currentlySelecting === 'startDate') {
            this.setState({
                startDate: date,
                currentlySelecting: 'endDate'
            });
        };

        if (this.state.currentlySelecting === 'endDate') {
            this.setState({
                endDate: date,
                currentlySelecting: 'startDate'
            });
        };
    }

    onStartDateInputChange(date) {
        this.setState({
            startDate: date,
            currentlySelecting: 'endDate'
        });
    }

    onEndDateInputChange(date) {
        this.setState({
            endDate: date,
            currentlySelecting: 'startDate'
        });
    }

    render(){
        const highlightDates = getMomentDayRange(this.state.startDate, this.state.endDate);
        return (<Fragment>
            <DateInput placeholder={'start date'} value={this.state.startDate} onChange={this.onStartDateInputChange} />
            <DateInput placeholder={'end date'} value={this.state.endDate} onChange={this.onEndDateInputChange} />
            <DatePicker
            selected={this.state.startDate}
            onChange={this.handleChange}
            minDate={this.state.currentlySelecting === 'startDate' ? undefined : this.state.startDate   }
            maxDate={moment()}
            peekNextMonth={false}
            monthsShown={2}
            highlightDates={highlightDates}
            inline
        />
        </Fragment>);
    }
}

class DateInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.value ? this.props.value.format('DD/MM/YYYY') : undefined
        }

        this.handleDateInputChange = this.handleDateInputChange.bind(this);
    }

    handleDateInputChange(e) {
        const date = moment(e.target.value, 'DD-MM-YYYY');

        if(date.isValid() && e.target.value.match(/^\d{2}\/\d{2}\/\d{4}$/)) {
            this.props.onChange(date);
        }
        this.setState({value: e.target.value});

    }

    componentWillReceiveProps(newProps) {
        if(newProps.value && !newProps.value.isSame(this.state.value)){
            this.setState({value: (newProps.value && newProps.value.format('DD/MM/YYYY'))})
        }
    }

    render(){
        let value = this.state.value;
        return <input placeholder={this.props.placeholder} value={value} onChange={this.handleDateInputChange}/>
    }
}