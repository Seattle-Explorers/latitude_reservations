import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import BookingCalendar from './BookingCalendar';
import Price from './Price';
import Review from './Review';
import Guests from './Guests';

class Booking extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pricePerNight: 0,
      price: 0,
      guests: {
        total: 1,
        adults: 1,
        children: 0,
        infants: 0,
      },
      review: 0,
      availDates: [],
      checkInDate: '',
      checkOutDate: '',
    };
    this.guestsAndPriceInfoHandler = this.guestsAndPriceInfoHandler.bind(this);
    this.checkInOutDatesHandler = this.checkInOutDatesHandler.bind(this);
    this.sendReservationInfo = this.sendReservationInfo.bind(this);
  }

  componentDidMount() {
    this.fetchDatesForSelectedListingID();
  }

  guestsAndPriceInfoHandler(adults, children, infants) {
    const { pricePerNight } = this.state;
    const { guests } = this.state;

    this.setState({
      guests: {
        total: adults + children + infants,
        adults,
        children,
        infants,
      },
    });
    this.setState({
      price: pricePerNight * guests.total,
    });
  }

  checkInOutDatesHandler(checkInDate, checkOutDate) {
    console.log(checkInDate, checkOutDate);
    this.setState({
      checkInDate,
      checkOutDate,
    });
  }

  fetchDatesForSelectedListingID() {
    const { listingID } = this.props;

    return axios.get(`/api/reservation/${listingID}`)
      .then(({ data }) => {
        console.log('GET Request Successful From booking: ', data);
        this.setState({
          price: data.price,
          pricePerNight: data.price,
          review: data.review,
          availDates: data.availDates,
        });
      })
      .catch((err) => {
        console.log('Error Fetching Data: ', err);
      });
  }

  sendReservationInfo() {
    const { listingID } = this.props;
    const { guests, checkInDate, checkOutDate } = this.state;
    axios.post(`/api/reservation/${listingID}`, { guests, checkInDate, checkOutDate })
      .then((response) => {
        console.log(response);
        this.componentDidMount();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const { price } = this.state;
    const { review } = this.state;
    const { availDates } = this.state;

    return (
      <div className="sticky-box">
        <div className="sticky-box-static-top">
          <div className="price">
            <Price price={price} />
          </div>
          <div className="review">
            <Review review={review} />
          </div>
        </div>
        <div className="sticky-box-clickable-boxes">
          <div className="sticky-box-calendars">
            <BookingCalendar
              availDates={availDates}
              checkInOutDatesHandler={this.checkInOutDatesHandler}
            />
          </div>

          <div className="sticky-box-guests">
            <Guests guestsAndPriceInfoHandler={this.guestsAndPriceInfoHandler} />
          </div>
        </div>

        <div className="sticky-box-availability-btn-container">
          <button
            type="submit"
            className="sticky-box-availability-btn"
            onClick={this.sendReservationInfo}
          >
            Check Availability
          </button>
        </div>
      </div>
    );
  }
}

Booking.propTypes = {
  listingID: PropTypes.string.isRequired,
};

export default Booking;
