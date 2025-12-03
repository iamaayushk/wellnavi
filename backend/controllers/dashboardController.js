const HealthMetric = require('../models/HealthMetric');
const User = require('../models/User');

// @desc    Get user dashboard data
// @route   GET /api/dashboard
// @access  Private
exports.getDashboardData = async (req, res) => {
  try {
    const userId = req.user.id;
    
    // Get today's metrics
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const todayMetric = await HealthMetric.findOne({
      userId,
      date: { $gte: today }
    });

    // Get last 7 days metrics
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    const weeklyMetrics = await HealthMetric.find({
      userId,
      date: { $gte: sevenDaysAgo }
    }).sort({ date: 1 });

    // Get last 6 months for trends
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
    
    const monthlyMetrics = await HealthMetric.aggregate([
      {
        $match: {
          userId: userId,
          date: { $gte: sixMonthsAgo }
        }
      },
      {
        $group: {
          _id: {
            month: { $month: '$date' },
            year: { $year: '$date' }
          },
          avgBMI: { $avg: '$metrics.bmi' },
          avgHeartRate: { $avg: '$metrics.heartRate.average' },
          avgSleep: { $avg: '$metrics.sleep.hours' },
          avgSteps: { $avg: '$metrics.steps' },
          avgWeight: { $avg: '$metrics.weight' }
        }
      },
      {
        $sort: { '_id.year': 1, '_id.month': 1 }
      }
    ]);

    // Calculate streak
    const streak = await calculateStreak(userId);

    // Get user profile for personalization
    const user = await User.findById(userId);

    res.status(200).json({
      success: true,
      data: {
        today: todayMetric,
        weekly: weeklyMetrics,
        monthly: monthlyMetrics,
        streak,
        user: {
          name: user.firstName,
          goals: user.preferences.goals || [],
          healthProfile: user.healthProfile
        }
      }
    });

  } catch (error) {
    console.error('Dashboard data error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching dashboard data',
      error: error.message
    });
  }
};

// @desc    Log daily health metrics
// @route   POST /api/health/metrics
// @access  Private
exports.logHealthMetrics = async (req, res) => {
  try {
    const userId = req.user.id;
    const { date, metrics, activities, meals, notes } = req.body;

    const metricDate = date ? new Date(date) : new Date();
    metricDate.setHours(0, 0, 0, 0);

    // Check if metrics already exist for this date
    let healthMetric = await HealthMetric.findOne({
      userId,
      date: metricDate
    });

    if (healthMetric) {
      // Update existing metrics
      healthMetric.metrics = { ...healthMetric.metrics, ...metrics };
      if (activities) healthMetric.activities = activities;
      if (meals) healthMetric.meals = meals;
      if (notes) healthMetric.notes = notes;
    } else {
      // Create new metrics
      healthMetric = new HealthMetric({
        userId,
        date: metricDate,
        metrics,
        activities: activities || [],
        meals: meals || [],
        notes
      });
    }

    await healthMetric.save();

    res.status(200).json({
      success: true,
      message: 'Health metrics logged successfully',
      data: healthMetric
    });

  } catch (error) {
    console.error('Log metrics error:', error);
    res.status(500).json({
      success: false,
      message: 'Error logging health metrics',
      error: error.message
    });
  }
};

// @desc    Get health trends
// @route   GET /api/health/trends
// @access  Private
exports.getHealthTrends = async (req, res) => {
  try {
    const { period = '6months' } = req.query;
    const userId = req.user.id;

    let startDate = new Date();
    switch(period) {
      case '1month':
        startDate.setMonth(startDate.getMonth() - 1);
        break;
      case '3months':
        startDate.setMonth(startDate.getMonth() - 3);
        break;
      case '6months':
      default:
        startDate.setMonth(startDate.getMonth() - 6);
    }

    const trends = await HealthMetric.find({
      userId,
      date: { $gte: startDate }
    }).sort({ date: 1 });

    res.status(200).json({
      success: true,
      data: trends
    });

  } catch (error) {
    console.error('Get trends error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching health trends',
      error: error.message
    });
  }
};

// @desc    Calculate risk prediction
// @route   POST /api/health/risk-prediction
// @access  Private
exports.calculateRiskPrediction = async (req, res) => {
  try {
    const formData = req.body;
    
    // Calculate risk scores based on lifestyle factors
    const risks = calculateRiskScores(formData);
    
    // Get preventive measures
    const preventiveMeasures = getPreventiveMeasures(risks);

    res.status(200).json({
      success: true,
      data: {
        risks,
        preventiveMeasures
      }
    });

  } catch (error) {
    console.error('Risk prediction error:', error);
    res.status(500).json({
      success: false,
      message: 'Error calculating risk prediction',
      error: error.message
    });
  }
};

