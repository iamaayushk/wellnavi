import React, { useState, useEffect } from 'react';
import { 
  Brain, 
  Utensils, 
  Dumbbell, 
  Heart, 
  CheckCircle, 
  Circle, 
  Calendar, 
  Target, 
  TrendingUp, 
  Sparkles, 
  Clock, 
  Award, 
  Flame,
  Apple,
  Activity,
  Moon,
  Droplets,
  Coffee,
  Book,
  Music,
  Sun,
  ChevronRight
} from 'lucide-react';

const PersonalizedHealthPlans = () => {
  const [activeTab, setActiveTab] = useState('diet');
  const [completedTasks, setCompletedTasks] = useState(new Set());
  const [currentDate, setCurrentDate] = useState(new Date());
  const [weekProgress, setWeekProgress] = useState(0);

  // Simulated user data - would come from API/context
  const userProfile = {
    name: "Alex",
    goals: ["Weight Loss", "Stress Reduction", "Better Sleep"],
    riskFactors: ["High Stress", "Sedentary Lifestyle"],
    preferences: ["Vegetarian", "Home Workouts", "Morning Routine"]
  };

  const tabs = [
    { id: 'diet', label: 'Diet Plan', icon: <Utensils className="w-5 h-5" />, color: 'text-green-600' },
    { id: 'exercise', label: 'Exercise Plan', icon: <Dumbbell className="w-5 h-5" />, color: 'text-blue-600' },
    { id: 'mental', label: 'Mental Wellness', icon: <Brain className="w-5 h-5" />, color: 'text-purple-600' }
  ];

  const dietPlan = {
    aiInsight: "Based on your vegetarian preference and weight loss goal, I've created a balanced plan focusing on plant-based proteins and nutrient-dense foods to boost metabolism while maintaining energy levels.",
    recommendations: [
      {
        title: "Morning Metabolism Booster",
        description: "Start your day with green tea and overnight oats with chia seeds",
        benefits: ["Increases metabolic rate by 12%", "Provides sustained energy", "Rich in omega-3 fatty acids"],
        timing: "6:30 - 7:30 AM"
      },
      {
        title: "Protein-Rich Lunch",
        description: "Quinoa Buddha bowl with chickpeas, roasted vegetables, and tahini dressing",
        benefits: ["Complete amino acid profile", "High fiber content", "Anti-inflammatory properties"],
        timing: "12:00 - 1:00 PM"
      },
      {
        title: "Light Evening Meal",
        description: "Lentil soup with mixed greens salad and avocado",
        benefits: ["Easy to digest", "Promotes better sleep", "Rich in folate and magnesium"],
        timing: "6:00 - 7:00 PM"
      }
    ],
    dailyChecklist: [
      { id: 'water', icon: <Droplets className="w-5 h-5 text-blue-500" />, task: 'Drink 8 glasses of water', completed: false },
      { id: 'breakfast', icon: <Coffee className="w-5 h-5 text-amber-500" />, task: 'Healthy breakfast with protein', completed: false },
      { id: 'fruits', icon: <Apple className="w-5 h-5 text-red-500" />, task: 'Eat 3 servings of fruits/vegetables', completed: false },
      { id: 'snack', icon: <Utensils className="w-5 h-5 text-green-500" />, task: 'Choose healthy snacks (nuts/seeds)', completed: false },
      { id: 'dinner', icon: <Moon className="w-5 h-5 text-indigo-500" />, task: 'Light dinner 3 hours before bed', completed: false }
    ]
  };

  const exercisePlan = {
    aiInsight: "Your personalized workout combines strength training and cardio to maximize calorie burn while building lean muscle. The home-friendly routine adapts to your busy schedule and fitness level.",
    recommendations: [
      {
        title: "Morning Energy Boost",
        description: "20-minute HIIT workout with bodyweight exercises",
        benefits: ["Burns calories for 24 hours", "Improves cardiovascular health", "Builds functional strength"],
        timing: "7:00 - 7:20 AM"
      },
      {
        title: "Midday Movement Break",
        description: "10-minute desk stretches and mobility routine",
        benefits: ["Reduces muscle tension", "Improves posture", "Boosts afternoon energy"],
        timing: "1:00 - 1:10 PM"
      },
      {
        title: "Evening Strength Session",
        description: "30-minute resistance training focusing on major muscle groups",
        benefits: ["Builds lean muscle mass", "Improves bone density", "Enhances metabolic rate"],
        timing: "6:00 - 6:30 PM"
      }
    ],
    dailyChecklist: [
      { id: 'warmup', icon: <Sun className="w-5 h-5 text-yellow-500" />, task: 'Complete 5-minute warm-up', completed: false },
      { id: 'cardio', icon: <Heart className="w-5 h-5 text-red-500" />, task: '20 minutes cardio activity', completed: false },
      { id: 'strength', icon: <Dumbbell className="w-5 h-5 text-blue-500" />, task: 'Strength training session', completed: false },
      { id: 'steps', icon: <Activity className="w-5 h-5 text-green-500" />, task: 'Walk 8,000+ steps', completed: false },
      { id: 'stretch', icon: <Moon className="w-5 h-5 text-purple-500" />, task: 'Evening stretching routine', completed: false }
    ]
  };

  const mentalPlan = {
    aiInsight: "Your mental wellness plan focuses on stress reduction and sleep improvement through mindfulness practices and cognitive techniques. The routine is designed to fit seamlessly into your daily schedule.",
    recommendations: [
      {
        title: "Morning Mindfulness",
        description: "10-minute guided meditation and gratitude journaling",
        benefits: ["Reduces cortisol levels", "Improves focus and clarity", "Sets positive intentions"],
        timing: "6:00 - 6:10 AM"
      },
      {
        title: "Stress Management Breaks",
        description: "Breathing exercises and mini-meditation sessions",
        benefits: ["Lowers stress hormones", "Improves emotional regulation", "Increases productivity"],
        timing: "Throughout the day"
      },
      {
        title: "Evening Wind-Down",
        description: "Relaxation techniques and sleep preparation routine",
        benefits: ["Improves sleep quality", "Reduces anxiety", "Promotes recovery"],
        timing: "9:00 - 9:30 PM"
      }
    ],
    dailyChecklist: [
      { id: 'meditation', icon: <Brain className="w-5 h-5 text-purple-500" />, task: 'Complete morning meditation', completed: false },
      { id: 'gratitude', icon: <Book className="w-5 h-5 text-blue-500" />, task: 'Write 3 gratitude points', completed: false },
      { id: 'breathing', icon: <Sun className="w-5 h-5 text-orange-500" />, task: 'Practice deep breathing (3 times)', completed: false },
      { id: 'music', icon: <Music className="w-5 h-5 text-green-500" />, task: 'Listen to calming music', completed: false },
      { id: 'sleep', icon: <Moon className="w-5 h-5 text-indigo-500" />, task: 'Sleep routine by 10 PM', completed: false }
    ]
  };

  const getCurrentPlan = () => {
    switch (activeTab) {
      case 'diet': return dietPlan;
      case 'exercise': return exercisePlan;
      case 'mental': return mentalPlan;
      default: return dietPlan;
    }
  };

  const toggleTask = (taskId) => {
    const newCompleted = new Set(completedTasks);
    if (newCompleted.has(taskId)) {
      newCompleted.delete(taskId);
    } else {
      newCompleted.add(taskId);
    }
    setCompletedTasks(newCompleted);
  };

  const calculateDailyProgress = () => {
    const currentPlan = getCurrentPlan();
    const totalTasks = currentPlan.dailyChecklist.length;
    const completedCount = currentPlan.dailyChecklist.filter(task => completedTasks.has(task.id)).length;
    return Math.round((completedCount / totalTasks) * 100);
  };

  const getMotivationalMessage = () => {
    const progress = calculateDailyProgress();
    if (progress === 100) return "🎉 Perfect day! You've completed all your wellness tasks!";
    if (progress >= 80) return "🌟 Almost there! You're doing amazing!";
    if (progress >= 60) return "💪 Great progress! Keep up the momentum!";
    if (progress >= 40) return "🚀 You're on your way! Every step counts!";
    if (progress >= 20) return "🌱 Good start! Small steps lead to big changes!";
    return "✨ Ready to begin your wellness journey today?";
  };

  useEffect(() => {
    // Simulate loading user's completed tasks
    const timer = setTimeout(() => {
      setWeekProgress(Math.floor(Math.random() * 100));
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-full">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Your Personalized Health Plan</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            AI-powered recommendations tailored specifically for {userProfile.name} based on your goals, 
            preferences, and health profile.
          </p>
        </div>

        {/* User Goals & Progress Overview */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <div className="flex items-center mb-4">
              <Target className="w-6 h-6 text-blue-600 mr-3" />
              <h3 className="text-lg font-bold text-gray-800">Your Goals</h3>
            </div>
            <div className="space-y-2">
              {userProfile.goals.map((goal, index) => (
                <div key={index} className="flex items-center bg-blue-50 px-3 py-2 rounded-lg">
                  <CheckCircle className="w-4 h-4 text-blue-600 mr-2" />
                  <span className="text-sm font-medium text-gray-700">{goal}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-6">
            <div className="flex items-center mb-4">
              <Calendar className="w-6 h-6 text-green-600 mr-3" />
              <h3 className="text-lg font-bold text-gray-800">Today's Progress</h3>
            </div>
            <div className="text-center">
              <div className="relative w-24 h-24 mx-auto mb-4">
                <svg className="transform -rotate-90 w-24 h-24">
                  <circle
                    cx="48"
                    cy="48"
                    r="40"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    className="text-gray-200"
                  />
                  <circle
                    cx="48"
                    cy="48"
                    r="40"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 40}`}
                    strokeDashoffset={`${2 * Math.PI * 40 * (1 - calculateDailyProgress() / 100)}`}
                    className="text-green-500 transition-all duration-1000 ease-out"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold text-gray-800">{calculateDailyProgress()}%</span>
                </div>
              </div>
              <p className="text-sm text-gray-600">{getMotivationalMessage()}</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-6">
            <div className="flex items-center mb-4">
              <Award className="w-6 h-6 text-purple-600 mr-3" />
              <h3 className="text-lg font-bold text-gray-800">Weekly Stats</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Streak</span>
                <div className="flex items-center">
                  <Flame className="w-4 h-4 text-orange-500 mr-1" />
                  <span className="font-bold text-gray-800">7 days</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Completion</span>
                <span className="font-bold text-gray-800">{weekProgress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-purple-500 to-purple-600 h-2 rounded-full transition-all duration-1000"
                  style={{ width: `${weekProgress}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white p-2 rounded-2xl shadow-xl">
            <div className="flex space-x-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transform scale-105'
                      : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                  }`}
                >
                  <span className={activeTab === tab.id ? 'text-white' : tab.color}>
                    {tab.icon}
                  </span>
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* AI Recommendations */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
              <div className="flex items-center mb-6">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-lg mr-3">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">AI Health Coach Insights</h3>
              </div>
              
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 mb-6">
                <p className="text-gray-700 leading-relaxed">{getCurrentPlan().aiInsight}</p>
              </div>

              <div className="space-y-6">
                {getCurrentPlan().recommendations.map((rec, index) => (
                  <div key={index} className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-800 mb-2">{rec.title}</h4>
                        <p className="text-gray-600 mb-3">{rec.description}</p>
                      </div>
                      <div className="flex items-center text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                        <Clock className="w-4 h-4 mr-1" />
                        {rec.timing}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <h5 className="text-sm font-semibold text-gray-700">Key Benefits:</h5>
                      {rec.benefits.map((benefit, bIndex) => (
                        <div key={bIndex} className="flex items-start">
                          <ChevronRight className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-600">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Daily Checklist */}
          <div>
            <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-800">Daily Checklist</h3>
                <div className="bg-gradient-to-r from-green-500 to-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {calculateDailyProgress()}% Complete
                </div>
              </div>

              <div className="space-y-3">
                {getCurrentPlan().dailyChecklist.map((item) => (
                  <div key={item.id} className="group">
                    <div 
                      onClick={() => toggleTask(item.id)}
                      className={`flex items-center p-3 rounded-lg cursor-pointer transition-all duration-300 ${
                        completedTasks.has(item.id)
                          ? 'bg-green-50 border-2 border-green-200'
                          : 'bg-gray-50 border-2 border-transparent hover:border-gray-200 hover:bg-gray-100'
                      }`}
                    >
                      <div className="mr-3">
                        {completedTasks.has(item.id) ? (
                          <CheckCircle className="w-6 h-6 text-green-500" />
                        ) : (
                          <Circle className="w-6 h-6 text-gray-400 group-hover:text-gray-600" />
                        )}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center mb-1">
                          {item.icon}
                          <span className={`ml-2 font-medium transition-colors ${
                            completedTasks.has(item.id)
                              ? 'text-green-800 line-through'
                              : 'text-gray-800'
                          }`}>
                            {item.task}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Progress Bar */}
              <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Daily Progress</span>
                  <span>{completedTasks.size}/{getCurrentPlan().dailyChecklist.length} tasks</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${calculateDailyProgress()}%` }}
                  ></div>
                </div>
              </div>

              {/* Motivational Section */}
              {calculateDailyProgress() === 100 && (
                <div className="mt-6 bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-xl text-center">
                  <Award className="w-8 h-8 mx-auto mb-2" />
                  <h4 className="font-bold mb-1">Day Complete! 🎉</h4>
                  <p className="text-sm opacity-90">You've achieved all your wellness goals today!</p>
                </div>
              )}

              {calculateDailyProgress() >= 50 && calculateDailyProgress() < 100 && (
                <div className="mt-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-xl text-center">
                  <TrendingUp className="w-8 h-8 mx-auto mb-2" />
                  <h4 className="font-bold mb-1">Great Progress! 💪</h4>
                  <p className="text-sm opacity-90">You're more than halfway there!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalizedHealthPlans;