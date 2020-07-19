import React from 'react';
import ReactDOM from 'react-dom';
import Calendar from './components/Calendar.jsx';
import Booking from './components/Booking.jsx';

const url = new URL(window.location.href);
const path = url.pathname;
const idSearch = /(\d{8})/;
const [listingID] = path.match(idSearch);

ReactDOM.render(
  <Calendar listingID={listingID} />,
  document.getElementById('calendar-component'),
);

ReactDOM.render(
  <Booking listingID={listingID} />,
  document.getElementById('booking-component'),
);

