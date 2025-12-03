const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');

// Import Google Generative AI
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize the AI model
console.log('=== Initializing Google Generative AI ===');
console.log('Raw API Key from env:', process.env.GEMINI_API_KEY);
console.log('API Key length:', process.env.GEMINI_API_KEY?.length);
console.log('API Key trimmed length:', process.env.GEMINI_API_KEY?.trim().length);
console.log('First 15 chars:', process.env.GEMINI_API_KEY?.substring(0, 15));
console.log('Last 5 chars:', process.env.GEMINI_API_KEY?.slice(-5));
console.log('==========================================');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY?.trim());

// Health assistant chat endpoint
router.post('/health-assistant', async (req, res) => {
  try {
    const { message, conversationHistory } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Message is required'
      });
    }

    console.log('Processing message:', message);
    console.log('Using API key (first 20 chars):', process.env.GEMINI_API_KEY?.substring(0, 20));

    // Create a fresh instance for each request to ensure no caching issues
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    
    // Get the generative model
    const model = genAI.getGenerativeModel({ 
      model: 'gemini-2.0-flash',
    });

    // Build conversation context
    let conversationText = '';
    
    // Add conversation history for context
    if (conversationHistory && conversationHistory.length > 0) {
      conversationHistory.slice(-4).forEach(msg => {
        if (msg.role === 'user') {
          conversationText += `User: ${msg.content}\n`;
        } else if (msg.role === 'assistant') {
          conversationText += `Assistant: ${msg.content}\n`;
        }
      });
    }
    
    const prompt = `You are a concise AI Health Assistant. Provide SHORT, DIRECT answers (2-3 sentences max). Keep context from previous messages.

${conversationText}User: ${message}

Give a brief, helpful answer:`;

    // Generate response
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    res.json({
      success: true,
      response: text
    });

  } catch (error) {
    console.error('Error in health assistant chat:', error);
    
    // Fallback to mock response if API fails
    const mockResponse = `For "${req.body.message}": Stay hydrated, get rest, eat healthy. If symptoms persist, consult a doctor. Seek immediate help for emergencies.`;

    res.json({
      success: true,
      response: mockResponse
    });
  }
});

module.exports = router;