// Helper function to calculate streak
async function calculateStreak(userId) {
  const metrics = await HealthMetric.find({ userId }).sort({ date: -1 });
  
  let streak = 0;
  let currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  for (const metric of metrics) {
    const metricDate = new Date(metric.date);
    metricDate.setHours(0, 0, 0, 0);
    
    const daysDiff = Math.floor((currentDate - metricDate) / (1000 * 60 * 60 * 24));
    
    if (daysDiff === streak) {
      streak++;
    } else if (daysDiff > streak) {
      break;
    }
  }
  
  return streak;
}

// Helper function to calculate risk scores
function calculateRiskScores(formData) {
  let cardiovascularRisk = 20;
  let diabetesRisk = 15;
  let cancerRisk = 10;
  let mentalHealthRisk = 25;
  let obesityRisk = 30;

  // Smoking impact
  if (formData.smoking === 'current') {
    cardiovascularRisk += 30;
    cancerRisk += 40;
  } else if (formData.smoking === 'former') {
    cardiovascularRisk += 15;
    cancerRisk += 20;
  }

  // Alcohol impact
  if (formData.alcohol === 'heavy') {
    cardiovascularRisk += 20;
    cancerRisk += 15;
  } else if (formData.alcohol === 'moderate') {
    cardiovascularRisk += 5;
  }

  // Exercise impact
  if (formData.exercise === 'sedentary') {
    cardiovascularRisk += 25;
    diabetesRisk += 20;
    obesityRisk += 30;
    mentalHealthRisk += 15;
  } else if (formData.exercise === 'intense') {
    cardiovascularRisk -= 25;
    diabetesRisk -= 30;
    obesityRisk -= 35;
    mentalHealthRisk -= 20;
  }

  // Diet impact
  if (formData.diet === 'poor') {
    cardiovascularRisk += 20;
    diabetesRisk += 25;
    obesityRisk += 25;
  } else if (formData.diet === 'excellent') {
    cardiovascularRisk -= 20;
    diabetesRisk -= 25;
    obesityRisk -= 30;
  }

  // Stress impact
  if (formData.stress === 'high') {
    cardiovascularRisk += 15;
    mentalHealthRisk += 30;
  }

  // Cap values between 5 and 85
  cardiovascularRisk = Math.max(5, Math.min(85, cardiovascularRisk));
  diabetesRisk = Math.max(5, Math.min(85, diabetesRisk));
  cancerRisk = Math.max(5, Math.min(85, cancerRisk));
  mentalHealthRisk = Math.max(5, Math.min(85, mentalHealthRisk));
  obesityRisk = Math.max(5, Math.min(85, obesityRisk));

  return {
    cardiovascular: Math.round(cardiovascularRisk),
    diabetes: Math.round(diabetesRisk),
    cancer: Math.round(cancerRisk),
    mentalHealth: Math.round(mentalHealthRisk),
    obesity: Math.round(obesityRisk)
  };
}

// Helper function to get preventive measures
function getPreventiveMeasures(risks) {
  const measures = [];

  if (risks.cardiovascular > 50) {
    measures.push({
      title: 'Cardiovascular Health',
      recommendations: [
        'Engage in 150 minutes of moderate aerobic activity weekly',
        'Reduce sodium intake to less than 2,300mg daily',
        'Quit smoking and limit alcohol consumption',
        'Monitor blood pressure regularly'
      ]
    });
  }

  if (risks.diabetes > 50) {
    measures.push({
      title: 'Diabetes Prevention',
      recommendations: [
        'Maintain a healthy weight (BMI 18.5-24.9)',
        'Choose whole grains over refined carbohydrates',
        'Regular blood sugar monitoring',
        'Incorporate strength training 2-3 times weekly'
      ]
    });
  }

  if (risks.mentalHealth > 50) {
    measures.push({
      title: 'Mental Wellness',
      recommendations: [
        'Practice stress management techniques (meditation, yoga)',
        'Maintain social connections and relationships',
        'Ensure 7-9 hours of quality sleep nightly',
        'Consider professional counseling if needed'
      ]
    });
  }

  return measures;
}
