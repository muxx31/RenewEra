const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const requireRole = require("../middleware/role");
const {
  addMaterial,
  getAllMaterials,
  getMyMaterials,
  deleteMaterial,
} = require("../controllers/materialController");

// Add new material (supplier only)
router.post("/", auth, requireRole("supplier"), addMaterial);

// Get all materials (supplier dashboard browsing)
router.get("/", auth, getAllMaterials);

// Get logged-in supplier's materials only
router.get("/my", auth, requireRole("supplier"), getMyMaterials);

// Delete material by ID (only the supplier who posted it)
router.delete("/:id", auth, requireRole("supplier"), deleteMaterial);

module.exports = router;
