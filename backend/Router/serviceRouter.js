const express = require("express");
const Service = require("../models/serviceModel");
const router = express.Router();
const multer = require('multer');

// Multer configuration for file storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/images'); // Directory where files will be stored
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Use original file name for storing
  }
});

const upload = multer({ storage: storage });

// Upload image
router.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  const service = new Service({ image: req.file.filename });
  service.save()
    .then(() => res.status(200).json({ message: 'Image uploaded successfully' }))
    .catch(err => res.status(500).json({ message: 'Error saving image', error: err }));
});

// Add a new service
router.post("/add", (req, res) => {
  new Service(req.body)
    .save()
    .then(result => res.json(result))
    .catch(err => res.status(500).json(err));
});

// Get all services
router.get("/getall", (req, res) => {
  Service.find({})
    .then(result => res.json(result))
    .catch(err => res.status(500).json(err));
});

// Get service by ID
router.get("/getbyid/:id", (req, res) => {
  Service.findById(req.params.id)
    .then(result => res.json(result))
    .catch(err => res.status(500).json(err));
});

router.get("/getall", (req, res) => {
  Service.find()
    .then(result => res.json(result))
    .catch(err => res.status(500).json(err));
});

// Update service
router.put("/update/:id", (req, res) => {
  Service.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(result => res.json(result))
    .catch(err => res.status(500).json(err));
});

// Delete service
router.delete('/delete/:id', (req, res) => {
  Service.findByIdAndDelete(req.params.id)
    .then(result => res.json(result))
    .catch(err => res.status(500).json(err));
});

module.exports = router;
