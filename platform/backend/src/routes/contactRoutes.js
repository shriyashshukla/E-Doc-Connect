const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/contactController');

router.post('/', ctrl.create);
router.get('/', ctrl.list);

module.exports = router;
