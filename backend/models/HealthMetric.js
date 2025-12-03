const mongoose = require('mongoose');

const healthMetricSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  date: {
    type: Date,
    default: Date.now,
    index: true
  },
  metrics: {
    steps: {
      type: Number,
      default: 0
    },
    calories: {
      type: Number,
      default: 0
    },
    activeMinutes: {
      type: Number,
      default: 0
    },
    distance: {
      type: Number,
      default: 0
    },
    heartRate: {
      resting: Number,
      average: Number,
      max: Number
    },
    bloodPressure: {
      systolic: Number,
      diastolic: Number
    },
    weight: Number,
    bmi: Number,
    sleep: {
      hours: Number,
      quality: {
        type: String,
        enum: ['poor', 'fair', 'good', 'excellent']
      },
      bedtime: String,
      wakeTime: String
    },
    hydration: {
      glasses: {
        type: Number,
        default: 0
      },
      liters: {
        type: Number,
        default: 0
      }
    },
    mood: {
      type: String,
      enum: ['poor', 'low', 'neutral', 'good', 'excellent']
    },
    stressLevel: {
      type: String,
      enum: ['low', 'moderate', 'high', 'very-high']
    }
  },
  activities: [{
    type: {
      type: String,
      enum: ['walking', 'running', 'cycling', 'swimming', 'yoga', 'gym', 'other']
    },
    duration: Number,
    calories: Number,
    startTime: Date,
    endTime: Date
  }],
  meals: [{
    type: {
      type: String,
      enum: ['breakfast', 'lunch', 'dinner', 'snack']
    },
    time: Date,
    foods: [String],
    calories: Number,
    macros: {
      protein: Number,
      carbs: Number,
      fats: Number
    }
  }],
  notes: String
}, {
  timestamps: true
});

// Create compound index for efficient querying
healthMetricSchema.index({ userId: 1, date: -1 });

module.exports = mongoose.model('HealthMetric', healthMetricSchema);
