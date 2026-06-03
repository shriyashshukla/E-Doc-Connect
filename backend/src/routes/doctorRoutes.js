const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/doctorController');
const upload = require('../middleware/upload');

router.get('/', ctrl.getAllDoctors);
router.get('/:id', ctrl.getDoctorById);
router.post('/', upload.single('profileImage'), ctrl.createDoctor);
router.put('/:id', upload.single('profileImage'), ctrl.updateDoctor);
router.delete('/:id', ctrl.deleteDoctor);

module.exports = router;
