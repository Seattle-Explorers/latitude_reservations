const fs = require('fs');
const moment = require('moment');
const randomNum = require('./listingCSVMaker');

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

const writeReservations = fs.createWriteStream('reservationsTable.csv');
writeReservations.write('listingId,date,adult,children,infant,total\n', 'utf8');

function writeSomeMillion(writer, encoding, cb) {
  let listingId = 1;

  function write() {
    let ok = true;

    do {
      const idDeterminant = randomNum(1, 10);
      const dateRange = randomNum(1, 3);

      if (idDeterminant < 2) {
        listingId += 1;
      }

      let date;

      if (dateRange === 1) {
        date = allDates[randomNum(0, 31)];
      } else if (dateRange === 2) {
        date = allDates[randomNum(32, 63)];
      } else {
        date = allDates[randomNum(64, 92)];
      }

      const adult = randomNum(1, 5);
      const children = randomNum(0, 5);
      const infant = randomNum(0, 5);
      const total = adult + children + infant;

      const data = `${listingId},${date},${adult},${children},${infant},${total}\n`;

      if (listingId === 10000000) {
        writer.write(data, encoding, cb);
      } else {
        ok = writer.write(data, encoding);
      }
    } while (listingId < 10000000 && ok);

    if (listingId < 10000000) {
      writer.once('drain', write);
    }
  }

  write();
}

writeSomeMillion(writeReservations, 'utf-8', () => {
  writeReservations.end();
});
