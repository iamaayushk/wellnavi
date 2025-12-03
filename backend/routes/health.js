const express = require('express');
const HealthController = require('../controllers/healthController');
const { protect } = require('../middleware/auth');

const router = express.Router();
const healthController = new HealthController();

// Protected routes - require authentication
router.post('/data', protect, (req, res) => healthController.addHealthData(req, res));
router.get('/data', protect, (req, res) => healthController.getHealthData(req, res));
router.get('/data/today', protect, (req, res) => healthController.getTodayHealthData(req, res));

// Route to get health tips
router.get('/tips', (req, res) => healthController.getHealthTips(req, res));

// Route to get general health information
router.get('/info', (req, res) => healthController.getGeneralHealthInfo(req, res));

module.exports = router;