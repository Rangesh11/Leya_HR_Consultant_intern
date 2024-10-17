const express = require("express");
const { createImages, getImages } = require("../controllers/imageController");
const multer = require("multer");

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

router.post("/", upload.array("images"), createImages);
router.get("/", getImages);

module.exports = router;
