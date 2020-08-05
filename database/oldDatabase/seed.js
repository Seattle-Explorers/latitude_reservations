const moment = require('moment');
// eslint-disable-next-line no-unused-vars
const db = require('../index.js');
const Listing = require('./Listing.js');

// :::::Helper Functions:::::

// Ranged Random Number Generator
const generateRandomNum = (max, min) => Math.floor((Math.random() * (max - min)) + min);

// Add Padding To A Number
const padNumber = (number) => {
  let targetNumber = number.toString();
  while (targetNumber.length < 3) {
    targetNumber = `0${targetNumber}`;
  }
  return targetNumber;
};

// Random Date Generator (Returns an array of strings, which are dates of the next three months)
function generateRandomDatesArr() {
  let today = new Date();
  let threeMonthsFromNow = new Date();
  const thisMonth = today.getMonth();
  threeMonthsFromNow.setMonth(thisMonth + 3);

  const allDates = [];
  today = moment(today);
  threeMonthsFromNow = moment(threeMonthsFromNow);
  while (today <= threeMonthsFromNow) {
    allDates.push(moment(today).format('YYYY-MM-DD'));
    today = moment(today).add(1, 'days');
  }
  const availFirst = generateRandomNum(1, 39); // These can be enhanced
  const availLast = generateRandomNum(40, 93);

  const availableDates = allDates.slice(availFirst, availLast);
  return availableDates;
}

// ::::: Mock Data Generation :::::

// Mock Data Generator
const generateMockData = (listing) => {
  const mockData = {};

  mockData.listing_id = padNumber(listing);
  mockData.guests = {};
  mockData.guests.adults = generateRandomNum(1, 3);
  mockData.guests.children = generateRandomNum(0, 3);
  mockData.guests.infants = generateRandomNum(0, 3);
  mockData.guests.total = mockData.guests.adults
                        + mockData.guests.children
                        + mockData.guests.infants;
  mockData.open_dates = generateRandomDatesArr();
  mockData.price = generateRandomNum(30, 170)
                 * (mockData.guests.adults + mockData.guests.children / 2);
  mockData.review = generateRandomNum(0, 5);

  return mockData;
};

// Seeding Function
const insertMockData = (mockData) => {
  Listing.create(mockData)
    .catch((err) => console.log('Error: Mock Data Seeding Failed', err));
};

// Seed 100 Mock Data
for (let i = 1; i <= 100; i += 1) {
  insertMockData(generateMockData(i));
}

module.exports = generateMockData;
