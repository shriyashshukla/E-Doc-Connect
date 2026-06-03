const mongoose = require('mongoose');

const availabilitySchema = new mongoose.Schema({
  date: {
    type: String,
    required: true
  },
  timeSlots: {
    type: [String],
    required: true
  }
}, { _id: false });

const doctorSchema = new mongoose.Schema({
  doctorName: {
    type: String,
    required: [true, 'Doctor name is required'],
    trim: true
  },
  specialization: {
    type: String,
    required: [true, 'Specialization is required'],
    trim: true
  },
  qualification: {
    type: String,
    required: [true, 'Qualification is required'],
    trim: true
  },
  experience: {
    type: Number,
    required: [true, 'Experience is required'],
    min: 0
  },
  consultationFee: {
    type: Number,
    required: [true, 'Consultation fee is required'],
    min: 0
  },
  hospital: {
    type: String,
    required: [true, 'Hospital is required'],
    trim: true
  },
  bio: {
    type: String,
    default: 'No bio provided.'
  },
  availability: {
    type: [availabilitySchema],
    default: []
  },
  profileImage: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Doctor', doctorSchema);
