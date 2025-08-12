const MaterialPost = require('../models/MaterialPost');
const Request = require('../models/Request');

// Get all material posts for logged-in supplier (listings)
const getSupplierMaterials = async (req, res) => {
  try {
    const materials = await MaterialPost.find({ supplier: req.user.id }).sort({ createdAt: -1 });
    res.json(materials);
  } catch (error) {
    console.error('Error fetching supplier materials:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create new material post (supplier)
const createSupplierMaterial = async (req, res) => {
  try {
    const { title, description, materialType, quantity, unit, pickupAddress, freeOrPaid, status } = req.body;

    // Validate required fields
    if (!title || !materialType || !quantity || !unit || !pickupAddress || !freeOrPaid) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const newMaterial = new MaterialPost({
      supplier: req.user.id,
      title,
      description,
      materialType,
      quantity,
      unit,
      pickupAddress,
      freeOrPaid,
      status: status || 'available',
    });

    await newMaterial.save();
    res.status(201).json(newMaterial);
  } catch (error) {
    console.error('Error creating material:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update material post (supplier only)
const updateSupplierMaterial = async (req, res) => {
  try {
    const material = await MaterialPost.findOne({ _id: req.params.id, supplier: req.user.id });
    if (!material) return res.status(404).json({ message: 'Material post not found' });

    Object.assign(material, req.body);
    await material.save();

    res.json(material);
  } catch (error) {
    console.error('Error updating material:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete material post (supplier only)
const deleteSupplierMaterial = async (req, res) => {
  try {
    const material = await MaterialPost.findOneAndDelete({ _id: req.params.id, supplier: req.user.id });
    if (!material) return res.status(404).json({ message: 'Material post not found' });

    res.json({ message: 'Material post deleted' });
  } catch (error) {
    console.error('Error deleting material:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all requests received on supplier's materials
const getRequestsForSupplierMaterials = async (req, res) => {
  try {
    const requests = await Request.find({ supplier: req.user.id })
      .populate('materialPost', 'title status')
      .populate('startup', 'name email');
    res.json(requests);
  } catch (error) {
    console.error('Error fetching requests for supplier materials:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getSupplierMaterials,
  createSupplierMaterial,
  updateSupplierMaterial,
  deleteSupplierMaterial,
  getRequestsForSupplierMaterials,
};
