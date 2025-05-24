const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();

// Multer storage setup
const storage = multer.diskStorage({
  destination: 'backend/uploads/',
  filename: (_, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Route: POST /api/prescription/upload
router.post('/upload', upload.single('prescription'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  res.status(200).json({ message: 'File uploaded successfully!' });
});

module.exports = router;
