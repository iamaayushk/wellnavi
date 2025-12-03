const mongoose = require('mongoose');

const symptomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  category: {
    type: String,
    enum: ['neurological', 'general', 'respiratory', 'cardiovascular', 'digestive', 'musculoskeletal'],
    required: true,
  },
  severity: {
    type: String,
    enum: ['mild', 'moderate', 'severe'],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Symptom = mongoose.model('Symptom', symptomSchema);

module.exports = Symptom;