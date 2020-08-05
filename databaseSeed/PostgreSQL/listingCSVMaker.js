const fs = require('fs');

const writeListings = fs.createWriteStream('listingTable.csv');
writeListings.write('listingId,reviews,price\n', 'utf8');

const randomNum = (min, max) => (Math.floor(Math.random() * (max - min + 1) + min));

function writeTenMillion(writer, encoding, cb) {
  let i = 10000000;
  let id = 0;

  function write() {
    let ok = true;

    do {
      i -= 1;
      id += 1;
      const listingId = id.toString().padStart(8, '0');
      const reviews = randomNum(50, 300);
      const price = randomNum(50, 400);
      const data = `${listingId},${reviews}, ${price}\n`;

      if (i === 0) {
        writer.write(data, encoding, cb);
      } else {
        ok = writer.write(data, encoding);
      }
    } while (i > 0 && ok);

    if (i > 0) {
      writer.once('drain', write);
    }
  }
  write();
}

writeTenMillion(writeListings, 'utf-8', () => {
  writeListings.end();
});

module.exports = randomNum;
