const fs = require('fs');
const moment = require('moment');

const randomNum = (min, max) => (Math.floor(Math.random() * (max - min + 1) + min));

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

function writeListings(writer, encoding, cb, start, stop) {
  let i = stop;
  let id = start;

  function write() {
    let ok = true;

    do {
      i -= 1;
      id += 1;
      let availableDates = allDates.slice();

      let maxDateIndex = 92;
      const bookingCount = randomNum(5, 8);
      const bookings = [];

      for (let count = 1; count <= bookingCount; count += 1) {
        const ranDateIndex = randomNum(0, maxDateIndex);
        const date = availableDates[ranDateIndex];
        availableDates.splice(ranDateIndex, 1);
        maxDateIndex -= 1;

        const adult = randomNum(1, 5);
        const children = randomNum(0, 5);
        const infant = randomNum(0, 5);
        const total = adult + children + infant;

        bookings.push({
          date,
          adult,
          children,
          infant,
          total,
        });
      }
      availableDates = allDates.slice();

      const _key = id.toString().padStart(8, '0'); 
      const reviews = randomNum(50, 300);
      const price = randomNum(50, 400);

      const listing = {
        _key,
        reviews,
        price,
        bookings,
      };

      let data;
      if (id === stop) {
        data = `  ${JSON.stringify(listing)}\n`;
      } else {
        data = `  ${JSON.stringify(listing)},\n`;
      }

      if (i === start) {
        writer.write(data, encoding, cb);
      } else {
        ok = writer.write(data, encoding);
      }
    } while (i > start && ok);

    if (i > start) {
      writer.once('drain', write);
    }
  }
  write();
}

module.exports = writeListings;