const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctorController');
const { protect } = require('../middleware/auth');

router.get('/', doctorController.getDoctors);
router.get('/:id', doctorController.getDoctor);
router.post('/:id/book', protect, doctorController.bookAppointment);
router.post('/nearby', doctorController.getNearbyDoctors);

module.exports = router;
