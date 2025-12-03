const { GoogleGenerativeAI } = require('@google/generative-ai');
const Symptom = require('../models/Symptom');
const AnalysisResult = require('../models/AnalysisResult');

// Initialize Gemini AI
// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
// const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// @desc    Analyze symptoms using AI
// @route   POST /api/analyze-symptoms
// @access  Public
exports.analyzeSymptoms = async (req, res) => {
  try {
    const { symptoms, selectedSymptoms } = req.body;

    if (!symptoms && (!selectedSymptoms || selectedSymptoms.length === 0)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide symptoms for analysis'
      });
    }

    // Combine symptoms
    const allSymptoms = symptoms ? symptoms.split(',').map(s => s.trim()) : [];
    if (selectedSymptoms && selectedSymptoms.length > 0) {
      selectedSymptoms.forEach(s => {
        if (!allSymptoms.includes(s.text)) {
          allSymptoms.push(s.text);
        }
      });
    }

    // AI Analysis simulation (replace with actual AI API call)
    const analysisResult = await performAIAnalysis(allSymptoms, selectedSymptoms);

    // Save analysis to database if user is authenticated
    if (req.user) {
      await AnalysisResult.create({
        userId: req.user.id,
        symptoms: allSymptoms,
        analysis: analysisResult,
        timestamp: new Date()
      });
    }

    res.status(200).json({
      success: true,
      message: 'Symptoms analyzed successfully',
      ...analysisResult
    });

  } catch (error) {
    console.error('Symptom analysis error:', error);
    res.status(500).json({
      success: false,
      message: 'Error analyzing symptoms',
      error: error.message
    });
  }
};

// AI Analysis Logic using Gemini API
async function performAIAnalysis(symptoms, selectedSymptoms) {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
    
    const symptomsText = symptoms.join(', ');
    
    const prompt = `Analyze these medical symptoms and respond with ONLY a valid JSON object (no markdown, no explanations):

Symptoms: ${symptomsText}

Return this exact structure:
{
  "confidence": 85,
  "possibleCauses": [
    {
      "id": "condition-id",
      "condition": "Condition Name",
      "probability": 75,
      "severity": "Mild to Moderate",
      "severityBg": "bg-yellow-100",
      "severityColor": "text-yellow-800",
      "description": "Brief description",
      "symptoms": ["symptom 1", "symptom 2", "symptom 3"],
      "recommendations": ["recommendation 1", "recommendation 2", "recommendation 3"],
      "whenToSeeDoctor": "When to seek medical help",
      "specialization": "Medical specialty",
      "icon": "<Activity className=\\"w-6 h-6 text-blue-400\\" />"
    }
  ],
  "emergencyWarning": null,
  "aiInsights": "Detailed analysis paragraph",
  "recommendedActions": ["action 1", "action 2", "action 3"]
}

Rules:
- Return 2-3 most likely conditions
- Use severity: "Mild", "Moderate", or "Severe"
- Set emergencyWarning if critical (chest pain, breathing difficulty)
- Always recommend consulting a doctor`;

    const result = await model.generateContent(prompt);
    const text = result.response.text().trim();
    
    // Remove markdown formatting
    const jsonText = text.replace(/```json\s*/g, '').replace(/```\s*/g, '').trim();
    
    const analysisResult = JSON.parse(jsonText);
    
    return {
      ...analysisResult,
      timestamp: new Date()
    };
    
  } catch (error) {
    console.error('AI Analysis failed, using fallback:', error.message);
    return getFallbackAnalysis(symptoms);
  }
}

