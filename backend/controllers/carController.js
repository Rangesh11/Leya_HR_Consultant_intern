// controllers/carController.js
const Car = require("../models/Car");

// @desc    Create a new car
// @route   POST /api/cars
// @access  Public
exports.createCar = async (req, res) => {
  try {
    const { title, description, category } = req.body;
    const images = req.files.map((file) => file.path);

    const car = new Car({
      title,
      description,
      category,
      images,
    });

    await car.save();
    res.status(201).json(car);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all cars
// @route   GET /api/cars
// @access  Public
exports.getCars = async (req, res) => {
  try {
    const cars = await Car.find();
    res.json(cars);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get car by ID
// @route   GET /api/cars/:id
// @access  Public
exports.getCarById = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (car) {
      res.json(car);
    } else {
      res.status(404).json({ message: "Car not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// @desc    Get first document filtered by category
// @route   GET /api/cars/category/:category
// @access  Public
exports.getFirstCarForEachCategory = async (req, res) => {
  try {
    const categories = await Car.distinct("category");
    const results = [];

    for (const category of categories) {
      const car = await Car.findOne({ category }).sort({ createdAt: 1 }).exec();
      if (car) {
        results.push(car);
      }
    }

    res.status(200).json(results);
  } catch (error) {
    console.error("Error fetching cars:", error);
    res.status(500).json({ message: "Failed to fetch cars" });
  }
};

// @desc    Get all unique categories
// @route   GET /api/cars/categories
// @access  Public
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Car.distinct("category");
    res.status(200).json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ message: "Failed to fetch categories" });
  }
};