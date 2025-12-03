const symptomAnalyzer = require('../services/aiService');
const medicalDatabase = require('../services/medicalDatabase');

const analyzeSymptoms = async (symptoms) => {
    try {
        // Fetch possible conditions based on symptoms
        const conditions = await medicalDatabase.getConditionsBySymptoms(symptoms);
        
        // Analyze symptoms using AI service
        const analysisResults = await symptomAnalyzer.analyze(symptoms);
        
        // Combine results
        return {
            conditions,
            analysisResults
        };
    } catch (error) {
        throw new Error('Error analyzing symptoms: ' + error.message);
    }
};

module.exports = {
    analyzeSymptoms
};