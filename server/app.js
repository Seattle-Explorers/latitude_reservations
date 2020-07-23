require('newrelic');
const express = require('express');
// const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const moment = require('moment');
const format = require('pg-format');
const { pool } = require('../database');

const DIST_DIR = path.join(__dirname, '..', 'client', 'dist');

const app = express();

// app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(DIST_DIR));

app.get('/:id', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/dist', 'index.html'));
});

// FOR PROXY SERVER
app.get('reservation/reservationBundle.js', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/dist', 'reservationBundle.js'));
});

app.get('reservation/style.css', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/dist', 'style.css'));
});

app.get('/api/reservation/:id', (req, res) => {
  const text = `SELECT
  r.date, 
  l.reviews, 
  l.price 
  FROM listings AS l 
  LEFT JOIN reservations AS r ON 
  r.listingId = l.listingId 
  WHERE l.listingId = $1`;

  const values = [req.params.id];
  pool
    .query({ text, values })
    .then((result) => {
      const { reviews, price } = result.rows[0];
      const availDates = [];
      for (let idx = 0; idx < result.rows.length; idx += 1) {
        availDates.push(result.rows[idx].date);
      }

      res.status(200).send({ review: reviews, price, availDates });
    })
    .catch((err) => {
      res.status(500).send(err);
      throw new Error(`${err}`);
    });
});

app.post('/api/reservation/:id', (req, res) => {
  const { checkInDate, checkOutDate, guests } = req.body;
  const { adults, children, infants } = guests;

  const getDates = (start, end) => {
    const dates = [];
    const current = new Date(start);

    while (current <= new Date(end)) {
      dates.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    return dates;
  };

  const values = [];

  const dateRanges = getDates(checkInDate, checkOutDate);

  for (let idx = 0; idx < dateRanges.length; idx += 1) {
    const input = [req.params.id, adults, children, infants];

    /* moment.js shifted my dates back 1 day.
    I suspect it's became the time format for my dates are 00:00:00.
    I needed to forward 1 day to correct.
    */

    const insertDate = moment(dateRanges[idx]).add(1, 'days').format('YYYY-MM-DD');

    input.splice(1, 0, insertDate);
    values.push(input);
  }

  const text = format(`INSERT INTO 
    reservations(
    listingid, 
    date, 
    adult,
    children,
    infant) VALUES %L`, values);

  pool
    .query(text)
    .then(() => {
      res.send('this worked!');
    })
    .catch((err) => {
      res.status(500).send(err);
      throw new Error(`${err}`);
    });
});

module.exports = app;
