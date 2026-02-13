const Service = require("../models/Service");

// PROVIDER: Add new service
exports.createService = async (req, res) => {
  try {
    const { title, description, category, price, location } = req.body;

    if (!title || !description || !category || !price || !location) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const service = await Service.create({
      title,
      description,
      category,
      price,
      location,
      provider: req.user.id, // from JWT
    });

    res.status(201).json({
      message: "Service created successfully",
      service,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// USER: Get all services
exports.getServices = async (req, res) => {
  try {
    const services = await Service.find().populate(
      "provider",
      "name email"
    );

    res.json(services);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
