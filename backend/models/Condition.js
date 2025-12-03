const mongoose = require('mongoose');

const conditionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  symptoms: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Symptom',
  }],
  severity: {
    type: String,
    enum: ['mild', 'moderate', 'severe'],
    required: true,
  },
  recommendations: [{
    type: String,
  }],
  whenToSeeDoctor: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Condition = mongoose.model('Condition', conditionSchema);

module.exports = Condition;