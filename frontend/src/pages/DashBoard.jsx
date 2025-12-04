  import React, { useState, useEffect } from 'react';
  import { Heart, Shield, Brain, Activity, TrendingUp, Stethoscope, AlertCircle, Target, Sun, Menu, Home, Bot, LogOut, Calendar, Bell, Settings, ChevronRight, Droplets, Zap, Plus, X } from 'lucide-react';
  import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
  import { useNavigate } from 'react-router-dom';
  import { getUser, logout } from '../utils/auth';
  import { healthAPI } from '../services/api';

  const Dashboard = () => {
    const [selectedTimeframe, setSelectedTimeframe] = useState('6months');
  const [showDataInputModal, setShowDataInputModal] = useState(false);
  const [showSettingsDropdown, setShowSettingsDropdown] = useState(false);
  const [user, setUser] = useState(null);
  const [healthData, setHealthData] = useState({
    steps: '',
    heartRate: '',
    sleep: '',
    water: '',
    weight: '',
    calories: ''
  });
  const [healthTrends, setHealthTrends] = useState([]);
  const [weeklyActivity, setWeeklyActivity] = useState([]);
  const [activityData, setActivityData] = useState([]);    const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await getUser();
      if (userData) {
        setUser(userData);
      }
    };
    fetchUser();
    fetchTodayHealthData();
    fetchHistoricalData();
  }, []);  const fetchTodayHealthData = async () => {
    try {
      const response = await healthAPI.getTodayHealthData();
      
      if (response.data.success && response.data.data) {
        const metrics = response.data.data.metrics;
        setHealthData({
          steps: metrics.steps || 0,
          heartRate: metrics.heartRate?.average || 0,
          sleep: metrics.sleep?.hours || 0,
          water: metrics.hydration?.glasses || 0,
          weight: metrics.weight || 0,
          calories: metrics.calories || 0
        });
      }
    } catch (error) {
      console.error('Error fetching health data:', error);
    }
  };

  const fetchHistoricalData = async () => {
    try {
      const response = await healthAPI.getHealthData({ limit: 30 });
      
      if (response.data.success && response.data.data) {
        const data = response.data.data;
        
        // Process data for health trends chart (last 6 months)
        const trends = data.slice(0, 6).reverse().map((item) => {
          const date = new Date(item.date);
          const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
          return {
            month: `${monthNames[date.getMonth()]} ${date.getDate()}`,
            // BMI: parseFloat(item.metrics.bmi) || 0,
            heartRate: item.metrics.heartRate?.average || 0,
            sleep: item.metrics.sleep?.hours || 0
          };
        });
        setHealthTrends(trends);
        
        // Process data for weekly activity (last 7 days)
        const weekly = data.slice(0, 7).reverse().map((item) => {
          const date = new Date(item.date);
          const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
          return {
            day: days[date.getDay()],
            steps: item.metrics.steps || 0,
            active: Math.round((item.metrics.steps || 0) / 100) // Estimate active minutes
          };
        });
        setWeeklyActivity(weekly);
        
        // Calculate activity breakdown for pie chart
        if (data.length > 0) {
          const latest = data[0].metrics;
          const totalMinutes = 24 * 60;
          const sleepMinutes = (latest.sleep?.hours || 0) * 60;
          const activeMinutes = Math.round((latest.steps || 0) / 100);
          const sedentaryMinutes = totalMinutes - sleepMinutes - activeMinutes;
          
          setActivityData([
            { name: 'Active', value: Math.round((activeMinutes / totalMinutes) * 100), color: '#10B981' },
            { name: 'Sleep', value: Math.round((sleepMinutes / totalMinutes) * 100), color: '#8B5CF6' },
            { name: 'Sedentary', value: Math.round((sedentaryMinutes / totalMinutes) * 100), color: '#6B7280' }
          ]);
        }
      }
    } catch (error) {
      console.error('Error fetching historical data:', error);
    }
  };    const navigateToSymptomChecker = () => {
      navigate('/checker');
    };

    const handleLogout = async () => {
      await logout();
      navigate('/login');
    };

    const handleDataInputChange = (e) => {
      const { name, value } = e.target;
      setHealthData(prev => ({
        ...prev,
        [name]: value === '' ? '' : parseFloat(value) || ''
      }));
    };

    const handleSaveHealthData = async () => {
      try {
        const response = await healthAPI.addHealthData(healthData);

        if (response.data.success) {
          console.log('Health data saved successfully');
          setShowDataInputModal(false);
          // Refresh both today's data and historical data
          await fetchTodayHealthData();
          await fetchHistoricalData();
        }
      } catch (error) {
        console.error('Error saving health data:', error);
        alert('Failed to save health data. Please try again.');
      }
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-sky-900 to-slate-900 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div 
            className="absolute rounded-full mix-blend-multiply filter blur-3xl animate-pulse"
            style={{
              top: '80px',
              left: '40px',
              width: '288px',
              height: '288px',
              background: 'rgba(168, 85, 247, 0.1)',
            }}
          ></div>
          <div 
            className="absolute rounded-full mix-blend-multiply filter blur-3xl animate-pulse"
            style={{
              top: '160px',
              right: '80px',
              width: '384px',
              height: '384px',
              background: 'rgba(59, 130, 246, 0.1)',
              animationDelay: '2s',
            }}
          ></div>
          <div 
            className="absolute rounded-full mix-blend-multiply filter blur-3xl animate-pulse"
            style={{
              bottom: '80px',
              left: '80px',
              width: '320px',
              height: '320px',
              background: 'rgba(16, 185, 129, 0.1)',
              animationDelay: '4s',
            }}
          ></div>
        </div>

        {/* Navigation Bar */}
        <header 
          className="sticky top-0 z-50 border-b shadow-lg"
          style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(16px)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Heart className="text-pink-400 animate-pulse" size={32} />
                  <div 
                    className="absolute inset-0 rounded-full animate-ping"
                    style={{
                      background: 'rgba(244, 114, 182, 0.2)',
                    }}
                  ></div>
                </div>
                <span 
                  className="text-2xl font-bold bg-clip-text text-transparent"
                  style={{
                    background: 'linear-gradient(to right, rgb(244, 114, 182), rgb(196, 181, 253), rgb(129, 140, 248))',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  WellNavi
                </span>
              </div>
              
              <div className="flex items-center space-x-6">
                <nav className="hidden md:flex items-center space-x-6">
                  <button 
                  onClick={() => navigate('/')}
                  className="flex cursor-pointer items-center px-3 py-2 text-gray-300 hover:text-white transition-all duration-300 hover:scale-105">
                    <Home className="w-4 h-4 mr-2" />
                    Home
                  </button>
                  <button 
                    onClick={navigateToSymptomChecker}
                    className="flex cursor-pointer items-center px-3 py-2 text-gray-300 hover:text-white transition-all duration-300 hover:scale-105"
                  >
                    <Bot className="w-4 h-4 mr-2" />
                    Symptom Checker
                  </button>
                  <button className="flex cursor-pointer items-center px-3 py-2 text-white bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-lg border border-white/20">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Dashboard
                  </button>
                </nav>
                
                <div className="flex items-center space-x-4">
                  <button 
                    onClick={() => setShowDataInputModal(true)}
                    className="relative cursor-pointer p-2 text-gray-300 hover:text-white transition-colors"
                    title="Add Health Data"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                  <div className="relative">
                    <button 
                      onClick={() => setShowSettingsDropdown(!showSettingsDropdown)}
                      className="p-2 cursor-pointer text-gray-300 hover:text-white transition-colors"
                    >
                      <Settings className="w-5 h-5" />
                    </button>
                    {showSettingsDropdown && (
                      <div 
                        className="absolute right-0 mt-2 w-48 rounded-lg shadow-lg border z-50"
                        style={{
                          background: 'rgba(30, 41, 59, 0.95)',
                          backdropFilter: 'blur(16px)',
                          borderColor: 'rgba(255, 255, 255, 0.2)',
                        }}
                      >
                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-3 text-white hover:bg-white/10 flex items-center space-x-2 rounded-lg transition-colors"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Logout</span>
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                      {user?.firstName?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <span className="text-sm font-medium text-white">{user?.firstName || 'User'}</span>
                  </div>
                </div>
                
                <button className="md:hidden cursor-pointer  text-gray-300 hover:text-white">
                  <Menu className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
          {/* Personalized Greeting */}
          <div 
            className="rounded-2xl p-6 text-white mb-8 border"
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(16px)',
              borderColor: 'rgba(255, 255, 255, 0.2)',
            }}
          >
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold flex items-center">
                  <Sun className="mr-3 text-amber-400" size={36} />
                  Hi, {user?.firstName || 'User'}!
                </h1>
                <p className="text-gray-300 mt-2 text-lg">Ready to make today healthier than yesterday?</p>
              </div>
            </div>
          </div>

          {/* Health Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Today's Activity */}
            <div 
              className="rounded-xl p-6 shadow-xl border"
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(16px)',
                borderColor: 'rgba(255, 255, 255, 0.2)',
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">Today's Steps</h3>
                <Activity className="text-blue-400" size={24} />
              </div>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-3xl font-bold text-blue-400">{healthData.steps.toLocaleString()}</span>
                    <span className="text-sm text-gray-300">/ 10,000</span>
                  </div>
                  <div className="w-full bg-blue-900/30 rounded-full h-3">
                    <div className="bg-gradient-to-r from-blue-500 to-blue-400 h-3 rounded-full transition-all duration-1000" style={{width: `${Math.min((healthData.steps / 10000) * 100, 100)}%`}}></div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-lg font-semibold text-white">{healthData.steps > 0 ? (healthData.steps * 0.0008).toFixed(1) : 0}km</div>
                    <div className="text-xs text-gray-400">Distance</div>
                  </div>
                  <div>
                    <div className="text-lg font-semibold text-white">{healthData.calories || 0}</div>
                    <div className="text-xs text-gray-400">Calories</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Heart Rate */}
            <div 
              className="rounded-xl p-6 shadow-xl border"
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(16px)',
                borderColor: 'rgba(255, 255, 255, 0.2)',
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">Heart Rate</h3>
                <Heart className="text-red-400 animate-pulse" size={24} />
              </div>
              <div className="space-y-4">
                <div>
                  <div className="flex items-baseline">
                    <span className="text-3xl font-bold text-red-400">{healthData.heartRate || '--'}</span>
                    <span className="text-sm text-gray-300 ml-1">bpm</span>
                  </div>
                  <div className="text-sm text-emerald-400 mt-1">{healthData.heartRate > 0 ? 'Normal Range' : 'No data'}</div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-lg font-semibold text-white">{healthData.heartRate > 0 ? Math.max(60, healthData.heartRate - 10) : '--'}</div>
                    <div className="text-xs text-gray-400">Resting</div>
                  </div>
                  <div>
                    <div className="text-lg font-semibold text-white">{healthData.heartRate > 0 ? Math.min(220, healthData.heartRate + 80) : '--'}</div>
                    <div className="text-xs text-gray-400">Max Today</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sleep Quality */}
            <div 
              className="rounded-xl p-6 shadow-xl border"
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(16px)',
                borderColor: 'rgba(255, 255, 255, 0.2)',
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">Sleep Quality</h3>
                <Brain className="text-purple-400" size={24} />
              </div>
              <div className="space-y-4">
                <div>
                  <div className="flex items-baseline">
                    <span className="text-3xl font-bold text-purple-400">{healthData.sleep || '--'}</span>
                    <span className="text-sm text-gray-300 ml-1">hours</span>
                  </div>
                  <div className="text-sm text-emerald-400 mt-1">{healthData.sleep >= 7 ? 'Excellent' : healthData.sleep > 0 ? 'Good' : 'No data'}</div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-lg font-semibold text-white">{healthData.sleep > 0 ? '23:15' : '--:--'}</div>
                    <div className="text-xs text-gray-400">Bedtime</div>
                  </div>
                  <div>
                    <div className="text-lg font-semibold text-white">{healthData.sleep > 0 ? '07:20' : '--:--'}</div>
                    <div className="text-xs text-gray-400">Wake Up</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Hydration */}
            <div 
              className="rounded-xl p-6 shadow-xl border"
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(16px)',
                borderColor: 'rgba(255, 255, 255, 0.2)',
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">Hydration</h3>
                <Droplets className="text-cyan-400" size={24} />
              </div>
              <div className="space-y-4">
                <div>
                  <div className="flex items-baseline">
                    <span className="text-3xl font-bold text-cyan-400">{healthData.water}</span>
                    <span className="text-sm text-gray-300 ml-1">/ 8 glasses</span>
                  </div>
                  <div className="w-full bg-cyan-900/30 rounded-full h-3 mt-2">
                    <div className="bg-gradient-to-r from-cyan-500 to-cyan-400 h-3 rounded-full transition-all duration-1000" style={{width: `${Math.min((healthData.water / 8) * 100, 100)}%`}}></div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-white">{(healthData.water * 0.25).toFixed(1)}L</div>
                  <div className="text-xs text-gray-400">Today's Intake</div>
                </div>
              </div>
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Health Trends Graph */}
            <div 
              className="rounded-xl p-6 shadow-xl border"
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(16px)',
                borderColor: 'rgba(255, 255, 255, 0.2)',
              }}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-white flex items-center">
                  <TrendingUp className="mr-2 text-emerald-400" size={24} />
                  Health Trends
                </h3>
                <select 
                  value={selectedTimeframe} 
                  onChange={(e) => setSelectedTimeframe(e.target.value)}
                  className="bg-white/10 text-white border border-white/20 rounded-lg px-3 py-1 text-sm backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="6months" className="bg-slate-800 text-white">6 Months</option>
                  <option value="3months" className="bg-slate-800 text-white">3 Months</option>
                  <option value="1month" className="bg-slate-800 text-white">1 Month</option>
                </select>
              </div>
              <div className="h-80">
                {healthTrends.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={healthTrends}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                      <XAxis dataKey="month" stroke="rgba(255,255,255,0.7)" />
                      <YAxis stroke="rgba(255,255,255,0.7)" />
                      <Tooltip 
                        contentStyle={{ 
                          background: 'rgba(255, 255, 255, 0.1)', 
                          border: '1px solid rgba(255, 255, 255, 0.2)', 
                          borderRadius: '12px',
                          backdropFilter: 'blur(16px)',
                          color: 'white'
                        }}
                      />
                      {/* <Line 
                        type="monotone" 
                        dataKey="BMI" 
                        stroke="#3B82F6" 
                        strokeWidth={3} 
                        name="BMI" 
                        dot={{ fill: '#3B82F6', strokeWidth: 2, r: 6 }}
                      /> */}
                      <Line 
                        type="monotone" 
                        dataKey="heartRate" 
                        stroke="#EF4444" 
                        strokeWidth={3} 
                        name="Heart Rate (bpm)" 
                        dot={{ fill: '#EF4444', strokeWidth: 2, r: 6 }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="sleep" 
                        stroke="#8B5CF6" 
                        strokeWidth={3} 
                        name="Sleep Hours" 
                        dot={{ fill: '#8B5CF6', strokeWidth: 2, r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center text-gray-400">
                      <Activity className="mx-auto mb-3 text-gray-500" size={48} />
                      <p className="text-lg">No health trend data available</p>
                      <p className="text-sm mt-2">Add your daily health data to see trends</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Weekly Activity */}
            <div 
              className="rounded-xl p-6 shadow-xl border"
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(16px)',
                borderColor: 'rgba(255, 255, 255, 0.2)',
              }}
            >
              <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
                <Activity className="mr-2 text-blue-400" size={24} />
                Weekly Activity
              </h3>
              <div className="h-80">
                {weeklyActivity.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={weeklyActivity}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                      <XAxis dataKey="day" stroke="rgba(255,255,255,0.7)" />
                      <YAxis stroke="rgba(255,255,255,0.7)" />
                      <Tooltip 
                        contentStyle={{ 
                          background: 'rgba(255, 255, 255, 0.1)', 
                          border: '1px solid rgba(255, 255, 255, 0.2)', 
                          borderRadius: '12px',
                          backdropFilter: 'blur(16px)',
                          color: 'white'
                        }}
                      />
                      <Bar dataKey="steps" fill="#3B82F6" name="Steps" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="active" fill="#10B981" name="Active Minutes" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center text-gray-400">
                      <TrendingUp className="mx-auto mb-3 text-gray-500" size={48} />
                      <p className="text-lg">No weekly activity data available</p>
                      <p className="text-sm mt-2">Track your daily activities to see weekly trends</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Health Risk Assessment */}
          <div 
            className="rounded-xl p-6 shadow-xl border mb-8"
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(16px)',
              borderColor: 'rgba(255, 255, 255, 0.2)',
            }}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-white flex items-center">
                <Shield className="mr-2 text-emerald-400" size={24} />
                Health Risk Assessment
              </h3>
              <div className="text-sm text-gray-300">Last updated: Today</div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-white">Cardiovascular Risk</span>
                  <div className="flex items-center">
                    <div className="w-20 h-2 bg-white/20 rounded-full mr-2">
                      <div className="w-1/4 h-2 bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full"></div>
                    </div>
                    <span className="text-sm font-semibold text-emerald-400">Low</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white">Diabetes Risk</span>
                  <div className="flex items-center">
                    <div className="w-20 h-2 bg-white/20 rounded-full mr-2">
                      <div className="w-1/3 h-2 bg-gradient-to-r from-amber-500 to-amber-400 rounded-full"></div>
                    </div>
                    <span className="text-sm font-semibold text-amber-400">Moderate</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white">Hypertension Risk</span>
                  <div className="flex items-center">
                    <div className="w-20 h-2 bg-white/20 rounded-full mr-2">
                      <div className="w-1/5 h-2 bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full"></div>
                    </div>
                    <span className="text-sm font-semibold text-emerald-400">Low</span>
                  </div>
                </div>
              </div>

              <div className="h-48">
                {activityData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={activityData}
                        cx="50%"
                        cy="50%"
                        outerRadius={60}
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}%`}
                      >
                        {activityData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ 
                          background: 'rgba(255, 255, 255, 0.1)', 
                          border: '1px solid rgba(255, 255, 255, 0.2)', 
                          borderRadius: '12px',
                          backdropFilter: 'blur(16px)',
                          color: 'white'
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center text-gray-400">
                      <Target className="mx-auto mb-2 text-gray-500" size={40} />
                      <p className="text-sm">No activity breakdown</p>
                    </div>
                  </div>
                )}
              </div>

              <div 
                className="p-4 rounded-lg"
                style={{
                  background: 'rgba(16, 185, 129, 0.1)',
                  backdropFilter: 'blur(8px)',
                }}
              >
                <h4 className="font-semibold text-emerald-300 mb-2">AI Health Recommendation</h4>
                <p className="text-emerald-200 text-sm mb-3">
                  Your overall health metrics are improving! Continue your current exercise routine and consider adding more cardio for optimal cardiovascular health.
                </p>
                <div className="text-xs text-emerald-400">Confidence: 92%</div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div 
            className="rounded-xl p-6 shadow-xl border"
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(16px)',
              borderColor: 'rgba(255, 255, 255, 0.2)',
            }}
          >
            <h3 className="text-xl font-semibold text-white mb-6">Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <button 
                onClick={navigateToSymptomChecker}
                className="p-6 rounded-xl border transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 group"
                style={{
                  background: 'rgba(239, 68, 68, 0.1)',
                  backdropFilter: 'blur(8px)',
                  borderColor: 'rgba(239, 68, 68, 0.3)',
                }}
              >
                <div className="flex items-center mb-3">
                  <Stethoscope className="text-red-400 group-hover:scale-110 transition-transform" size={28} />
                  <h4 className="text-lg font-semibold text-white ml-3">Symptom Checker</h4>
                </div>
                <p className="text-gray-300 text-sm">Quick AI-powered symptom analysis and health recommendations</p>
                <ChevronRight className="w-5 h-5 text-red-400 mt-2 group-hover:translate-x-1 transition-transform" />
              </button>

              <button className="p-6 rounded-xl border transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 group"
                style={{
                  background: 'rgba(251, 146, 60, 0.1)',
                  backdropFilter: 'blur(8px)',
                  borderColor: 'rgba(251, 146, 60, 0.3)',
                }}
              >
                <div className="flex items-center mb-3">
                  <AlertCircle className="text-orange-400 group-hover:scale-110 transition-transform" size={28} />
                  <h4 className="text-lg font-semibold text-white ml-3">Risk Prediction</h4>
                </div>
                <p className="text-gray-300 text-sm">Get insights on potential health risks based on your data</p>
                <ChevronRight className="w-5 h-5 text-orange-400 mt-2 group-hover:translate-x-1 transition-transform" />
              </button>

              <button className="p-6 rounded-xl border transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 group"
                style={{
                  background: 'rgba(59, 130, 246, 0.1)',
                  backdropFilter: 'blur(8px)',
                  borderColor: 'rgba(59, 130, 246, 0.3)',
                }}
              >
                <div className="flex items-center mb-3">
                  <Target className="text-blue-400 group-hover:scale-110 transition-transform" size={28} />
                  <h4 className="text-lg font-semibold text-white ml-3">Wellness Plans</h4>
                </div>
                <p className="text-gray-300 text-sm">Customized wellness plans tailored to your health goals</p>
                <ChevronRight className="w-5 h-5 text-blue-400 mt-2 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* Health Data Input Modal */}
        {showDataInputModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div 
              className="rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto border"
              style={{
                background: 'rgba(30, 41, 59, 0.95)',
                backdropFilter: 'blur(16px)',
                borderColor: 'rgba(255, 255, 255, 0.2)',
              }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white flex items-center">
                  <Activity className="mr-3 text-blue-400" size={28} />
                  Add Today's Health Data
                </h2>
                <button 
                  onClick={() => setShowDataInputModal(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Steps
                  </label>
                  <input
                    type="number"
                    name="steps"
                    value={healthData.steps}
                    onChange={handleDataInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
                    placeholder="Enter steps"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Heart Rate (bpm)
                  </label>
                  <input
                    type="number"
                    name="heartRate"
                    value={healthData.heartRate}
                    onChange={handleDataInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
                    placeholder="Enter heart rate"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Sleep (hours)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    name="sleep"
                    value={healthData.sleep}
                    onChange={handleDataInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
                    placeholder="Enter sleep hours"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Water (glasses)
                  </label>
                  <input
                    type="number"
                    name="water"
                    value={healthData.water}
                    onChange={handleDataInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
                    placeholder="Enter glasses of water"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Weight (kg)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    name="weight"
                    value={healthData.weight}
                    onChange={handleDataInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
                    placeholder="Enter weight"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Calories
                  </label>
                  <input
                    type="number"
                    name="calories"
                    value={healthData.calories}
                    onChange={handleDataInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
                    placeholder="Enter calories"
                  />
                </div>
              </div>

              <div className="flex space-x-4 mt-8">
                <button
                  onClick={() => setShowDataInputModal(false)}
                  className="flex-1 px-6 py-3 bg-white/10 border border-white/20 rounded-lg text-white font-semibold hover:bg-white/20 transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveHealthData}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg text-white font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-[1.02] shadow-lg"
                >
                  Save Data
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  export default Dashboard;