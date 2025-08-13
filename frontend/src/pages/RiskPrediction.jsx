import React, { useState } from 'react';
import { Activity, AlertTriangle, Heart, Brain, Utensils, Cigarette, Wine, Zap, Shield, ChevronRight, TrendingUp, AlertCircle } from 'lucide-react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const DiseaseRiskPrediction = () => {
  const [formData, setFormData] = useState({
    age: '',
    gender: '',
    smoking: 'never',
    alcohol: 'none',
    exercise: 'sedentary',
    diet: 'poor',
    sleep: '7-8',
    stress: 'low',
    familyHistory: [],
    bmi: '',
    bloodPressure: 'normal'
  });

  const [riskResults, setRiskResults] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFamilyHistoryChange = (condition) => {
    setFormData(prev => ({
      ...prev,
      familyHistory: prev.familyHistory.includes(condition)
        ? prev.familyHistory.filter(c => c !== condition)
        : [...prev.familyHistory, condition]
    }));
  };

  const calculateRiskScores = () => {
    // Simulated ML risk calculation based on lifestyle factors
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
    } else if (formData.exercise === 'light') {
      cardiovascularRisk += 10;
      diabetesRisk += 10;
      obesityRisk += 15;
    } else if (formData.exercise === 'regular') {
      cardiovascularRisk -= 15;
      diabetesRisk -= 20;
      obesityRisk -= 25;
      mentalHealthRisk -= 10;
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
    } else if (formData.diet === 'average') {
      cardiovascularRisk += 5;
      diabetesRisk += 10;
      obesityRisk += 10;
    } else if (formData.diet === 'good') {
      cardiovascularRisk -= 10;
      diabetesRisk -= 15;
      obesityRisk -= 20;
    } else if (formData.diet === 'excellent') {
      cardiovascularRisk -= 20;
      diabetesRisk -= 25;
      obesityRisk -= 30;
    }

    // Stress impact
    if (formData.stress === 'high') {
      cardiovascularRisk += 15;
      mentalHealthRisk += 30;
    } else if (formData.stress === 'moderate') {
      cardiovascularRisk += 5;
      mentalHealthRisk += 15;
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
  };

  const handlePredict = async () => {
    setLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const risks = calculateRiskScores();
      setRiskResults(risks);
      setShowResults(true);
      setLoading(false);
    }, 2000);
  };

  const getRiskLevel = (score) => {
    if (score < 25) return { level: 'Low', color: 'text-green-600', bgColor: 'bg-green-100' };
    if (score < 50) return { level: 'Moderate', color: 'text-yellow-600', bgColor: 'bg-yellow-100' };
    if (score < 70) return { level: 'High', color: 'text-orange-600', bgColor: 'bg-orange-100' };
    return { level: 'Very High', color: 'text-red-600', bgColor: 'bg-red-100' };
  };

  const chartData = riskResults ? [
    { name: 'Cardiovascular', risk: riskResults.cardiovascular, color: '#EF4444' },
    { name: 'Diabetes', risk: riskResults.diabetes, color: '#F59E0B' },
    { name: 'Cancer', risk: riskResults.cancer, color: '#8B5CF6' },
    { name: 'Mental Health', risk: riskResults.mentalHealth, color: '#06B6D4' },
    { name: 'Obesity', risk: riskResults.obesity, color: '#10B981' }
  ] : [];

  const pieData = riskResults ? [
    { name: 'Low Risk', value: 5 - Object.values(riskResults).filter(r => r >= 70).length },
    { name: 'Moderate Risk', value: Object.values(riskResults).filter(r => r >= 25 && r < 50).length },
    { name: 'High Risk', value: Object.values(riskResults).filter(r => r >= 50 && r < 70).length },
    { name: 'Very High Risk', value: Object.values(riskResults).filter(r => r >= 70).length }
  ].filter(item => item.value > 0) : [];

  const COLORS = ['#10B981', '#F59E0B', '#F97316', '#EF4444'];

  const getPreventiveMeasures = () => {
    const measures = [];
    
    if (riskResults?.cardiovascular > 50) {
      measures.push({
        title: "Cardiovascular Health",
        icon: <Heart className="w-5 h-5 text-red-500" />,
        recommendations: [
          "Engage in 150 minutes of moderate aerobic activity weekly",
          "Reduce sodium intake to less than 2,300mg daily",
          "Quit smoking and limit alcohol consumption",
          "Monitor blood pressure regularly"
        ]
      });
    }

    if (riskResults?.diabetes > 50) {
      measures.push({
        title: "Diabetes Prevention",
        icon: <Zap className="w-5 h-5 text-orange-500" />,
        recommendations: [
          "Maintain a healthy weight (BMI 18.5-24.9)",
          "Choose whole grains over refined carbohydrates",
          "Regular blood sugar monitoring",
          "Incorporate strength training 2-3 times weekly"
        ]
      });
    }

    if (riskResults?.mentalHealth > 50) {
      measures.push({
        title: "Mental Wellness",
        icon: <Brain className="w-5 h-5 text-cyan-500" />,
        recommendations: [
          "Practice stress management techniques (meditation, yoga)",
          "Maintain social connections and relationships",
          "Ensure 7-9 hours of quality sleep nightly",
          "Consider professional counseling if needed"
        ]
      });
    }

    if (riskResults?.obesity > 50) {
      measures.push({
        title: "Weight Management",
        icon: <Activity className="w-5 h-5 text-green-500" />,
        recommendations: [
          "Create a sustainable caloric deficit",
          "Focus on nutrient-dense, whole foods",
          "Increase daily physical activity",
          "Track food intake and portion sizes"
        ]
      });
    }

    return measures;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-full">
              <AlertTriangle className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Disease Risk Prediction</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Get personalized health risk assessments based on your lifestyle factors and receive 
            tailored preventive recommendations to optimize your wellbeing.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Lifestyle Assessment Form */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <div className="flex items-center mb-6">
              <Utensils className="w-6 h-6 text-blue-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-800">Lifestyle Assessment</h2>
            </div>

            <div className="space-y-6">
              {/* Basic Information */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
                  <input
                    type="number"
                    value={formData.age}
                    onChange={(e) => handleInputChange('age', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your age"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                  <select
                    value={formData.gender}
                    onChange={(e) => handleInputChange('gender', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              {/* Smoking */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Smoking Status</label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { value: 'never', label: 'Never smoked', icon: <Shield className="w-4 h-4" /> },
                    { value: 'former', label: 'Former smoker', icon: <Cigarette className="w-4 h-4" /> },
                    { value: 'current', label: 'Current smoker', icon: <Cigarette className="w-4 h-4" /> },
                    { value: 'occasional', label: 'Occasional', icon: <Cigarette className="w-4 h-4" /> }
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleInputChange('smoking', option.value)}
                      className={`p-3 rounded-lg border-2 transition-all flex items-center space-x-2 ${
                        formData.smoking === option.value
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {option.icon}
                      <span className="text-sm font-medium">{option.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Alcohol Consumption */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Alcohol Consumption</label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { value: 'none', label: 'Never/Rarely' },
                    { value: 'light', label: 'Light (1-2/week)' },
                    { value: 'moderate', label: 'Moderate (3-7/week)' },
                    { value: 'heavy', label: 'Heavy (8+/week)' }
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleInputChange('alcohol', option.value)}
                      className={`p-3 rounded-lg border-2 transition-all flex items-center space-x-2 ${
                        formData.alcohol === option.value
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <Wine className="w-4 h-4" />
                      <span className="text-sm font-medium">{option.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Exercise Level */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Physical Activity Level</label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { value: 'sedentary', label: 'Sedentary' },
                    { value: 'light', label: 'Light Activity' },
                    { value: 'regular', label: 'Regular Exercise' },
                    { value: 'intense', label: 'Intense Training' }
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleInputChange('exercise', option.value)}
                      className={`p-3 rounded-lg border-2 transition-all flex items-center space-x-2 ${
                        formData.exercise === option.value
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <Activity className="w-4 h-4" />
                      <span className="text-sm font-medium">{option.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Diet Quality */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Diet Quality</label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { value: 'poor', label: 'Poor Diet' },
                    { value: 'average', label: 'Average Diet' },
                    { value: 'good', label: 'Good Diet' },
                    { value: 'excellent', label: 'Excellent Diet' }
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleInputChange('diet', option.value)}
                      className={`p-3 rounded-lg border-2 transition-all flex items-center space-x-2 ${
                        formData.diet === option.value
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <Utensils className="w-4 h-4" />
                      <span className="text-sm font-medium">{option.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Stress Level */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Stress Level</label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { value: 'low', label: 'Low Stress' },
                    { value: 'moderate', label: 'Moderate' },
                    { value: 'high', label: 'High Stress' }
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleInputChange('stress', option.value)}
                      className={`p-3 rounded-lg border-2 transition-all flex items-center space-x-2 ${
                        formData.stress === option.value
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <Brain className="w-4 h-4" />
                      <span className="text-sm font-medium">{option.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Predict Button */}
              <button
                onClick={handlePredict}
                disabled={loading || !formData.age || !formData.gender}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-lg font-semibold transition-all hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  <>
                    <TrendingUp className="w-5 h-5" />
                    <span>Analyze Risk Factors</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            {showResults && riskResults && (
              <>
                {/* Risk Overview */}
                <div className="bg-white rounded-2xl shadow-xl p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                    <AlertCircle className="w-6 h-6 text-blue-600 mr-3" />
                    Risk Assessment Overview
                  </h3>
                  
                  {/* Risk Distribution Pie Chart */}
                  <div className="mb-8">
                    <h4 className="text-lg font-semibold text-gray-800 mb-4 text-center">Risk Distribution Overview</h4>
                    <div className="flex justify-center">
                      <div className="relative">
                        <ResponsiveContainer width={280} height={280}>
                          <PieChart>
                            <defs>
                              <linearGradient id="lowRisk" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#10B981" />
                                <stop offset="100%" stopColor="#059669" />
                              </linearGradient>
                              <linearGradient id="moderateRisk" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#F59E0B" />
                                <stop offset="100%" stopColor="#D97706" />
                              </linearGradient>
                              <linearGradient id="highRisk" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#F97316" />
                                <stop offset="100%" stopColor="#EA580C" />
                              </linearGradient>
                              <linearGradient id="veryHighRisk" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#EF4444" />
                                <stop offset="100%" stopColor="#DC2626" />
                              </linearGradient>
                              <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
                                <feDropShadow dx="2" dy="2" stdDeviation="3" floodOpacity="0.3"/>
                              </filter>
                            </defs>
                            <Pie
                              data={pieData}
                              cx="50%"
                              cy="50%"
                              innerRadius={60}
                              outerRadius={120}
                              paddingAngle={2}
                              dataKey="value"
                              filter="url(#shadow)"
                            >
                              {pieData.map((entry, index) => {
                                const gradients = ['url(#lowRisk)', 'url(#moderateRisk)', 'url(#highRisk)', 'url(#veryHighRisk)'];
                                return (
                                  <Cell 
                                    key={`cell-${index}`} 
                                    fill={gradients[index % gradients.length]}
                                    stroke="white"
                                    strokeWidth={2}
                                  />
                                );
                              })}
                            </Pie>
                            <Tooltip 
                              contentStyle={{
                                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                                border: 'none',
                                borderRadius: '12px',
                                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
                              }}
                              formatter={(value, name) => [
                                `${value} condition${value !== 1 ? 's' : ''}`,
                                name
                              ]}
                            />
                          </PieChart>
                        </ResponsiveContainer>
                        
                        {/* Center Text */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-gray-800">
                              {Object.values(riskResults).length}
                            </div>
                            <div className="text-sm text-gray-600">Health Areas</div>
                            <div className="text-sm text-gray-600">Assessed</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Custom Legend */}
                    <div className="flex flex-wrap justify-center mt-4 space-x-4">
                      {pieData.map((entry, index) => (
                        <div key={entry.name} className="flex items-center space-x-2 mb-2">
                          <div 
                            className="w-4 h-4 rounded-full shadow-sm"
                            style={{ backgroundColor: COLORS[index] }}
                          ></div>
                          <span className="text-sm font-medium text-gray-700">
                            {entry.name} ({entry.value})
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Individual Risk Scores */}
                  <div className="space-y-4 mb-8">
                    <h4 className="text-lg font-semibold text-gray-800 text-center">Individual Risk Assessments</h4>
                    {Object.entries(riskResults).map(([disease, score]) => {
                      const risk = getRiskLevel(score);
                      return (
                        <div key={disease} className="bg-gray-50 rounded-xl p-4">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-base font-semibold capitalize text-gray-800">
                              {disease === 'mentalHealth' ? 'Mental Health' : disease}
                            </span>
                            <div className="flex items-center space-x-3">
                              <span className="text-lg font-bold text-gray-800">{score}%</span>
                              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${risk.bgColor} ${risk.color} shadow-sm`}>
                                {risk.level}
                              </span>
                            </div>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                            <div 
                              className={`h-full rounded-full transition-all duration-1000 ease-out shadow-sm ${
                                score < 25 ? 'bg-gradient-to-r from-green-400 to-green-500' :
                                score < 50 ? 'bg-gradient-to-r from-yellow-400 to-yellow-500' :
                                score < 70 ? 'bg-gradient-to-r from-orange-400 to-orange-500' :
                                'bg-gradient-to-r from-red-400 to-red-500'
                              }`}
                              style={{ width: `${score}%` }}
                            ></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Enhanced Bar Chart */}
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-4 text-center">Comparative Risk Analysis</h4>
                    <ResponsiveContainer width="100%" height={350}>
                      <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                        <defs>
                          <linearGradient id="cardioGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#EF4444" />
                            <stop offset="100%" stopColor="#DC2626" />
                          </linearGradient>
                          <linearGradient id="diabetesGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#F59E0B" />
                            <stop offset="100%" stopColor="#D97706" />
                          </linearGradient>
                          <linearGradient id="cancerGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#8B5CF6" />
                            <stop offset="100%" stopColor="#7C3AED" />
                          </linearGradient>
                          <linearGradient id="mentalGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#06B6D4" />
                            <stop offset="100%" stopColor="#0891B2" />
                          </linearGradient>
                          <linearGradient id="obesityGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#10B981" />
                            <stop offset="100%" stopColor="#059669" />
                          </linearGradient>
                          <filter id="barShadow">
                            <feDropShadow dx="0" dy="2" stdDeviation="4" floodOpacity="0.2"/>
                          </filter>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                        <XAxis 
                          dataKey="name" 
                          tick={{ fill: '#4B5563', fontSize: 12 }}
                          axisLine={{ stroke: '#D1D5DB' }}
                        />
                        <YAxis 
                          domain={[0, 100]} 
                          tick={{ fill: '#4B5563', fontSize: 12 }}
                          axisLine={{ stroke: '#D1D5DB' }}
                          label={{ value: 'Risk Level (%)', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fill: '#4B5563' } }}
                        />
                        <Tooltip 
                          contentStyle={{
                            backgroundColor: 'rgba(255, 255, 255, 0.95)',
                            border: 'none',
                            borderRadius: '12px',
                            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                            backdropFilter: 'blur(10px)'
                          }}
                          formatter={(value, name) => [
                            `${value}%`,
                            'Risk Level'
                          ]}
                          labelStyle={{ color: '#1F2937', fontWeight: 'bold' }}
                        />
                        <Bar 
                          dataKey="risk" 
                          radius={[4, 4, 0, 0]}
                          filter="url(#barShadow)"
                        >
                          {chartData.map((entry, index) => {
                            const gradientIds = ['url(#cardioGrad)', 'url(#diabetesGrad)', 'url(#cancerGrad)', 'url(#mentalGrad)', 'url(#obesityGrad)'];
                            return (
                              <Cell 
                                key={`cell-${index}`} 
                                fill={gradientIds[index]}
                              />
                            );
                          })}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Preventive Measures */}
                <div className="bg-white rounded-2xl shadow-xl p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                    <Shield className="w-6 h-6 text-green-600 mr-3" />
                    Personalized Preventive Measures
                  </h3>

                  <div className="space-y-6">
                    {getPreventiveMeasures().map((measure, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center mb-3">
                          {measure.icon}
                          <h4 className="text-lg font-semibold text-gray-800 ml-2">{measure.title}</h4>
                        </div>
                        <ul className="space-y-2">
                          {measure.recommendations.map((rec, recIndex) => (
                            <li key={recIndex} className="flex items-start">
                              <ChevronRight className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                              <span className="text-sm text-gray-700">{rec}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}

                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg">
                      <div className="flex items-start">
                        <AlertTriangle className="w-5 h-5 text-blue-600 mr-3 mt-0.5" />
                        <div>
                          <h5 className="font-semibold text-gray-800 mb-2">Important Disclaimer</h5>
                          <p className="text-sm text-gray-600">
                            These risk predictions are based on lifestyle factors and statistical models. 
                            They are not a substitute for professional medical advice. Please consult with 
                            healthcare providers for comprehensive health assessments and personalized recommendations.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {!showResults && (
              <div className="bg-white rounded-2xl shadow-xl p-6 text-center">
                <div className="text-gray-400 mb-4">
                  <TrendingUp className="w-16 h-16 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">Ready for Analysis</h3>
                  <p className="text-gray-500">
                    Complete the lifestyle assessment form to receive your personalized risk prediction 
                    and preventive recommendations.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiseaseRiskPrediction;