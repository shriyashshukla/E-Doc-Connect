const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/edoc_platform';

async function connectDB() {
  try {
    await mongoose.connect(MONGO_URI, { autoIndex: true });
    console.log('MongoDB connected');
  } catch (err) {
    console.warn('MongoDB connection failed, running without DB:', err.message);
  }
}

module.exports = connectDB;
