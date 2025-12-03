const express = require('express');
const router = express.Router();
const { fetchSymptoms, fetchConditions } = require('../services/medicalDatabase');

// Fetch all symptoms
router.get('/symptoms', async (req, res) => {
    try {
        const symptoms = await fetchSymptoms();
        res.status(200).json(symptoms);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching symptoms', error: error.message });
    }
});

// Fetch all conditions
router.get('/conditions', async (req, res) => {
    try {
        const conditions = await fetchConditions();
        res.status(200).json(conditions);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching conditions', error: error.message });
    }
});

module.exports = router;