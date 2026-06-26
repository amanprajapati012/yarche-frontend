const mongoose = require('mongoose');

const reelSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  link: { 
    type: String, required: true 
  },
  images: {
    type: [String], // multiple images
    default: []
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Reel', reelSchema);
