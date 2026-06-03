const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/edoc_connect';

async function connectDB() {
  global.useInMemoryDb = false;

  try {
    await mongoose.connect(MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
      autoIndex: true
    });
    console.log('✅ MongoDB connected successfully');
  } catch (err) {
    console.warn('⚠️  MongoDB connection failed:', err.message);
    console.log('📦 Running in IN-MEMORY mode with mock data');
    global.useInMemoryDb = true;
  }
}

module.exports = connectDB;
