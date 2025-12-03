// services/aiService.js
const axios = require('axios');
const { GEMINI_API_KEY } = process.env;

const analyzeSymptoms = async (symptoms) => {
    try {
        const response = await axios.post(`${GEMINI_API_KEY}/analyze`, {
            symptoms: symptoms
        }, {
            headers: {
                'Authorization': `Bearer ${AI_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        throw new Error('Error analyzing symptoms: ' + error.message);
    }
};

const getRecommendations = async (condition) => {
    try {
        const response = await axios.get(`${AI_API_URL}/recommendations`, {
            params: { condition },
            headers: {
                'Authorization': `Bearer ${AI_API_KEY}`
            }
        });
        return response.data;
    } catch (error) {
        throw new Error('Error fetching recommendations: ' + error.message);
    }
};

module.exports = {
    analyzeSymptoms,
    getRecommendations
};