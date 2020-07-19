import React from 'react';
import axios from 'axios';
import moment from 'moment';
import PropTypes from 'prop-types';
import { FaRegKeyboard } from 'react-icons/fa';

import LeftCalendar from './LeftCalendar';
import RightCalendar from './RightCalendar';

class Calendar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      availDates: [],
      currentDate: moment(new Date()),
      firstDate: '',
      secondDate: '',
      nextDate: false,
    };
    this.calendarClickHandler = this.calendarClickHandler.bind(this);
    this.clearButtonClickHandler = this.clearButtonClickHandler.bind(this);
    this.handleRightArrowClick = this.handleRightArrowClick.bind(this);
    this.handleLeftArrowClick = this.handleLeftArrowClick.bind(this);
  }

  componentDidMount() {
    this.fetchDatesForSelectedListingID();
  }

  fetchDatesForSelectedListingID() {
    const { listingID } = this.props;
    return axios.get(`/api/reservation/${listingID}`)
      .then(({ data }) => {
        console.log('GET Request Successful: ', data);
        this.setState({
          availDates: data.availDates,
        });
      })
      .catch((err) => {
        console.log('Error Fetching Data: ', err);
      });
  }

  calendarClickHandler(targetMonth, targetDateInput) {
    const { nextDate } = this.state;
    let targetDate = targetDateInput;

    const thisYear = moment(new Date()).format('YYYY');
    if (targetDate < 10) {
      targetDate = `0${targetDate}`;
    }
    this.setState((prevState) => ({
      nextDate: !prevState.nextDate,
    }));
    if (!nextDate) {
      this.setState({
        firstDate: `${thisYear}-${targetMonth}-${targetDate}`,
      });
    } else {
      this.setState({
        secondDate: `${thisYear}-${targetMonth}-${targetDate}`,
      });
    }
  }

  clearButtonClickHandler() {
    this.setState({
      firstDate: '',
      secondDate: '',
    });
  }

  handleRightArrowClick() {
    const { currentDate } = this.state;
    this.setState({
      currentDate: moment(currentDate).add(1, 'months'),
    });
  }

  handleLeftArrowClick() {
    const { currentDate } = this.state;
    this.setState({
      currentDate: moment(currentDate).subtract(1, 'months'),
    });
  }

  render() {
    const { availDates } = this.state;
    const { currentDate } = this.state;
    const { firstDate } = this.state;
    const { secondDate } = this.state;

    return (
      <div className="calendar-main-container">
        <div className="calendar-top-descrpiton">
          <h2>Select Check-in date</h2>
          <div>
            This host offers 10% off if you stay a week and a 20% monthly discount.
          </div>
        </div>
        <div className="calendars">
          <LeftCalendar
            availDates={availDates}
            currentDate={currentDate}
            selectedDates={[firstDate, secondDate]}
            handleClick={this.calendarClickHandler}
            handleLeftArrowClick={this.handleLeftArrowClick}
            handleRightArrowClick={this.handleRightArrowClick}
            clearButtonClickHandler={this.clearButtonClickHandler}
          />
          <RightCalendar
            availDates={availDates}
            currentDate={currentDate}
            handleClick={this.calendarClickHandler}
            handleArrowClick={this.handleRightArrowClick}
            selectedDates={[firstDate, secondDate]}
          />
        </div>
        <div className="calendar-bottom">
          <div className="keyboard-icon">
            <FaRegKeyboard size={32} />
          </div>
          <div className="clear-dates-btn-container">
            <div className="clear-dates-space" />
            <button
              className="clear-dates-btn"
              type="button"
              onClick={this.clearButtonClickHandler}
            >
              Clear dates
            </button>
          </div>
        </div>
      </div>
    );
  }
}

Calendar.propTypes = {
  listingID: PropTypes.string.isRequired,
};

export default Calendar;
