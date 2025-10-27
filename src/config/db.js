const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI;
    await mongoose.connect(uri, {
    });
    console.log('MongoDB is connected');
  } catch (e) {
    console.error('MongoDB connection error:', e.message);
    process.exit(2);
  }
};

module.exports = connectDB;
