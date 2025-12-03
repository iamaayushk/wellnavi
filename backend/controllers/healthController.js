const HealthMetric = require('../models/HealthMetric');

class HealthController {
  // Method to add health data
  async addHealthData(req, res) {
    try {
      const { steps, heartRate, sleep, water, weight, calories } = req.body;
      const userId = req.user.id;

      // Check if health data already exists for today
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);

      let healthMetric = await HealthMetric.findOne({
        userId,
        date: {
          $gte: today,
          $lt: tomorrow
        }
      });

      const healthData = {
        steps: steps || 0,
        calories: calories || 0,
        heartRate: {
          average: heartRate || 0,
          resting: heartRate ? Math.max(60, heartRate - 10) : 0,
          max: heartRate ? Math.min(220, heartRate + 80) : 0
        },
        sleep: {
          hours: sleep || 0,
          bedtime: sleep > 0 ? '23:15' : null,
          wakeTime: sleep > 0 ? '07:20' : null
        },
        hydration: {
          glasses: water || 0,
          liters: water ? (water * 0.25) : 0
        },
        weight: weight || 0,
        distance: steps ? (steps * 0.0008) : 0,
        bmi: weight && req.user.height ? (weight / Math.pow(req.user.height / 100, 2)).toFixed(1) : 0
      };

      if (healthMetric) {
        // Update existing record
        healthMetric.metrics = healthData;
        await healthMetric.save();
      } else {
        // Create new record
        healthMetric = await HealthMetric.create({
          userId,
          date: new Date(),
          metrics: healthData
        });
      }

      res.status(200).json({
        success: true,
        message: 'Health data saved successfully',
        data: healthMetric
      });
    } catch (error) {
      console.error('Error adding health data:', error);
      res.status(500).json({
        success: false,
        message: 'Error saving health data',
        error: error.message
      });
    }
  }

  // Method to get health data for a specific date range
  async getHealthData(req, res) {
    try {
      const userId = req.user.id;
      const { startDate, endDate, limit = 30 } = req.query;

      const query = { userId };

      if (startDate || endDate) {
        query.date = {};
        if (startDate) query.date.$gte = new Date(startDate);
        if (endDate) query.date.$lte = new Date(endDate);
      }

      const healthMetrics = await HealthMetric.find(query)
        .sort({ date: -1 })
        .limit(parseInt(limit));

      res.status(200).json({
        success: true,
        count: healthMetrics.length,
        data: healthMetrics
      });
    } catch (error) {
      console.error('Error fetching health data:', error);
      res.status(500).json({
        success: false,
        message: 'Error fetching health data',
        error: error.message
      });
    }
  }

  // Method to get today's health data
  async getTodayHealthData(req, res) {
    try {
      const userId = req.user.id;
      
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);

      const healthMetric = await HealthMetric.findOne({
        userId,
        date: {
          $gte: today,
          $lt: tomorrow
        }
      });

      if (!healthMetric) {
        return res.status(200).json({
          success: true,
          data: null
        });
      }

      res.status(200).json({
        success: true,
        data: healthMetric
      });
    } catch (error) {
      console.error('Error fetching today\'s health data:', error);
      res.status(500).json({
        success: false,
        message: 'Error fetching health data',
        error: error.message
      });
    }
  }

  // Method to get health tips
  getHealthTips(req, res) {
    const healthTips = [
      {
        title: "Stay Hydrated",
        description: "Drink 8-10 glasses of water daily to support overall health."
      },
      {
        title: "Regular Exercise",
        description: "30 minutes of activity can boost immunity and reduce symptoms."
      },
      {
        title: "Quality Sleep",
        description: "7-9 hours of sleep helps your body fight infections naturally."
      }
    ];
    
    res.status(200).json({
      success: true,
      data: healthTips
    });
  }

  // Method to get general health information
  getGeneralHealthInfo(req, res) {
    const generalInfo = {
      title: "Understanding Your Health",
      content: "Maintaining a balanced diet, regular exercise, and adequate sleep are crucial for good health."
    };

    res.status(200).json({
      success: true,
      data: generalInfo
    });
  }
}

module.exports = HealthController;