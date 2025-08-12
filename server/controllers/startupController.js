const Startup = require('../models/Startup');

// Get all startups
const getStartups = async (req, res) => {
  try {
    const startups = await Startup.find().select('-password');
    res.json(startups);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get startup by ID
const getStartupById = async (req, res) => {
  try {
    const startup = await Startup.findById(req.params.id).select('-password');
    if (!startup) return res.status(404).json({ message: 'Startup not found' });
    res.json(startup);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update startup (protected)
const updateStartup = async (req, res) => {
  try {
    const updatedStartup = await Startup.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).select('-password');

    if (!updatedStartup) return res.status(404).json({ message: 'Startup not found' });

    res.json(updatedStartup);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete startup (protected)
const deleteStartup = async (req, res) => {
  try {
    const deletedStartup = await Startup.findByIdAndDelete(req.params.id);
    if (!deletedStartup) return res.status(404).json({ message: 'Startup not found' });
    res.json({ message: 'Startup deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get logged-in startup profile (protected)
const getStartupProfile = async (req, res) => {
  try {
    const startup = await Startup.findById(req.user.id).select('-password');
    if (!startup) return res.status(404).json({ message: 'Startup not found' });
    res.json(startup);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getStartups,
  getStartupById,
  updateStartup,
  deleteStartup,
  getStartupProfile,
};
