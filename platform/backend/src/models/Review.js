const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' },
  rating: { type: Number, min: 1, max: 5 },
  review: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Review', reviewSchema);
