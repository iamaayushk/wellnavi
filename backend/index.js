const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cookieParser = require('cookie-parser');
const errorHandler = require('./middleware/errorHandler');

// Import routes
const authRoutes = require('./routes/auth');
const symptomRoutes = require('./routes/symptoms');
const healthRoutes = require('./routes/health');
const aiCheckRoutes = require('./routes/ai-check');
const doctorRoutes = require('./routes/doctors');
const appointmentRoutes = require('./routes/appointments');
const dashboardRoutes = require('./routes/dashboard');
const chatRoutes = require('./routes/chat');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
const allowedOrigins = [
  "http://localhost:5173",   // Local development
  process.env.FRONTEND_URL   // Production frontend
].filter(Boolean); // Remove undefined values

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, Postman, or curl)
    if (!origin) return callback(null, true);
    
    // Check if origin is in allowed list
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.log('❌ CORS blocked origin:', origin);
      console.log('✅ Allowed origins:', allowedOrigins);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(helmet());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later'
});
app.use('/api/', limiter);

// Routes
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'WellNavi API is running',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      symptoms: '/api/symptoms',
      analyzeSymptoms: '/api/analyze-symptoms',
      health: '/api/health',
      doctors: '/api/doctors',
      appointments: '/api/appointments',
      dashboard: '/api/dashboard',
      chat: '/api/chat'
    }
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/symptoms', symptomRoutes);
app.use('/api/health', healthRoutes);
app.use('/api/ai-check', aiCheckRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/chat', chatRoutes);

// Error Handling Middleware
app.use(errorHandler);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Database Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/wellnavi', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Connected to MongoDB');
  } catch (err) {
    console.error('❌ Database connection error:', err);
    process.exit(1);
  }
};

// Start Server
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
      console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
  process.exit(1);
});

module.exports = app;