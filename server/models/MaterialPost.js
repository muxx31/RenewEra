const mongoose = require('mongoose');

const materialPostSchema = new mongoose.Schema({
  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Supplier',
    required: true,
  },
  title: { type: String, required: true },
  description: { type: String },
  materialType: { type: String, required: true },
  quantity: { type: Number, required: true },
  unit: { type: String, required: true },
  pickupAddress: { type: String, required: true },
  freeOrPaid: { type: String, required: true },  // e.g., 'free' or 'paid'
  status: {
    type: String,
    enum: ['available', 'claimed', 'completed'],
    default: 'available',
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('MaterialPost', materialPostSchema);
