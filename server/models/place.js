const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  tags: {
    type: [String],
    required: true
  },
  time: {
    type: Number,
    required: true
  }
});

const Place = mongoose.model('Place', placeSchema);

module.exports = Place;
