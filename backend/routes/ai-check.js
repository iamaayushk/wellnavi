const express = require('express');
const router = express.Router();
const SymptomController = require('../controllers/symptomController');

// Route to analyze symptoms
router.post('/analyze-symptoms', async (req, res) => {
    try {
        const { symptoms, selectedSymptoms } = req.body;
        const symptomController = new SymptomController();
        const analysisResult = await symptomController.analyzeSymptoms(symptoms, selectedSymptoms);
        res.status(200).json(analysisResult);
    } catch (error) {
        res.status(500).json({ message: 'Error analyzing symptoms', error: error.message });
    }
});

module.exports = router;