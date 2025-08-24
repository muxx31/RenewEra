const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const requireRole = require("../middleware/role");
const {
  addRequirement,
  getAllRequirements,
  getMyRequirements,
  deleteRequirement,
} = require("../controllers/requirementController");

// Add new requirement (startup only)
router.post("/", auth, requireRole("startup"), addRequirement);

// Get all requirements (supplier dashboard browsing)
router.get("/", auth, getAllRequirements);

// Get logged-in startup's requirements only
router.get("/my", auth, requireRole("startup"), getMyRequirements);

// Delete requirement by ID (only the startup who posted it)
router.delete("/:id", auth, requireRole("startup"), deleteRequirement);

module.exports = router;
