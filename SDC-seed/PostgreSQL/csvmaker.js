const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const moment = require('moment');

const listTable = createCsvWriter({
  path: 'listingTable.csv',
  header: [
    { id: 'id', title: 'id' },
    { id: 'paddedId', title: 'paddedId' },
    { id: 'reviews', title: 'reviews' },
    { id: 'price', title: 'price' },
  ],
});

const listReservations = createCsvWriter({
  path: 'reservationTable.csv',
  header: [
    {id: 'id', title:'id'},
    {id: 'listing_id', title: 'listing_id'},
    {id: 'date', title: 'date'},
    {id: 'adult', title: 'adult'},
    {id: 'children', title: 'children'},
    {id: 'infant', title: 'infant'},
    {id: 'total', title: 'total'},
  ]
});

const randomNum = (min, max) => (Math.floor(Math.random() * (max - min + 1) + min));

const listSeeder = () => {
  const seeds = [];
  let seedling = 1;

  while (seedling < 1000001) {
    seeds.push(
      {
        id: seedling,
        paddedId: seedling.toString().padStart(7,'0'),
        reviews: randomNum(50, 300),
        price: randomNum(50, 400),
      },
    );

    seedling += 1;
  }

  return seeds;
};

const append = () => {
  const data = listSeeder();
  listTable.writeRecords(data).then(() => console.log('Listing CSV written'));
};

append();
