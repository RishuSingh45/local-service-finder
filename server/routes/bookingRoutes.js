const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/roleMiddleware");
const {
  createBooking,
  getProviderBookings,
} = require("../controllers/bookingController");

const router = express.Router();

// User books service
router.post("/", protect, authorize("user"), createBooking);

// Provider views bookings
router.get("/provider", protect, authorize("provider"), getProviderBookings);

module.exports = router;
