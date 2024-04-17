const express = require("express");
const slotModel = require("../models/slotModel"); 
const multer = require('multer');
const router = express.Router();


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/avatars'); 
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); 
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

// Add new slot route
router.post("/add", (req, res) => {
  const newslot = new slotModel(req.body);
  newslot.save()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Get all slots route
router.get("/getall", (req, res) => {
  slotModel.find({})
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Get slot by email route
router.get("/getbyemail/:email", (req, res) => {
  slotModel.findOne({ email: req.params.email })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/getbydoctor/:id", (req, res) => {
  slotModel.find({ doctor: req.params.id })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Get slot by ID route
router.get("/getbyid/:id", (req, res) => {
  slotModel.findById(req.params.id)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Update slot route
router.put("/update/:id", (req, res) => {
  slotModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Delete slot route
router.delete('/delete/:id', (req, res) => {
  slotModel.findByIdAndDelete(req.params.id)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Authenticate slot route
router.post('/authenticate', (req, res) => {
  slotModel.findOne(req.body)
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
