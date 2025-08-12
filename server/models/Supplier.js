const mongoose = require('mongoose');

const supplierSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  companyName: {
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
  materialsSupplied: [String],  // array of material names/types
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Supplier', supplierSchema);
