module.exports = {
  aiServiceUrl: process.env.AI_SERVICE_URL || 'http://localhost:5000/api/analyze-symptoms',
  apiKey: process.env.AI_API_KEY || 'your-api-key-here',
  timeout: process.env.AI_TIMEOUT || 5000,
  confidenceThreshold: process.env.AI_CONFIDENCE_THRESHOLD || 80,
};