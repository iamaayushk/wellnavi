const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const { protect } = require('../middleware/auth');

router.get('/', protect, dashboardController.getDashboardData);
router.post('/metrics', protect, dashboardController.logHealthMetrics);
router.get('/trends', protect, dashboardController.getHealthTrends);
router.post('/risk-prediction', protect, dashboardController.calculateRiskPrediction);

module.exports = router;
