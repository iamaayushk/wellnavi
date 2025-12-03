const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Password must be at least 8 characters long'],
    select: false
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required']
  },
  dateOfBirth: {
    type: Date,
    required: [true, 'Date of birth is required']
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
    required: false
  },
  profilePicture: {
    type: String,
    default: null
  },
  healthProfile: {
    bloodType: String,
    height: Number,
    weight: Number,
    bmi: Number,
    chronicConditions: [String],
    allergies: [String],
    medications: [String],
    familyHistory: [String]
  },
  preferences: {
    dietType: {
      type: String,
      enum: ['vegetarian', 'vegan', 'non-vegetarian', 'pescatarian', 'other'],
      default: 'other'
    },
    exercisePreference: {
      type: String,
      enum: ['home', 'gym', 'outdoor', 'mixed'],
      default: 'mixed'
    },
    goals: [String]
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  allowMarketing: {
    type: Boolean,
    default: false
  },
  lastLogin: {
    type: Date,
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw new Error(error);
  }
};

// Calculate BMI
userSchema.methods.calculateBMI = function() {
  if (this.healthProfile.height && this.healthProfile.weight) {
    const heightInMeters = this.healthProfile.height / 100;
    this.healthProfile.bmi = (this.healthProfile.weight / (heightInMeters * heightInMeters)).toFixed(2);
  }
};

module.exports = mongoose.model('User', userSchema);
