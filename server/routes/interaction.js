const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const requireRole = require("../middleware/role");
const Material = require("../models/Material");
const Requirement = require("../models/Requirement");
const Notification = require("../models/Notification");

// Supplier expresses interest in a requirement
router.post("/requirement/:id/interest", auth, requireRole("supplier"), async (req, res) => {
  try {
    const requirement = await Requirement.findById(req.params.id);
    if (!requirement) return res.status(404).json({ error: "Requirement not found" });

    const notification = new Notification({
      recipientId: requirement.startupId,
      senderId: req.user.id,
      type: "requirement_offer",
      referenceId: requirement._id,
      message: `Supplier ${req.user.email} is interested in your requirement: ${requirement.materialType}`,
    });

    await notification.save();
    res.json({ message: "Interest sent to startup successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Startup shows interest in a material
router.post("/material/:id/interest", auth, requireRole("startup"), async (req, res) => {
  try {
    const material = await Material.findById(req.params.id);
    if (!material) return res.status(404).json({ error: "Material not found" });

    const notification = new Notification({
      recipientId: material.supplierId,
      senderId: req.user.id,
      type: "material_interest",
      referenceId: material._id,
      message: `Startup ${req.user.email} is interested in your material: ${material.materialType}`,
    });

    await notification.save();
    res.json({ message: "Interest sent to supplier successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Get logged-in user's notifications
router.get("/", auth, async (req, res) => {
  try {
    const notifications = await Notification.find({ recipientId: req.user.id })
      .sort({ createdAt: -1 })
      .populate("senderId", "name email");
    res.json(notifications);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Mark notification as read
router.post("/:id/read", auth, async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);
    if (!notification) return res.status(404).json({ error: "Notification not found" });
    if (notification.recipientId.toString() !== req.user.id) return res.status(403).json({ error: "Unauthorized" });

    notification.read = true;
    await notification.save();
    res.json({ message: "Notification marked as read" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
