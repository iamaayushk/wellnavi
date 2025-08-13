import React, { useState } from 'react';
import { Heart, Eye, EyeOff, Mail, Lock, User, ArrowRight, Shield, CheckCircle, Calendar, Phone } from 'lucide-react';

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
    allowMarketing: false
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleNextStep = () => {
    if (currentStep < 2) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    console.log('Signup attempt:', formData);
  };

  const StepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      <div className="flex items-center space-x-4">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
          currentStep >= 1 ? 'bg-blue-500 text-white' : 'bg-white/20 text-gray-400'
        }`}>
          1
        </div>
        <div className={`w-16 h-1 rounded-full ${
          currentStep >= 2 ? 'bg-blue-500' : 'bg-white/20'
        }`}></div>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
          currentStep >= 2 ? 'bg-blue-500 text-white' : 'bg-white/20 text-gray-400'
        }`}>
          2
        </div>
      </div>
    </div>
  );

  const Step1 = () => (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">Create Account</h2>
        <p className="text-gray-300">Let's get started with your basic information</p>
      </div>

      {/* Name Fields */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-200">First Name</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
              placeholder="John"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-200">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
            placeholder="Doe"
          />
        </div>
      </div>

      {/* Email Field */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-200">Email Address</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Mail className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
            placeholder="john@example.com"
          />
        </div>
      </div>

      {/* Phone Field */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-200">Phone Number</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Phone className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
            placeholder="+1 (555) 123-4567"
          />
        </div>
      </div>

      {/* Date of Birth */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-200">Date of Birth</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Calendar className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleInputChange}
            className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
          />
        </div>
      </div>

      <button
        onClick={handleNextStep}
        className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-4 rounded-lg font-semibold flex items-center justify-center space-x-2 hover:from-blue-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-[1.02] shadow-lg"
      >
        <span>Continue</span>
        <ArrowRight size={18} />
      </button>
    </div>
  );

  const Step2 = () => (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">Secure Your Account</h2>
        <p className="text-gray-300">Create a strong password to protect your health data</p>
      </div>

      {/* Password Field */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-200">Password</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Lock className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className="w-full pl-10 pr-12 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
            placeholder="Create a strong password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-300" />
            ) : (
              <Eye className="h-5 w-5 text-gray-400 hover:text-gray-300" />
            )}
          </button>
        </div>
      </div>

      {/* Confirm Password Field */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-200">Confirm Password</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Lock className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            className="w-full pl-10 pr-12 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
            placeholder="Confirm your password"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            {showConfirmPassword ? (
              <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-300" />
            ) : (
              <Eye className="h-5 w-5 text-gray-400 hover:text-gray-300" />
            )}
          </button>
        </div>
      </div>

      {/* Password Requirements */}
      <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
        <h4 className="text-blue-200 font-medium mb-2">Password Requirements:</h4>
        <div className="grid grid-cols-2 gap-2 text-sm text-blue-100">
          <div className="flex items-center space-x-2">
            <CheckCircle size={14} className="text-green-400" />
            <span>8+ characters</span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircle size={14} className="text-green-400" />
            <span>One uppercase</span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircle size={14} className="text-green-400" />
            <span>One lowercase</span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircle size={14} className="text-green-400" />
            <span>One number</span>
          </div>
        </div>
      </div>

      {/* Terms and Conditions */}
      <div className="space-y-4">
        <label className="flex items-start space-x-3">
          <input
            type="checkbox"
            name="agreeToTerms"
            checked={formData.agreeToTerms}
            onChange={handleInputChange}
            className="w-5 h-5 text-blue-400 bg-white/10 border-white/20 rounded focus:ring-blue-400 focus:ring-2 mt-0.5"
          />
          <span className="text-sm text-gray-300">
            I agree to the{' '}
            <button className="text-blue-400 hover:text-blue-300 underline">
              Terms of Service
            </button>{' '}
            and{' '}
            <button className="text-blue-400 hover:text-blue-300 underline">
              Privacy Policy
            </button>
          </span>
        </label>

        <label className="flex items-start space-x-3">
          <input
            type="checkbox"
            name="allowMarketing"
            checked={formData.allowMarketing}
            onChange={handleInputChange}
            className="w-5 h-5 text-blue-400 bg-white/10 border-white/20 rounded focus:ring-blue-400 focus:ring-2 mt-0.5"
          />
          <span className="text-sm text-gray-300">
            I'd like to receive health tips and updates via email (optional)
          </span>
        </label>
      </div>

      {/* Navigation Buttons */}
      <div className="flex space-x-4">
        <button
          onClick={handlePrevStep}
          className="flex-1 bg-white/10 border border-white/20 text-white py-3 px-4 rounded-lg font-semibold hover:bg-white/20 transition-all duration-200"
        >
          Back
        </button>
        <button
          onClick={handleSubmit}
          className="flex-1 bg-gradient-to-r from-green-500 to-blue-600 text-white py-3 px-4 rounded-lg font-semibold flex items-center justify-center space-x-2 hover:from-green-600 hover:to-blue-700 transition-all duration-200 transform hover:scale-[1.02] shadow-lg"
        >
          <span>Create Account</span>
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-2 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-500 rounded-xl flex items-center justify-center">
              <Heart className="text-white" size={24} />
            </div>
            <span className="text-3xl font-bold text-white">WellNavi</span>
          </div>
          <p className="text-gray-300">Join thousands transforming their health with AI</p>
        </div>

        {/* Step Indicator */}
        <StepIndicator />

        {/* Signup Card */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-2xl p-8">
          {currentStep === 1 ? <Step1 /> : <Step2 />}

          {/* Divider - Only show in step 1 */}
          {currentStep === 1 && (
            <>
              <div className="relative mt-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/20"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-gray-400">
                    Or sign up with
                  </span>
                </div>
              </div>

              {/* Social Signup */}
              <div className="grid grid-cols-2 gap-3 mt-6">
                <button className="flex items-center justify-center px-4 py-3 border border-white/20 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span className="text-white text-sm">Google</span>
                </button>
                
                <button className="flex items-center justify-center px-4 py-3 border border-white/20 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path className="text-white" d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                  <span className="text-white text-sm">Apple</span>
                </button>
              </div>
            </>
          )}

          {/* Security Notice */}
          <div className="mt-6 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
            <div className="flex items-center space-x-2">
              <Shield className="h-4 w-4 text-green-400" />
              <span className="text-sm text-green-200">
                256-bit SSL encryption • HIPAA compliant • Your data stays private
              </span>
            </div>
          </div>

          {/* Login Link */}
          <div className="text-center mt-6">
            <span className="text-gray-300">Already have an account? </span>
            <button className="text-blue-400 hover:text-blue-300 font-medium transition-colors">
              Sign in
            </button>
          </div>
        </div>

        {/* Features Footer */}
        <div className="mt-8 text-center">
          <div className="flex justify-center space-x-6 text-sm text-gray-400">
            <div className="flex items-center space-x-1">
              <CheckCircle size={16} className="text-green-400" />
              <span>Free Forever</span>
            </div>
            <div className="flex items-center space-x-1">
              <CheckCircle size={16} className="text-green-400" />
              <span>No Credit Card</span>
            </div>
            <div className="flex items-center space-x-1">
              <CheckCircle size={16} className="text-green-400" />
              <span>Setup in 2 mins</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;