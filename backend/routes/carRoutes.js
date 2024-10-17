// routes/carRoutes.js
const express = require("express");
const multer = require("multer");
const {
  createCar,
  getCars,
  getCarById,
 getFirstCarForEachCategory,
 getAllCategories,
} = require("../controllers/carController");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

router.post("/", upload.array("images"), createCar);
router.get("/", getCars);
router.get("/first-cars", getFirstCarForEachCategory);
router.get('/categories',getAllCategories)
router.get("/:id", getCarById);


module.exports = router;
