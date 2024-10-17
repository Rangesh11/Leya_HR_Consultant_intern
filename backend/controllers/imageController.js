const Image = require("../models/Image");

// @desc    Create new images entry
// @route   POST /api/images
// @access  Public
exports.createImages = async (req, res) => {
  try {
    const images = req.files.map((file) => file.path);
    const newImage = new Image({ images });
    const savedImage = await newImage.save();
    res.status(201).json(savedImage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all images
// @route   GET /api/images
// @access  Public
exports.getImages = async (req, res) => {
  try {
    const images = await Image.find();
    res.json(images);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
