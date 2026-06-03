const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/reviewController');

router.get('/', ctrl.getAllReviews);
router.get('/doctor/:doctorId', ctrl.getDoctorReviews);
router.post('/', ctrl.createReview);

module.exports = router;
