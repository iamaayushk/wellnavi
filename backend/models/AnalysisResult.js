const mongoose = require('mongoose');

const analysisResultSchema = new mongoose.Schema({
  confidence: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  possibleCauses: [{
    condition: {
      type: String,
      required: true
    },
    severity: {
      type: String,
      required: true
    },
    probability: {
      type: Number,
      required: true,
      min: 0,
      max: 100
    },
    description: {
      type: String,
      required: true
    },
    symptoms: [String],
    recommendations: [String],
    whenToSeeDoctor: {
      type: String,
      required: true
    },
    specialization: {
      type: String,
      required: true
    }
  }],
  emergencyWarning: {
    type: String,
    default: null
  },
  aiInsights: {
    type: String,
    required: true
  },
  recommendedActions: [String]
}, { timestamps: true });

const AnalysisResult = mongoose.model('AnalysisResult', analysisResultSchema);

module.exports = AnalysisResult;