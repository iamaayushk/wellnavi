import React from 'react';
import { Heart, Shield, Brain, Activity, TrendingUp, Stethoscope, AlertCircle, Target, Sun } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
  // Sample health trend data
  const healthTrends = [
    { month: 'Jan', BMI: 24.2, calories: 2200, sleep: 7.2 },
    { month: 'Feb', BMI: 24.0, calories: 2150, sleep: 7.5 },
    { month: 'Mar', BMI: 23.8, calories: 2100, sleep: 7.8 },
    { month: 'Apr', BMI: 23.6, calories: 2080, sleep: 8.0 },
    { month: 'May', BMI: 23.4, calories: 2050, sleep: 8.2 },
    { month: 'Jun', BMI: 23.2, calories: 2000, sleep: 8.1 }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Heart className="text-blue-500" size={32} />
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                WellNavi
              </span>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                  A
                </div>
                <span className="text-sm font-medium">Aayush</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Personalized Greeting */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-6 text-white mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold flex items-center">
                <Sun className="mr-3" size={32} />
                Good Morning, Aayush!
              </h1>
              <p className="opacity-90 mt-2 text-lg">Ready to make today healthier than yesterday?</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">Day 45</div>
              <div className="text-sm opacity-90">Wellness Journey</div>
            </div>
          </div>
        </div>

        {/* Health Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Risk Scores */}
          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Health Risk Score</h3>
              <Shield className="text-green-500" size={24} />
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Cardiovascular</span>
                <div className="flex items-center">
                  <div className="w-20 h-2 bg-gray-200 rounded-full mr-2">
                    <div className="w-1/4 h-2 bg-green-500 rounded-full"></div>
                  </div>
                  <span className="text-sm font-semibold text-green-600">Low</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Diabetes</span>
                <div className="flex items-center">
                  <div className="w-20 h-2 bg-gray-200 rounded-full mr-2">
                    <div className="w-1/3 h-2 bg-yellow-500 rounded-full"></div>
                  </div>
                  <span className="text-sm font-semibold text-yellow-600">Moderate</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Overall</span>
                <div className="flex items-center">
                  <div className="w-20 h-2 bg-gray-200 rounded-full mr-2">
                    <div className="w-1/4 h-2 bg-green-500 rounded-full"></div>
                  </div>
                  <span className="text-sm font-semibold text-green-600">Low Risk</span>
                </div>
              </div>
            </div>
          </div>

          {/* Daily Wellness Tips */}
          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Daily Wellness Tip</h3>
              <Brain className="text-purple-500" size={24} />
            </div>
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
              <h4 className="font-semibold text-purple-900 mb-2">Stay Hydrated! 💧</h4>
              <p className="text-sm text-purple-700">
                Your body is 60% water. Aim for 8-10 glasses today to boost energy and improve focus.
              </p>
              <div className="mt-3">
                <div className="text-xs text-purple-600">Progress: 4/8 glasses</div>
                <div className="w-full bg-purple-200 rounded-full h-2 mt-1">
                  <div className="bg-purple-500 h-2 rounded-full" style={{width: '50%'}}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Steps Taken */}
          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Today's Activity</h3>
              <Activity className="text-blue-500" size={24} />
            </div>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-2xl font-bold text-blue-600">8,420</span>
                  <span className="text-sm text-gray-600">/ 10,000 steps</span>
                </div>
                <div className="w-full bg-blue-100 rounded-full h-3">
                  <div className="bg-blue-500 h-3 rounded-full" style={{width: '84%'}}></div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-lg font-semibold text-gray-900">2.1km</div>
                  <div className="text-xs text-gray-600">Distance</div>
                </div>
                <div>
                  <div className="text-lg font-semibold text-gray-900">245</div>
                  <div className="text-xs text-gray-600">Calories</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Health Trends Graph */}
        <div className="bg-white rounded-xl p-6 shadow-sm border mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
            <TrendingUp className="mr-2 text-green-500" size={24} />
            Health Trends (Last 6 Months)
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={healthTrends}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip 
                  contentStyle={{ 
                    background: 'white', 
                    border: '1px solid #e5e7eb', 
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="BMI" 
                  stroke="#3b82f6" 
                  strokeWidth={3} 
                  name="BMI" 
                  dot={{ fill: '#3b82f6', strokeWidth: 2, r: 6 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="calories" 
                  stroke="#10b981" 
                  strokeWidth={3} 
                  name="Daily Calories" 
                  dot={{ fill: '#10b981', strokeWidth: 2, r: 6 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="sleep" 
                  stroke="#8b5cf6" 
                  strokeWidth={3} 
                  name="Sleep Hours" 
                  dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quick Links */}
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="p-6 bg-gradient-to-br from-red-50 to-pink-50 rounded-xl border border-red-100 hover:shadow-md transition-all group">
              <div className="flex items-center mb-3">
                <Stethoscope className="text-red-500 group-hover:scale-110 transition-transform" size={28} />
                <h4 className="text-lg font-semibold text-gray-900 ml-3">Symptom Checker</h4>
              </div>
              <p className="text-gray-600 text-sm">Quick AI-powered symptom analysis and health recommendations</p>
            </button>

            <button className="p-6 bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl border border-orange-100 hover:shadow-md transition-all group">
              <div className="flex items-center mb-3">
                <AlertCircle className="text-orange-500 group-hover:scale-110 transition-transform" size={28} />
                <h4 className="text-lg font-semibold text-gray-900 ml-3">Disease Risk Prediction</h4>
              </div>
              <p className="text-gray-600 text-sm">Get insights on potential health risks based on your data</p>
            </button>

            <button className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100 hover:shadow-md transition-all group">
              <div className="flex items-center mb-3">
                <Target className="text-blue-500 group-hover:scale-110 transition-transform" size={28} />
                <h4 className="text-lg font-semibold text-gray-900 ml-3">Personalized Health Plans</h4>
              </div>
              <p className="text-gray-600 text-sm">Customized wellness plans tailored to your health goals</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;