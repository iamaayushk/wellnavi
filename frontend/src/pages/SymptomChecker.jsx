import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, 
  Bot, 
  AlertTriangle, 
  Heart, 
  Brain, 
  Thermometer, 
  Activity, 
  Eye, 
  Stethoscope,
  Calendar,
  ChevronRight,
  Clock,
  Star,
  MapPin,
  Phone,
  Zap,
  Shield,
  Info,
  MessageCircle,
  X,
  Plus,
  CheckCircle,
  User,
  TrendingUp,
  BookOpen,
  AlertCircle,
  Lightbulb,
  Menu,
  Home
} from 'lucide-react';
import {useNavigate} from'react-router-dom';
import { symptomAPI, chatAPI, getApiUrl } from '../services/api';

const SymptomCheckerPage = () => {
  const [symptomInput, setSymptomInput] = useState('');
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [analyzing, setAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [analysisResults, setAnalysisResults] = useState(null);
  const [showDisclaimer, setShowDisclaimer] = useState(true);
  const [error, setError] = useState(null);
  const [showChatbot, setShowChatbot] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const [chatLoading, setChatLoading] = useState(false);
  const chatMessagesRef = useRef(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [chatMessages, chatLoading]);

  // Common symptoms for suggestions
  const commonSymptoms = [
    { id: 'headache', text: 'Headache', icon: <Brain className="w-4 h-4" />, category: 'neurological' },
    { id: 'fever', text: 'Fever', icon: <Thermometer className="w-4 h-4" />, category: 'general' },
    { id: 'cough', text: 'Cough', icon: <Activity className="w-4 h-4" />, category: 'respiratory' },
    { id: 'chest_pain', text: 'Chest Pain', icon: <Heart className="w-4 h-4" />, category: 'cardiovascular' },
    { id: 'nausea', text: 'Nausea', icon: <Activity className="w-4 h-4" />, category: 'digestive' },
    { id: 'fatigue', text: 'Fatigue', icon: <Zap className="w-4 h-4" />, category: 'general' },
    { id: 'sore_throat', text: 'Sore Throat', icon: <Activity className="w-4 h-4" />, category: 'respiratory' },
    { id: 'dizziness', text: 'Dizziness', icon: <Brain className="w-4 h-4" />, category: 'neurological' },
    { id: 'back_pain', text: 'Back Pain', icon: <Activity className="w-4 h-4" />, category: 'musculoskeletal' },
    { id: 'stomach_pain', text: 'Stomach Pain', icon: <Activity className="w-4 h-4" />, category: 'digestive' }
  ];
  
  const navigate=useNavigate();

  const handleSymptomAdd = (symptom) => {
    if (!selectedSymptoms.find(s => s.id === symptom.id)) {
      setSelectedSymptoms([...selectedSymptoms, symptom]);
    }
  };

  const removeSymptom = (symptomId) => {
    setSelectedSymptoms(selectedSymptoms.filter(s => s.id !== symptomId));
  };

  const handleAnalyze = async () => {
    if (selectedSymptoms.length === 0 && !symptomInput.trim()) {
      return;
    }

    setAnalyzing(true);
    setShowResults(false);
    setError(null);

    try {
      // Prepare symptoms data
      const symptomsText = [
        symptomInput,
        ...selectedSymptoms.map(s => s.text)
      ].filter(Boolean).join(', ');

      // Make API call to your backend
      const response = await fetch(getApiUrl('/symptoms/analyze'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          symptoms: symptomsText,
          selectedSymptoms: selectedSymptoms.map(s => ({
            id: s.id,
            text: s.text,
            category: s.category
          }))
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Server error' }));
        console.error('Server returned error:', response.status, errorData);
        throw new Error(errorData.message || 'Failed to analyze symptoms');
      }

      const data = await response.json();
      
      // Transform API response to match your UI format
      setAnalysisResults({
        confidence: data.confidence || 85,
        possibleCauses: data.possibleCauses || [],
        emergencyWarning: data.emergencyWarning || null,
        aiInsights: data.aiInsights || data.analysis,
        recommendedActions: data.recommendedActions || []
      });

      setShowResults(true);
    } catch (err) {
      console.error('Error analyzing symptoms:', err);
      setError('Failed to analyze symptoms. Please try again.');
    } finally {
      setAnalyzing(false);
    }
  };

  const handleBookAppointment = () => {
    navigate('/doctorFind');
  };

  const getSeverityIcon = (severity) => {
    if (severity.toLowerCase().includes('mild')) return <CheckCircle className="w-5 h-5 text-emerald-400" />;
    if (severity.toLowerCase().includes('moderate')) return <AlertCircle className="w-5 h-5 text-amber-400" />;
    return <AlertTriangle className="w-5 h-5 text-rose-400" />;
  };

  const handleDash=()=>{
    navigate('/dashboard');
  }

  const handleChatSubmit = async () => {
    if (!chatInput.trim()) return;

    const userMessage = { role: 'user', content: chatInput };
    setChatMessages(prev => [...prev, userMessage]);
    setChatInput('');
    setChatLoading(true);

    try {
      const response = await fetch(getApiUrl('/chat/health-assistant'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          message: chatInput,
          conversationHistory: chatMessages
        })
      });

      if (!response.ok) {
        throw new Error('Failed to get response from AI assistant');
      }

      const data = await response.json();
      const aiMessage = { role: 'assistant', content: data.response };
      setChatMessages(prev => [...prev, aiMessage]);
    } catch (err) {
      console.error('Error in chat:', err);
      const errorMessage = { 
        role: 'assistant', 
        content: 'Sorry, I encountered an error. Please try again.' 
      };
      setChatMessages(prev => [...prev, errorMessage]);
    } finally {
      setChatLoading(false);
    }
  };

  const handleOpenChatbot = () => {
    setShowChatbot(true);
    if (chatMessages.length === 0) {
      setChatMessages([{
        role: 'assistant',
        content: 'Hello! I\'m your AI Health Assistant. How can I help you today? You can ask me about symptoms, health conditions, wellness tips, or general health questions.'
      }]);
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
                onClick={()=>navigate('/')}
                className="flex cursor-pointer  items-center px-3 py-2 text-gray-300 hover:text-white transition-all duration-300 hover:scale-105">
                  <Home className="w-4 h-4 mr-2" />
                  Home
                </button>
                <button className="flex  cursor-pointer items-center px-3 py-2 text-white bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-lg border border-white/20">
                  <Bot className="w-4 h-4 mr-2" />
                  Symptom Checker
                </button>
                <button onClick={handleDash} className="px-3 cursor-pointer py-2 text-gray-300 hover:text-white transition-all duration-300 hover:scale-105">
                  Dashboard
                </button>
                
              </nav>
              <button className="md:hidden text-gray-300 hover:text-white">
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-gradient-to-r from-pink-500 to-purple-600 p-3 rounded-full shadow-lg">
              <Bot className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">AI Symptom Checker</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Describe your symptoms and get AI-powered insights about possible causes and 
            recommendations for your health concerns.
          </p>
        </div>

        {/* Disclaimer */}
        {showDisclaimer && (
          <div 
            className="rounded-2xl p-6 mb-8 border"
            style={{
              background: 'rgba(239, 68, 68, 0.1)',
              backdropFilter: 'blur(8px)',
              borderColor: 'rgba(239, 68, 68, 0.3)',
            }}
          >
            <div className="flex items-start">
              <AlertTriangle className="w-6 h-6 text-red-400 mr-3 mt-1 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="text-lg font-bold text-red-300 mb-2">Important Medical Disclaimer</h3>
                <p className="text-red-200 text-sm mb-4">
                  This symptom checker is for informational purposes only and should not replace professional 
                  medical advice, diagnosis, or treatment. Always consult with qualified healthcare providers 
                  for accurate diagnosis and appropriate treatment.
                </p>
                <div className="flex justify-between items-center">
                  <div className="text-red-300 text-sm font-medium">
                    🚨 Seek immediate medical attention if experiencing emergency symptoms
                  </div>
                  <button 
                    onClick={() => setShowDisclaimer(false)}
                    className="text-red-300 hover:text-red-100 p-1 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div 
            className="rounded-2xl p-6 mb-8 border"
            style={{
              background: 'rgba(239, 68, 68, 0.1)',
              backdropFilter: 'blur(8px)',
              borderColor: 'rgba(239, 68, 68, 0.3)',
            }}
          >
            <div className="flex items-center">
              <AlertTriangle className="w-6 h-6 text-red-400 mr-3" />
              <p className="text-red-200">{error}</p>
              <button 
                onClick={() => setError(null)}
                className="ml-auto text-red-300 hover:text-red-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Symptom Input Section */}
          <div className="lg:col-span-2">
            <div 
              className="rounded-2xl shadow-xl p-6 mb-8 border"
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(16px)',
                borderColor: 'rgba(255, 255, 255, 0.2)',
              }}
            >
              <div className="flex items-center mb-6">
                <Search className="w-6 h-6 text-blue-400 mr-3" />
                <h2 className="text-2xl font-bold text-white">Describe Your Symptoms</h2>
              </div>

              {/* Text Input */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  What symptoms are you experiencing? Be as detailed as possible.
                </label>
                <textarea
                  value={symptomInput}
                  onChange={(e) => setSymptomInput(e.target.value)}
                  placeholder="e.g., I have been experiencing headaches for the past 3 days, along with a mild fever and fatigue..."
                  className="w-full px-4 py-3 rounded-lg resize-none text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all"
                  style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                  }}
                  rows="4"
                />
              </div>

              {/* Quick Symptom Selection */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white mb-3">Or select from common symptoms:</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {commonSymptoms.map((symptom) => (
                    <button
                      key={symptom.id}
                      onClick={() => handleSymptomAdd(symptom)}
                      className="flex items-center p-3 rounded-lg transition-all duration-300 transform hover:scale-105"
                      style={{
                        background: 'rgba(255, 255, 255, 0.1)',
                        backdropFilter: 'blur(8px)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.background = 'rgba(255, 255, 255, 0.15)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                      }}
                    >
                      <span className="text-purple-400 mr-2">{symptom.icon}</span>
                      <span className="text-sm font-medium text-gray-200">{symptom.text}</span>
                      <Plus className="w-4 h-4 text-gray-400 ml-auto" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Selected Symptoms */}
              {selectedSymptoms.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-white mb-3">Selected Symptoms:</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedSymptoms.map((symptom) => (
                      <div
                        key={symptom.id}
                        className="flex items-center bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-purple-200 px-3 py-2 rounded-full border border-purple-400/30"
                      >
                        <span className="mr-2">{symptom.icon}</span>
                        <span className="text-sm font-medium">{symptom.text}</span>
                        <button
                          onClick={() => removeSymptom(symptom.id)}
                          className="ml-2 text-purple-300 hover:text-purple-100 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Analyze Button */}
              <button
                onClick={handleAnalyze}
                disabled={analyzing || (selectedSymptoms.length === 0 && !symptomInput.trim())}
                className="w-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white py-4 px-6 rounded-lg font-semibold transition-all hover:shadow-2xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {analyzing ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Analyzing Symptoms with AI...</span>
                  </>
                ) : (
                  <>
                    <Bot className="w-5 h-5" />
                    <span>Analyze My Symptoms with AI</span>
                  </>
                )}
              </button>

              {analyzing && (
                <div className="mt-4 text-center">
                  <div 
                    className="rounded-lg p-4"
                    style={{
                      background: 'rgba(59, 130, 246, 0.1)',
                      backdropFilter: 'blur(8px)',
                    }}
                  >
                    <div className="flex items-center justify-center mb-2">
                      <Brain className="w-6 h-6 text-blue-400 mr-2 animate-pulse" />
                      <span className="text-blue-300 font-medium">AI Analysis in Progress</span>
                    </div>
                    <p className="text-blue-200 text-sm">
                      Our AI is processing your symptoms and comparing them with medical knowledge base...
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Analysis Results */}
            {showResults && analysisResults && (
              <div className="space-y-6">
                {/* AI Insights */}
                <div 
                  className="rounded-2xl shadow-xl p-6 border"
                  style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(16px)',
                    borderColor: 'rgba(255, 255, 255, 0.2)',
                  }}
                >
                  <div className="flex items-center mb-4">
                    <Lightbulb className="w-6 h-6 text-purple-400 mr-3" />
                    <h3 className="text-xl font-bold text-white">AI Health Insights</h3>
                    <div className="ml-auto bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-200 px-3 py-1 rounded-full text-sm font-medium border border-purple-400/30">
                      {analysisResults.confidence}% Confidence
                    </div>
                  </div>
                  <div 
                    className="rounded-lg p-4"
                    style={{
                      background: 'rgba(147, 51, 234, 0.1)',
                      backdropFilter: 'blur(8px)',
                    }}
                  >
                    <p className="text-gray-200 leading-relaxed">{analysisResults.aiInsights}</p>
                  </div>
                </div>

                {/* Possible Causes */}
                <div 
                  className="rounded-2xl shadow-xl p-6 border"
                  style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(16px)',
                    borderColor: 'rgba(255, 255, 255, 0.2)',
                  }}
                >
                  <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                    <BookOpen className="w-6 h-6 text-blue-400 mr-3" />
                    Possible Causes
                  </h3>

                  <div className="space-y-6">
                    {analysisResults.possibleCauses.map((cause) => (
                      <div 
                        key={cause.id} 
                        className="rounded-xl p-6 border transition-all duration-300 hover:scale-[1.02]"
                        style={{
                          background: 'rgba(255, 255, 255, 0.05)',
                          backdropFilter: 'blur(8px)',
                          borderColor: 'rgba(255, 255, 255, 0.1)',
                        }}
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center">
                            {cause.icon}
                            <div className="ml-3">
                              <h4 className="text-lg font-bold text-white">{cause.condition}</h4>
                              <div className="flex items-center mt-1">
                                {getSeverityIcon(cause.severity)}
                                <span className={`ml-2 px-3 py-1 rounded-full text-sm font-medium ${cause.severityBg} ${cause.severityColor}`}>
                                  {cause.severity}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-blue-400">{cause.probability}%</div>
                            <div className="text-sm text-gray-400">Match</div>
                          </div>
                        </div>

                        <p className="text-gray-300 mb-4">{cause.description}</p>

                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <h5 className="font-semibold text-white mb-2">Common Symptoms:</h5>
                            <ul className="space-y-1">
                              {cause.symptoms.map((symptom, idx) => (
                                <li key={idx} className="flex items-center text-sm text-gray-300">
                                  <CheckCircle className="w-4 h-4 text-emerald-400 mr-2 flex-shrink-0" />
                                  {symptom}
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <h5 className="font-semibold text-white mb-2">Recommendations:</h5>
                            <ul className="space-y-1">
                              {cause.recommendations.map((rec, idx) => (
                                <li key={idx} className="flex items-start text-sm text-gray-300">
                                  <ChevronRight className="w-4 h-4 text-blue-400 mr-2 mt-0.5 flex-shrink-0" />
                                  {rec}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        <div className="mt-4 pt-4 border-t border-white/10">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm text-gray-300">
                                <strong className="text-white">When to see a doctor:</strong> {cause.whenToSeeDoctor}
                              </p>
                            </div>
                            <button
                              onClick={() => handleBookAppointment(cause.specialization)}
                              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all transform hover:scale-105 flex items-center"
                            >
                              <Calendar className="w-4 h-4 mr-2" />
                              Book {cause.specialization}
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recommended Actions */}
                <div 
                  className="rounded-2xl shadow-xl p-6 border"
                  style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(16px)',
                    borderColor: 'rgba(255, 255, 255, 0.2)',
                  }}
                >
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                    <TrendingUp className="w-6 h-6 text-emerald-400 mr-3" />
                    Recommended Next Steps
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {analysisResults.recommendedActions.map((action, idx) => (
                      <div 
                        key={idx} 
                        className="flex items-start p-3 rounded-lg"
                        style={{
                          background: 'rgba(16, 185, 129, 0.1)',
                          backdropFilter: 'blur(8px)',
                        }}
                      >
                        <CheckCircle className="w-5 h-5 text-emerald-400 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-200">{action}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Health Tips */}
            <div 
              className="rounded-2xl shadow-xl p-6 border"
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(16px)',
                borderColor: 'rgba(255, 255, 255, 0.2)',
              }}
            >
              <div className="flex items-center mb-4">
                <Shield className="w-6 h-6 text-blue-400 mr-3" />
                <h3 className="text-lg font-bold text-white">Health Tips</h3>
              </div>
              <div className="space-y-4">
                <div 
                  className="p-3 rounded-lg"
                  style={{
                    background: 'rgba(59, 130, 246, 0.1)',
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  <h4 className="font-semibold text-blue-300 mb-1">Stay Hydrated</h4>
                  <p className="text-blue-200 text-sm">Drink 8-10 glasses of water daily to support overall health.</p>
                </div>
                <div 
                  className="p-3 rounded-lg"
                  style={{
                    background: 'rgba(16, 185, 129, 0.1)',
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  <h4 className="font-semibold text-emerald-300 mb-1">Regular Exercise</h4>
                  <p className="text-emerald-200 text-sm">30 minutes of activity can boost immunity and reduce symptoms.</p>
                </div>
                <div 
                  className="p-3 rounded-lg"
                  style={{
                    background: 'rgba(147, 51, 234, 0.1)',
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  <h4 className="font-semibold text-purple-300 mb-1">Quality Sleep</h4>
                  <p className="text-purple-200 text-sm">7-9 hours of sleep helps your body fight infections naturally.</p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div 
              className="rounded-2xl shadow-xl p-6 border"
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(16px)',
                borderColor: 'rgba(255, 255, 255, 0.2)',
              }}
            >
              <h3 className="text-lg font-bold text-white mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button 
                  onClick={handleBookAppointment}
                  className="w-full flex items-center p-3 rounded-lg transition-all duration-300 transform hover:scale-105"
                  style={{
                    background: 'rgba(59, 130, 246, 0.1)',
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  <Calendar className="w-5 h-5 mr-3 text-blue-400" />
                  <span className="text-blue-200">Find Nearby Doctors</span>
                </button>
                <button 
                  onClick={handleOpenChatbot}
                  className="w-full flex items-center p-3 rounded-lg transition-all duration-300 transform hover:scale-105"
                  style={{
                    background: 'rgba(16, 185, 129, 0.1)',
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  <MessageCircle className="w-5 h-5 mr-3 text-emerald-400" />
                  <span className="text-emerald-200">Chat with AI Health Assistant</span>
                </button>
                <button 
                  className="w-full flex items-center p-3 rounded-lg transition-all duration-300 transform hover:scale-105"
                  style={{
                    background: 'rgba(147, 51, 234, 0.1)',
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  <BookOpen className="w-5 h-5 mr-3 text-purple-400" />
                  <span className="text-purple-200">Health Knowledge Base</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Health Assistant Chatbot */}
      {showChatbot && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0, 0, 0, 0.5)', backdropFilter: 'blur(8px)' }}>
          <div 
            className="w-full max-w-2xl h-[600px] rounded-2xl shadow-2xl border flex flex-col"
            style={{
              background: 'rgba(15, 23, 42, 0.95)',
              backdropFilter: 'blur(16px)',
              borderColor: 'rgba(255, 255, 255, 0.2)',
            }}
          >
            {/* Chatbot Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <div className="flex items-center">
                <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-2 rounded-full mr-3">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">AI Health Assistant</h3>
                  <p className="text-sm text-gray-400">Powered by AI</p>
                </div>
              </div>
              <button 
                onClick={() => setShowChatbot(false)}
                className="text-gray-400 hover:text-white transition-colors p-1"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Chat Messages */}
            <div ref={chatMessagesRef} className="flex-1 overflow-y-auto p-4 space-y-4">
              {chatMessages.map((message, index) => (
                <div 
                  key={index} 
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className="flex items-start max-w-[80%]">
                    {message.role === 'assistant' && (
                      <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-2 rounded-full mr-2 flex-shrink-0">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                    )}
                    <div 
                      className={`rounded-2xl p-4 ${
                        message.role === 'user' 
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' 
                          : 'text-gray-200'
                      }`}
                      style={{
                        background: message.role === 'assistant' 
                          ? 'rgba(255, 255, 255, 0.1)' 
                          : undefined,
                        backdropFilter: message.role === 'assistant' ? 'blur(8px)' : undefined,
                        border: message.role === 'assistant' ? '1px solid rgba(255, 255, 255, 0.2)' : undefined,
                      }}
                    >
                      <p className="text-sm leading-relaxed">{message.content}</p>
                    </div>
                    {message.role === 'user' && (
                      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-full ml-2 flex-shrink-0">
                        <User className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {chatLoading && (
                <div className="flex justify-start">
                  <div className="flex items-start max-w-[80%]">
                    <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-2 rounded-full mr-2 flex-shrink-0">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <div 
                      className="rounded-2xl p-4"
                      style={{
                        background: 'rgba(255, 255, 255, 0.1)',
                        backdropFilter: 'blur(8px)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                      }}
                    >
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Chat Input */}
            <div className="p-4 border-t border-white/10">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleChatSubmit()}
                  placeholder="Ask me anything about your health..."
                  className="flex-1 px-4 py-3 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                  }}
                  disabled={chatLoading}
                />
                <button
                  onClick={handleChatSubmit}
                  disabled={chatLoading || !chatInput.trim()}
                  className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white p-3 rounded-lg hover:shadow-lg transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <MessageCircle className="w-5 h-5" />
                </button>
              </div>
              <p className="text-xs text-gray-400 mt-2 text-center">
                💡 Ask about symptoms, health tips, or medical information
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SymptomCheckerPage;