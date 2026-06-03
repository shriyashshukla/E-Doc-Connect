const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/userController');
const upload = require('../middleware/upload');

router.get('/', ctrl.getAllUsers);
router.get('/:id', ctrl.getUserById);
router.put('/:id', upload.single('profileImage'), ctrl.updateUser);
router.post('/mock-auth', ctrl.mockAuth);

module.exports = router;
