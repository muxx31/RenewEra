const Supplier = require('../models/Supplier');

// Get all suppliers
const getSuppliers = async (req, res) => {
  try {
    const suppliers = await Supplier.find().select('-password'); // exclude password
    res.json(suppliers);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Search suppliers by companyName or materialsSupplied (case-insensitive)
const searchSuppliers = async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) return res.status(400).json({ message: 'Query parameter is required' });

    const regex = new RegExp(query, 'i'); // case-insensitive regex

    const suppliers = await Supplier.find({
      $or: [
        { companyName: { $regex: regex } },
        { materialsSupplied: { $regex: regex } }, // assuming materialsSupplied is a string or array of strings
      ],
    }).select('-password');

    res.json(suppliers);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get supplier by ID
const getSupplierById = async (req, res) => {
  try {
    const supplier = await Supplier.findById(req.params.id).select('-password');
    if (!supplier) return res.status(404).json({ message: 'Supplier not found' });
    res.json(supplier);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update supplier (protected)
const updateSupplier = async (req, res) => {
  try {
    const updatedSupplier = await Supplier.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).select('-password');

    if (!updatedSupplier) return res.status(404).json({ message: 'Supplier not found' });

    res.json(updatedSupplier);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete supplier (protected)
const deleteSupplier = async (req, res) => {
  try {
    const deletedSupplier = await Supplier.findByIdAndDelete(req.params.id);
    if (!deletedSupplier) return res.status(404).json({ message: 'Supplier not found' });
    res.json({ message: 'Supplier deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getSuppliers,
  searchSuppliers,  // <-- added search function here
  getSupplierById,
  updateSupplier,
  deleteSupplier,
};

