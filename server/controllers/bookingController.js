const Booking = require("../models/Booking");
const Service = require("../models/Service");

// USER: Book a service
exports.createBooking = async (req, res) => {
  try {
    const { serviceId } = req.body;

    if (!serviceId) {
      return res.status(400).json({ message: "Service ID is required" });
    }

    const service = await Service.findById(serviceId);
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    const booking = await Booking.create({
      user: req.user.id,
      service: service._id,
      provider: service.provider,
    });

    res.status(201).json({
      message: "Service booked successfully",
      booking,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// PROVIDER: View bookings
exports.getProviderBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ provider: req.user.id })
      .populate("user", "name email")
      .populate("service", "title price");

    res.json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
