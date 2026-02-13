const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/roleMiddleware");
const {
  createService,
  getServices,
} = require("../controllers/serviceController");

const router = express.Router();

// Provider only
router.post("/", protect, authorize("provider"), createService);

// Public (users can view)
router.get("/", getServices);

module.exports = router;
