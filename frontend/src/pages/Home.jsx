import React from 'react';
import { Heart, Brain, Stethoscope, TrendingUp, Target, Activity, Shield } from 'lucide-react';

const LandingPage = () => {
  const features = [
    {
      icon: Brain,
      title: "AI Health Analysis",
      description: "Advanced AI analyzes your health patterns and provides personalized insights"
    },
    {
      icon: Stethoscope,
      title: "Symptom Checker",
      description: "Quick symptom analysis with AI-powered health recommendations"
    },
    {
      icon: TrendingUp,
      title: "Risk Prediction",
      description: "Early detection of potential health risks using machine learning"
    },
    {
      icon: Target,
      title: "Wellness Plans",
      description: "Personalized health plans tailored to your lifestyle and goals"
    },
    {
      icon: Activity,
      title: "Health Tracking",
      description: "Comprehensive tracking of vitals, activities, and wellness metrics"
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "HIPAA-compliant data protection with end-to-end encryption"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Heart className="text-blue-500" size={32} />
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                WellNavi
              </span>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors">
                Login
              </button>
              <button className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Your{' '}
            <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              AI-Powered
            </span>
            <br />
            Wellness Companion
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Transform your health journey with intelligent insights, personalized recommendations, 
            and early risk detection powered by advanced AI technology.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <button className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-lg font-semibold rounded-xl hover:shadow-xl transition-all transform hover:scale-105">
              Get Started
            </button>
            
            <button className="px-8 py-4 bg-white text-gray-800 text-lg font-semibold rounded-xl border-2 border-gray-200 hover:shadow-lg transition-all transform hover:scale-105">
              Quick Symptom Checker
            </button>
          </div>

          {/* Hero Visual - Dashboard Preview */}
          <div className="relative max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-2xl p-8 border">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  <Heart size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">AI-Powered Health Dashboard</h3>
                  <p className="text-gray-600">Get personalized insights and track your wellness journey</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                  <div className="text-2xl font-bold text-green-600">Health Score</div>
                  <div className="text-sm text-gray-600">AI Risk Assessment</div>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                  <div className="text-2xl font-bold text-blue-600">Activity</div>
                  <div className="text-sm text-gray-600">Daily Tracking</div>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                  <div className="text-2xl font-bold text-purple-600">Wellness</div>
                  <div className="text-sm text-gray-600">Smart Insights</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Comprehensive Health Intelligence
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover how AI can revolutionize your approach to health and wellness
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-xl hover:shadow-lg transition-all group">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <feature.icon className="text-white" size={24} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 ml-4">{feature.title}</h3>
                </div>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-500 to-purple-600 py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Start Your Wellness Journey Today
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of users who trust WellNavi for their health insights
          </p>
          <button className="px-8 py-4 bg-white text-blue-600 text-lg font-semibold rounded-xl hover:shadow-xl transition-all transform hover:scale-105">
            Get Started Free
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Heart className="text-blue-400" size={28} />
              <span className="text-xl font-bold">WellNavi</span>
            </div>
            <div className="text-gray-400 text-sm">
              © 2025 WellNavi. All rights reserved. | Privacy Policy | Terms of Service
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;