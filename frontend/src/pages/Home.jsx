import React, { useState, useEffect, useRef } from 'react';
import { Heart, Brain, Stethoscope, TrendingUp, Target, Activity, Shield, ChevronDown, Star, Users, Award, MessageCircle, X, Bot, User } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
// import '../index.css';
const LandingPage = () => {
  const [scrollY, setScrollY] = useState(0);
  const navigate= useNavigate();
  const [showChatbot, setShowChatbot] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const [chatLoading, setChatLoading] = useState(false);
  const chatMessagesRef = useRef(null);
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [chatMessages, chatLoading]);

  const handleOpenChatbot = () => {
    setShowChatbot(true);
    if (chatMessages.length === 0) {
      setChatMessages([{
        role: 'assistant',
        content: 'Hello! I\'m your AI Health Assistant. How can I help you today?'
      }]);
    }
  };

  const handleChatSubmit = async () => {
    if (!chatInput.trim()) return;

    const userMessage = { role: 'user', content: chatInput };
    setChatMessages(prev => [...prev, userMessage]);
    setChatInput('');
    setChatLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/chat/health-assistant', {
        message: chatInput,
        conversationHistory: chatMessages
      }, {
        withCredentials: true
      });

      if (response.data.success) {
        const aiMessage = { role: 'assistant', content: response.data.response };
        setChatMessages(prev => [...prev, aiMessage]);
      }
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

  const features = [
    { 
      icon: Brain, 
      title: "AI Health Analysis", 
      description: "Advanced AI analyzes your health patterns and provides personalized insights",
      gradient: "from-violet-500 to-purple-600"
    },
    { 
      icon: Stethoscope, 
      title: "Symptom Checker", 
      description: "Quick symptom analysis with AI-powered health recommendations",
      gradient: "from-emerald-500 to-teal-600"
    },
    { 
      icon: TrendingUp, 
      title: "Risk Prediction", 
      description: "Early detection of potential health risks using machine learning",
      gradient: "from-rose-500 to-pink-600"
    },
    { 
      icon: Target, 
      title: "Wellness Plans", 
      description: "Personalized health plans tailored to your lifestyle and goals",
      gradient: "from-amber-500 to-orange-600"
    },
    { 
      icon: Activity, 
      title: "Health Tracking", 
      description: "Comprehensive tracking of vitals, activities, and wellness metrics",
      gradient: "from-blue-500 to-indigo-600"
    },
    { 
      icon: Shield, 
      title: "Secure & Private", 
      description: "HIPAA-compliant data protection with end-to-end encryption",
      gradient: "from-green-500 to-emerald-600"
    },
  ];

  const howItWorks = [
    { 
      step: 1, 
      title: "Enter Your Data", 
      description: "Provide basic health info and daily activity data.",
      color: "from-violet-400 to-purple-600"
    },
    { 
      step: 2, 
      title: "AI Analysis", 
      description: "Our AI analyzes your health patterns and predicts risks.",
      color: "from-blue-400 to-indigo-600"
    },
    { 
      step: 3, 
      title: "Get Insights", 
      description: "Receive personalized wellness recommendations and plans.",
      color: "from-emerald-400 to-teal-600"
    },
    { 
      step: 4, 
      title: "Track Progress", 
      description: "Monitor your health journey over time with easy-to-read dashboards.",
      color: "from-amber-400 to-orange-600"
    },
  ];

  const stats = [
    { tagline: "Confused about your health?" },
    { tagline: "Hard to track habits?" },
    { tagline: "Start your wellness journey now" },
  ];

  const faqs = [
    { question: "Is my health data safe?", answer: "Yes, we never share your personal data." },
    { question: "How does AI predict health risks?", answer: "Our AI models analyze patterns from your input data and compare with large-scale health datasets to detect potential risks early." },
    { question: "Can I track my activity daily?", answer: "Absolutely! Our platform lets you log and monitor daily activities, vitals, and wellness metrics." },
  ];

  const LoginHandle=()=>{
    navigate('/login');
  }
  const SignupHandle=()=>{
    navigate('/signup');
  }
  const handleSymptoms=()=>{
    navigate('/checker')
  }
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

      {/* Header */}
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
            <div className="flex items-center space-x-4">
              <button 
                  className="px-4 cursor-pointer py-2 text-gray-300 hover:text-white transition-all duration-300 hover:scale-105"
                  onClick={LoginHandle}>
                  Login
              </button>
              <button 
                  className="px-6 py-2 cursor-pointer bg-gradient-to-r from-pink-500 via-purple-800 to-indigo-400 text-white rounded-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
                  onClick={SignupHandle}>
                  Sign Up
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center relative z-10">
        <div>
          <h1 
            className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
            style={{
              animation: 'fadeInUp 0.8s ease-out forwards',
            }}
          >
            Your{' '}
            <span 
              className="animate-pulse bg-clip-text text-transparent"
              style={{
                background: 'linear-gradient(to right, rgb(244, 114, 182), rgb(196, 181, 253), rgb(129, 140, 248))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              AI-Powered
            </span>
            <br />
            <span className="text-4xl md:text-6xl">Wellness Companion</span>
          </h1>
          <p 
            className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto opacity-0"
            style={{
              animation: 'fadeInUp 0.8s ease-out 0.3s forwards',
            }}
          >
            Transform your health journey with intelligent insights, personalized recommendations, and early risk detection powered by advanced AI technology.
          </p>
          <div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 opacity-0"
            style={{
              animation: 'fadeInUp 0.8s ease-out 0.6s forwards',
            }}
          >
            <button onClick={LoginHandle} className="px-8 cursor-pointer py-4 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white text-lg font-semibold rounded-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-110 hover:-translate-y-2 group">
              <span className="group-hover:animate-pulse">Get Started</span>
            </button>
            <button 
              className="px-8 py-4 cursor-pointer text-white text-lg font-semibold rounded-xl border-2 hover:shadow-lg transition-all duration-300 transform hover:scale-110"
              onClick={handleSymptoms}
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(8px)',
                borderColor: 'rgba(255, 255, 255, 0.2)',
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.1)';
              }}
            >
              Quick Symptom Checker
            </button>
          </div>
        </div>

        {/* Floating Stats */}
        <div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 opacity-0"
          style={{
            animation: 'fadeInUp 0.8s ease-out 0.9s forwards',
          }}
        >
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="rounded-2xl p-6 border transition-all duration-300 group transform hover:-translate-y-2"
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(8px)',
                borderColor: 'rgba(255, 255, 255, 0.2)',
                animation: `float 6s ease-in-out infinite ${index * 0.5}s`,
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.1)';
              }}
            >
              {/* <stat.icon className="mx-auto mb-4 text-purple-400 group-hover:scale-110 transition-transform duration-300" size={32} /> */}
              <div className="text-3xl content-center font-semibold text-[#b0a3b4] mb-2">{stat.tagline}</div>
              
            </div>
          ))}
        </div>

        {/* Scroll Indicator */}
        <div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          style={{
            animation: 'bounce 2s infinite',
          }}
        >
          <ChevronDown className="text-white opacity-60" size={32} />
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gradient-to-br from-slate-800 to-slate-900 py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Comprehensive Health Intelligence
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Discover how AI can revolutionize your approach to health and wellness
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="p-6 rounded-2xl border transition-all duration-500 group transform hover:scale-105 hover:-translate-y-2"
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(8px)',
                  borderColor: 'rgba(255, 255, 255, 0.2)',
                  animationDelay: `${index * 0.1}s`,
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.15)';
                  e.target.style.boxShadow = '0 20px 40px rgba(168, 85, 247, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                  e.target.style.boxShadow = 'none';
                }}
              >
                <div className="flex items-center mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${feature.gradient} rounded-lg flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-lg`}>
                    <feature.icon className="text-white" size={24} />
                  </div>
                  <h3 className="text-xl font-semibold text-white ml-4 group-hover:text-purple-300 transition-colors duration-300">{feature.title}</h3>
                </div>
                <p className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gradient-to-br from-slate-900 to-sky-900 relative">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-white">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {howItWorks.map((step, index) => (
              <div key={step.step} className="relative group">
                {/* Connecting Line */}
                {index < howItWorks.length - 1 && (
                  <div 
                    className="hidden md:block absolute top-16 left-full w-full h-0.5 transform translate-x-4 z-0"
                    style={{
                      background: 'linear-gradient(to right, rgb(168, 85, 247), transparent)',
                    }}
                  ></div>
                )}
                <div 
                  className="p-6 border rounded-2xl transition-all duration-500 transform hover:scale-110 hover:-translate-y-4 relative z-10"
                  style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(8px)',
                    borderColor: 'rgba(255, 255, 255, 0.2)',
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = 'rgba(255, 255, 255, 0.15)';
                    e.target.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                    e.target.style.boxShadow = 'none';
                  }}
                >
                  <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-br ${step.color} rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg group-hover:animate-pulse`}>
                    {step.step}
                  </div>
                  <h3 className="font-semibold mb-2 text-white text-xl">{step.title}</h3>
                  <p className="text-gray-300">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

     

      {/* FAQ Section */}
      <section className="py-20 bg-gradient-to-br from-slate-900 to-slate-800 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-white">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className="rounded-2xl p-6 border transition-all duration-300 group"
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(8px)',
                  borderColor: 'rgba(255, 255, 255, 0.2)',
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                }}
              >
                <h3 className="font-semibold mb-2 text-white text-lg group-hover:text-purple-300 transition-colors duration-300">{faq.question}</h3>
                <p className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-slate-900 via-sky-800 to-indigo-900 py-16 relative overflow-hidden">
        <div 
          className="absolute inset-0"
          style={{
            background: 'rgba(0, 0, 0, 0.2)',
          }}
        ></div>
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Start Your Wellness Journey Today</h2>
          <p className="text-xl text-purple-100 mb-8">
            Join thousands of users who trust WellNavi for their health insights
          </p>
          <button 
          onClick={SignupHandle}
          className="px-8 py-4 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 cursor-pointer text-white text-lg font-semibold rounded-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-110 hover:-translate-y-2 group">
            <span className="group-hover:animate-pulse">Get Started Free</span>
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <Heart className="text-pink-400 animate-pulse" size={28} />
            <span className="text-xl font-bold">WellNavi</span>
          </div>
          <div className="text-gray-400 text-sm text-center md:text-right">
           
            © 2025 WellNavi.  Made with ❤️ by Aayush. All rights reserved. 
          </div>
        </div>
      </footer>

      {/* Floating Chatbot Button */}
      {!showChatbot && (
        <button
          onClick={handleOpenChatbot}
          className="fixed bottom-6 right-6 bg-gradient-to-r from-emerald-500 to-teal-600 text-white p-4 rounded-full shadow-2xl hover:shadow-emerald-500/50 transition-all transform hover:scale-110 z-40"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}

      {/* AI Chatbot Modal */}
      {showChatbot && (
        <div className="fixed bottom-6 right-6 w-96 h-[500px] rounded-2xl shadow-2xl border flex flex-col z-50"
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
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">AI Health Assistant</h3>
                <p className="text-xs text-gray-400">Always here to help</p>
              </div>
            </div>
            <button 
              onClick={() => setShowChatbot(false)}
              className="text-gray-400 hover:text-white transition-colors p-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Messages */}
          <div ref={chatMessagesRef} className="flex-1 overflow-y-auto p-4 space-y-3">
            {chatMessages.map((message, index) => (
              <div 
                key={index} 
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className="flex items-start max-w-[85%]">
                  {message.role === 'assistant' && (
                    <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-1.5 rounded-full mr-2 flex-shrink-0">
                      <Bot className="w-3 h-3 text-white" />
                    </div>
                  )}
                  <div 
                    className={`rounded-2xl p-3 text-sm ${
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
                    <p className="leading-relaxed">{message.content}</p>
                  </div>
                  {message.role === 'user' && (
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-1.5 rounded-full ml-2 flex-shrink-0">
                      <User className="w-3 h-3 text-white" />
                    </div>
                  )}
                </div>
              </div>
            ))}
            {chatLoading && (
              <div className="flex justify-start">
                <div className="flex items-start max-w-[85%]">
                  <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-1.5 rounded-full mr-2 flex-shrink-0">
                    <Bot className="w-3 h-3 text-white" />
                  </div>
                  <div 
                    className="rounded-2xl p-3"
                    style={{
                      background: 'rgba(255, 255, 255, 0.1)',
                      backdropFilter: 'blur(8px)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                    }}
                  >
                    <div className="flex space-x-1">
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
          <div className="p-3 border-t border-white/10">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleChatSubmit()}
                placeholder="Ask about your health..."
                className="flex-1 px-3 py-2 rounded-lg text-sm text-white placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
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
                className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white p-2 rounded-lg hover:shadow-lg transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <MessageCircle className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;