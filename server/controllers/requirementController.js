const Requirement = require("../models/Requirement");

// POST: Add new requirement
exports.addRequirement = async (req, res) => {
  try {
    const { startupName, materialType, minimumWeight, additionalDetails } = req.body;

    if (!startupName || !materialType || !minimumWeight) {
      return res.status(400).json({ error: "All required fields must be provided" });
    }

    const newRequirement = new Requirement({
      startupId: req.user.id,
      startupName,
      materialType,
      minimumWeight,
      additionalDetails,
    });

    await newRequirement.save();
    res.status(201).json({ message: "Requirement posted successfully", requirement: newRequirement });
  } catch (err) {
    console.error("Error adding requirement:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// GET: All requirements posted by all startups
exports.getAllRequirements = async (req, res) => {
  try {
    const requirements = await Requirement.find().populate("startupId", "name email");
    res.json(requirements);
  } catch (err) {
    console.error("Error fetching requirements:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// GET: All requirements posted by the logged-in startup
exports.getMyRequirements = async (req, res) => {
  try {
    const requirements = await Requirement.find({ startupId: req.user.id });
    res.json(requirements);
  } catch (err) {
    console.error("Error fetching startup requirements:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// DELETE: Delete a requirement by ID (only if posted by the same startup)
exports.deleteRequirement = async (req, res) => {
  try {
    const requirement = await Requirement.findById(req.params.id);

    if (!requirement) {
      return res.status(404).json({ error: "Requirement not found" });
    }

    if (requirement.startupId.toString() !== req.user.id) {
      return res.status(403).json({ error: "Unauthorized to delete this requirement" });
    }

    await requirement.deleteOne();
    res.json({ message: "Requirement deleted successfully" });
  } catch (err) {
    console.error("Error deleting requirement:", err);
    res.status(500).json({ error: "Server error" });
  }
};
