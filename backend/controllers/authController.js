const Admin = require("../models/Admin");

// @desc    Admin login
// @route   POST /api/auth/login
// @access  Public
exports.loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });

    if (!admin || admin.password !== password) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    res.json({
      _id: admin._id,
      email: admin.email,
      message: "Login successful",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
