const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/doctorController');
const { protect } = require('../middleware/auth');

router.get('/', protect, appointmentController.getUserAppointments);
router.put('/:id/cancel', protect, appointmentController.cancelAppointment);

module.exports = router;
