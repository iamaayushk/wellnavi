const express = require('express');
const router = express.Router();
const symptomController = require('../controllers/symptomController');
const { protect, optionalAuth } = require('../middleware/auth');

router.post('/analyze', optionalAuth, symptomController.analyzeSymptoms);
router.get('/history', protect, symptomController.getSymptomHistory);

module.exports = router;