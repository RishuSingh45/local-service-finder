const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/roleMiddleware");

const router = express.Router();

// Only PROVIDERS can access this
router.get("/dashboard", protect, authorize("provider"), (req, res) => {
  res.json({
    message: "Welcome Provider",
    user: req.user,
  });
});

module.exports = router;
