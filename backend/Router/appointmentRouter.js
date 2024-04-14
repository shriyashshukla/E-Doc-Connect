const express = require("express");
const DoctorModel = require("../models/AppointmentModel"); // Assuming DoctorModel is the name of your model
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

// Add new doctor route
router.post("/add", (req, res) => {
  const newDoctor = new DoctorModel(req.body);
  newDoctor.save()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Get all doctors route
router.get("/getall", (req, res) => {
  DoctorModel.find({})
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Get doctor by email route
router.get("/getbyemail/:email", (req, res) => {
  DoctorModel.findOne({ email: req.params.email })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Get doctor by ID route
router.get("/getbyid/:id", (req, res) => {
  DoctorModel.findById(req.params.id)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/getbyuser/:id", (req, res) => {
  DoctorModel.find({user : req.params.id})
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Update doctor route
router.put("/update/:id", (req, res) => {
  DoctorModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Delete doctor route
router.delete('/delete/:id', (req, res) => {
  DoctorModel.findByIdAndDelete(req.params.id)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Authenticate doctor route
router.post('/authenticate', (req, res) => {
  DoctorModel.findOne(req.body)
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
