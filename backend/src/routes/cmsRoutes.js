const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/cmsController');

router.get('/services', ctrl.getServices);
router.get('/testimonials', ctrl.getTestimonials);
router.get('/faqs', ctrl.getFaqs);
router.get('/stats', ctrl.getStats);
router.put('/services', ctrl.updateServices);
router.put('/testimonials', ctrl.updateTestimonials);
router.put('/faqs', ctrl.updateFaqs);

module.exports = router;
