const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Doctor name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required']
  },
  specialization: {
    type: String,
    required: [true, 'Specialization is required'],
    enum: ['cardiology', 'neurology', 'orthopedics', 'pediatrics', 'ophthalmology', 'general', 'dermatology', 'gynecology', 'psychiatry', 'dentistry']
  },
  experience: {
    type: Number,
    required: [true, 'Years of experience is required'],
    min: 0
  },
  education: [{
    degree: String,
    institution: String,
    year: Number
  }],
  languages: [String],
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  reviewCount: {
    type: Number,
    default: 0
  },
  hospital: {
    name: {
      type: String,
      required: true
    },
    address: {
      street: String,
      city: String,
      state: String,
      zipCode: String,
      country: {
        type: String,
        default: 'India'
      }
    },
    location: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point'
      },
      coordinates: {
        type: [Number],
        default: [0, 0]
      }
    }
  },
  consultationFee: {
    type: Number,
    required: [true, 'Consultation fee is required'],
    min: 0
  },
  availability: {
    days: [{
      type: String,
      enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    }],
    slots: [{
      day: String,
      startTime: String,
      endTime: String
    }]
  },
  services: [String],
  about: String,
  verified: {
    type: Boolean,
    default: false
  },
  profilePicture: String,
  onlineConsultation: {
    type: Boolean,
    default: false
  },
  awards: [String],
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Create geospatial index
doctorSchema.index({ 'hospital.location': '2dsphere' });

module.exports = mongoose.model('Doctor', doctorSchema);
