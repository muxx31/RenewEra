// config/db.js
const mongoose = require('mongoose');

const connectDB = async () => {
  if (mongoose.connection.readyState === 1) {
    // already connected
    return;
  }
  const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/yourdbname';
  await mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  console.log('MongoDB connected');
};

module.exports = connectDB;

