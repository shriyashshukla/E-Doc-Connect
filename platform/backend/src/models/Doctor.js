const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  doctorName: { type: String, required: true },
  specialization: { type: String },
  experience: { type: Number },
  qualification: { type: String },
  hospital: { type: String },
  profileImage: { type: String },
  availability: { type: [String], default: [] },
  consultationFee: { type: Number, default: 0 },
  bio: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Doctor', doctorSchema);