// Fallback if AI fails
function getFallbackAnalysis(symptoms) {
  const possibleCauses = [];
  const recommendedActions = [];
  let emergencyWarning = null;
  
  // Emergency symptom detection
  const emergencySymptoms = ['chest pain', 'difficulty breathing', 'severe bleeding', 'unconsciousness'];
  const hasEmergency = symptoms.some(s => 
    emergencySymptoms.some(es => s.toLowerCase().includes(es))
  );
  
  if (hasEmergency) {
    emergencyWarning = {
      level: 'critical',
      message: 'You are experiencing symptoms that may require immediate medical attention. Please seek emergency care or call emergency services immediately.',
      action: 'Call 102 or visit the nearest emergency room'
    };
  }

  // Analyze based on common symptom combinations
  if (symptoms.some(s => s.toLowerCase().includes('headache'))) {
    possibleCauses.push({
      id: 'tension-headache',
      condition: 'Tension Headache',
      probability: 75,
      severity: 'Mild to Moderate',
      severityBg: 'bg-yellow-100',
      severityColor: 'text-yellow-800',
      description: 'A common type of headache characterized by mild to moderate pain that feels like a tight band around the head.',
      symptoms: ['Dull, aching head pain', 'Tightness or pressure across forehead', 'Tenderness on scalp, neck, and shoulder muscles'],
      recommendations: [
        'Rest in a quiet, dark room',
        'Apply cold or warm compress to head/neck',
        'Practice stress management techniques',
        'Stay hydrated'
      ],
      whenToSeeDoctor: 'If headaches become frequent, severe, or are accompanied by fever, stiff neck, or vision changes',
      specialization: 'Neurologist',
      icon: '<Brain className="w-6 h-6 text-purple-400" />'
    });
  }

  if (symptoms.some(s => s.toLowerCase().includes('fever')) && 
      symptoms.some(s => s.toLowerCase().includes('cough'))) {
    possibleCauses.push({
      id: 'upper-respiratory',
      condition: 'Upper Respiratory Infection',
      probability: 65,
      severity: 'Moderate',
      severityBg: 'bg-orange-100',
      severityColor: 'text-orange-800',
      description: 'A common viral infection affecting the nose, throat, and airways, often including the common cold or flu.',
      symptoms: ['Fever', 'Cough', 'Sore throat', 'Nasal congestion', 'Fatigue'],
      recommendations: [
        'Get plenty of rest',
        'Drink lots of fluids',
        'Use over-the-counter pain relievers',
        'Gargle with salt water for sore throat'
      ],
      whenToSeeDoctor: 'If fever persists beyond 3 days, difficulty breathing occurs, or symptoms worsen',
      specialization: 'General Physician',
      icon: '<Activity className="w-6 h-6 text-blue-400" />'
    });
  }

  if (symptoms.some(s => s.toLowerCase().includes('stomach') || s.toLowerCase().includes('nausea'))) {
    possibleCauses.push({
      id: 'gastroenteritis',
      condition: 'Gastroenteritis',
      probability: 60,
      severity: 'Mild to Moderate',
      severityBg: 'bg-yellow-100',
      severityColor: 'text-yellow-800',
      description: 'Inflammation of the digestive tract, commonly caused by viral or bacterial infections.',
      symptoms: ['Nausea', 'Vomiting', 'Diarrhea', 'Stomach cramps', 'Low-grade fever'],
      recommendations: [
        'Stay hydrated with clear fluids',
        'Eat bland foods (BRAT diet)',
        'Avoid dairy and fatty foods',
        'Rest and avoid strenuous activity'
      ],
      whenToSeeDoctor: 'If symptoms persist beyond 2 days, signs of dehydration appear, or blood in stool',
      specialization: 'Gastroenterologist',
      icon: '<Activity className="w-6 h-6 text-green-400" />'
    });
  }

  // Default general recommendations
  recommendedActions.push(
    'Monitor your symptoms closely',
    'Stay well-hydrated',
    'Get adequate rest',
    'Maintain a healthy diet',
    'Avoid self-medication without consulting a doctor'
  );

  if (possibleCauses.length > 0) {
    recommendedActions.push('Consider scheduling a consultation with a healthcare provider');
  }

  // AI Insights
  const aiInsights = `Based on your reported symptoms (${symptoms.join(', ')}), I've identified ${possibleCauses.length} potential conditions. ` +
    (hasEmergency 
      ? 'IMPORTANT: Some of your symptoms require immediate medical attention. ' 
      : 'While these are preliminary assessments, ') +
    'please remember that this analysis is for informational purposes only and should not replace professional medical advice. ' +
    (possibleCauses.length > 0 
      ? `The most likely condition appears to be ${possibleCauses[0].condition} with a ${possibleCauses[0].probability}% match. `
      : '') +
    'I recommend consulting with a qualified healthcare provider for accurate diagnosis and treatment.';

  return {
    confidence: possibleCauses.length > 0 ? possibleCauses[0].probability : 50,
    possibleCauses,
    emergencyWarning,
    aiInsights,
    recommendedActions,
    timestamp: new Date()
  };
}

// @desc    Get symptom history
// @route   GET /api/symptoms/history
// @access  Private
exports.getSymptomHistory = async (req, res) => {
  try {
    const history = await AnalysisResult.find({ userId: req.user.id })
      .sort({ timestamp: -1 })
      .limit(10);

    res.status(200).json({
      success: true,
      data: history
    });

  } catch (error) {
    console.error('Get history error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching symptom history',
      error: error.message
    });
  }
};