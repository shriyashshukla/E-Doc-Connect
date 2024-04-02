const express = require("express");
const BookingModel = require("../models/bookingModel"); // Assuming BookingModel is the name of your model
const multer = require('multer');

const router = express.Router();

// Multer configuration for file storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/avatars'); // Directory where files will be stored
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Use original file name for storing
  }
});

const upload = multer({ storage: storage });

// Upload avatar route
router.post('/upload', upload.single('avatar'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
  
  // Assuming user is already defined somewhere
  user.avatar = req.file.filename;

  user.save((err) => {
    if (err) {
      return res.status(500).json({ message: 'Error saving user avatar' });
    }
    res.status(200).json({ message: 'Avatar uploaded successfully' });
  });
});

// Add new Booking route
router.post("/add", (req, res) => {
  const newBooking = new BookingModel(req.body);
  newBooking.save()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Get all Bookings route
router.get("/getall", (req, res) => {
  BookingModel.find({})
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Get Booking by email route
router.get("/getbyemail/:email", (req, res) => {
  BookingModel.findOne({ email: req.params.email })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Get Booking by ID route
router.get("/getbyid/:id", (req, res) => {
  BookingModel.findById(req.params.id)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Update Booking route
router.put("/update/:id", (req, res) => {
  BookingModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Delete Booking route
router.delete('/delete/:id', (req, res) => {
  BookingModel.findByIdAndDelete(req.params.id)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Authenticate Booking route
router.post('/authenticate', (req, res) => {
  BookingModel.findOne(req.body)
    .then((result) => {
      if (result !== null) res.json(result);
      else res.status(401).json({ message: 'Login failed' });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
