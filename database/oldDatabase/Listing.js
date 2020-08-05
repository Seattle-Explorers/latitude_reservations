/* eslint-disable comma-dangle */
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
const listingSchema = new mongoose.Schema({
  listing_id: String,
  guests: {
    adults: {
      type: Number,
      default: 1
    },
    children: {
      type: Number,
      default: 0
    },
    infants: {
      type: Number,
      default: 0
    },
    total: {
      type: Number
    }
  },
  open_dates: Array,
  price: Number,
  review: Number
});

const Listing = mongoose.model('Listing', listingSchema);

module.exports = Listing;
