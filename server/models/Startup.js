const mongoose = require('mongoose');

const startupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  founderName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {        // hashed password
    type: String,
    required: true,
  },
  contactNumber: {
    type: String,
  },
  address: {
    type: String,
  },
  industry: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Startup', startupSchema);
