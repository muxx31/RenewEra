const Material = require("../models/Material");

// POST: Add new material
exports.addMaterial = async (req, res) => {
  try {
    const { materialType, weight, freeOrPaid, additionalInfo } = req.body;

    if (!materialType || !weight || !freeOrPaid) {
      return res.status(400).json({ error: "All required fields must be provided" });
    }

    const newMaterial = new Material({
      supplierId: req.user.id,
      materialType,
      weight,
      freeOrPaid,
      additionalInfo,
    });

    await newMaterial.save();
    res.status(201).json({ message: "Material posted successfully", material: newMaterial });
  } catch (err) {
    console.error("Error adding material:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// GET: All materials posted by all suppliers
exports.getAllMaterials = async (req, res) => {
  try {
    const materials = await Material.find().populate("supplierId", "name email");
    res.json(materials);
  } catch (err) {
    console.error("Error fetching materials:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// GET: All materials posted by the logged-in supplier
exports.getMyMaterials = async (req, res) => {
  try {
    const materials = await Material.find({ supplierId: req.user.id });
    res.json(materials);
  } catch (err) {
    console.error("Error fetching supplier materials:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// DELETE: Delete a material by ID (only if posted by the same supplier)
exports.deleteMaterial = async (req, res) => {
  try {
    const material = await Material.findById(req.params.id);

    if (!material) {
      return res.status(404).json({ error: "Material not found" });
    }

    if (material.supplierId.toString() !== req.user.id) {
      return res.status(403).json({ error: "Unauthorized to delete this material" });
    }

    await material.deleteOne();
    res.json({ message: "Material deleted successfully" });
  } catch (err) {
    console.error("Error deleting material:", err);
    res.status(500).json({ error: "Server error" });
  }
};
