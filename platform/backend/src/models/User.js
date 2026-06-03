const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  gender: { type: String },
  profileImage: { type: String },
  address: { type: String },
  role: { type: String, enum: ['patient', 'admin', 'doctor'], default: 'patient' }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
