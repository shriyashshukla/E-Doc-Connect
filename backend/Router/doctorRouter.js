const express = require("express");
const Model = require("../models/doctorModel");

const router = express.Router();


const multer = require('multer');


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


router.post('/upload', upload.single('avatar'), (req, res) => {
  
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  
  
  user.avatar = req.file.filename;

  
  user.save((err) => {
    if (err) {
      return res.status(500).json({ message: 'Error saving user avatar' });
    }
    res.status(200).json({ message: 'Avatar uploaded successfully' });
  });
});
router.post("/add", (req, res) => {
  console.log(req.body);

  new Model(req.body)
    .save()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/getall", (req, res) => {
  Model.find({})
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// : denotes url parameter
router.get("/getbyemail/:email", (req, res) => {
  console.log(req.params.email);
  Model.findOne({ email: req.params.email })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/getbyid/:id", (req, res) => {
  Model.findById(req.params.id)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put("/update/:id", (req, res) => {

  Model.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete('/delete/:id', (req, res) => {
  Model.findByIdAndDelete(req.params.id)
  .then((result) => {

    setTimeout(() => {
      res.json(result);
    }, 2000);
    
  }).catch((err) => {
      console.log(err);
      res.status(500).json(err);
  });  
})


router.post('/authenticate', (req, res) => {
  Model.findOne(req.body)
  .then((result) => {
      if(result!==null) res.json(result);
      else res.status(401).json({message : 'login failed'});
  }).catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});


// getall
// getbyemail
// getbyid
// update

module.exports = router;
