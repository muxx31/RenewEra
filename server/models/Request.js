const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  materialPost: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MaterialPost',
    required: true,
  },
  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Supplier',
    required: true,
  },
  message: {
    type: String,
  },
  offerPrice: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Request', requestSchema);
