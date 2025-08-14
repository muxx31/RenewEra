const mongoose = require('mongoose');

const materialPostSchema = new mongoose.Schema({
  supplier: { type: mongoose.Schema.Types.ObjectId, ref: 'Supplier', required: true },
  materialType: { type: String, required: true },
  quantity: { type: Number, required: true },
  pickupAddress: { type: String, required: true },
  freeOrPaid: { type: String, required: true },
  description: { type: String },
  status: { type: String, enum: ['available', 'claimed', 'completed'], default: 'available' },
  file: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('MaterialPost', materialPostSchema);
