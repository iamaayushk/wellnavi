import React, { useState, useEffect } from 'react';
import { 
  MapPin, 
  Search, 
  Filter, 
  Star, 
  Clock, 
  Phone, 
  Calendar, 
  Heart, 
  Brain, 
  Eye, 
  Bone, 
  Baby, 
  Stethoscope,
  User,
  Award,
  Navigation,
  ChevronDown,
  X,
  MessageCircle,
  Shield,
  CheckCircle,
  DollarSign,
  Users,
  MapIcon,
  Menu,
  Home,
  Bot,
  TrendingUp,
  Bell,
  Settings,
  Activity,
  Target
} from 'lucide-react';

const DoctorFinderPage = () => {
  const [selectedSpecialization, setSelectedSpecialization] = useState('all');
  const [selectedRating, setSelectedRating] = useState('all');
  const [searchLocation, setSearchLocation] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [mapView, setMapView] = useState(true);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [userLocation, setUserLocation] = useState({ lat: 28.6139, lng: 77.2090 }); // Delhi coordinates

  const specializations = [
    { id: 'all', name: 'All Specializations', icon: <Stethoscope className="w-5 h-5" />, color: 'text-blue-400' },
    { id: 'cardiology', name: 'Cardiology', icon: <Heart className="w-5 h-5" />, color: 'text-red-400' },
    { id: 'neurology', name: 'Neurology', icon: <Brain className="w-5 h-5" />, color: 'text-purple-400' },
    { id: 'orthopedics', name: 'Orthopedics', icon: <Bone className="w-5 h-5" />, color: 'text-gray-400' },
    { id: 'pediatrics', name: 'Pediatrics', icon: <Baby className="w-5 h-5" />, color: 'text-pink-400' },
    { id: 'ophthalmology', name: 'Ophthalmology', icon: <Eye className="w-5 h-5" />, color: 'text-green-400' },
    { id: 'general', name: 'General Medicine', icon: <User className="w-5 h-5" />, color: 'text-blue-400' }
  ];

  // Mock doctor data - would come from API
  const doctors = [
    {
      id: 1,
      name: 'Dr. Rajesh Sharma',
      specialization: 'cardiology',
      rating: 4.8,
      reviewCount: 245,
      experience: 15,
      hospital: 'Apollo Hospital Delhi',
      location: 'Sarita Vihar, Delhi',
      distance: '2.3 km',
      consultationFee: 800,
      image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&h=200&fit=crop&crop=face',
      coordinates: { lat: 28.5355, lng: 77.2783 },
      availability: 'Available Today',
      nextSlot: '2:30 PM',
      education: ['MBBS, AIIMS Delhi', 'MD Cardiology, PGI Chandigarh'],
      languages: ['Hindi', 'English'],
      verified: true,
      about: 'Experienced cardiologist specializing in interventional cardiology and heart disease prevention.',
      services: ['ECG', 'Echocardiography', 'Angioplasty', 'Heart Surgery']
    },
    {
      id: 2,
      name: 'Dr. Priya Mehta',
      specialization: 'neurology',
      rating: 4.9,
      reviewCount: 187,
      experience: 12,
      hospital: 'Max Healthcare',
      location: 'Lajpat Nagar, Delhi',
      distance: '3.1 km',
      consultationFee: 1200,
      image: 'https://images.unsplash.com/photo-1594824947041-d0c1b2b74b41?w=200&h=200&fit=crop&crop=face',
      coordinates: { lat: 28.5677, lng: 77.2433 },
      availability: 'Available Tomorrow',
      nextSlot: '10:00 AM',
      education: ['MBBS, Maulana Azad Medical College', 'DM Neurology, NIMHANS'],
      languages: ['Hindi', 'English', 'Punjabi'],
      verified: true,
      about: 'Neurologist with expertise in stroke management and epilepsy treatment.',
      services: ['EEG', 'MRI Consultation', 'Stroke Treatment', 'Epilepsy Management']
    },
    {
      id: 3,
      name: 'Dr. Amit Kumar',
      specialization: 'orthopedics',
      rating: 4.7,
      reviewCount: 156,
      experience: 10,
      hospital: 'Fortis Hospital',
      location: 'Vasant Kunj, Delhi',
      distance: '5.2 km',
      consultationFee: 600,
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&h=200&fit=crop&crop=face',
      coordinates: { lat: 28.5200, lng: 77.1580 },
      availability: 'Available Today',
      nextSlot: '4:15 PM',
      education: ['MBBS, Delhi University', 'MS Orthopedics, AIIMS'],
      languages: ['Hindi', 'English'],
      verified: true,
      about: 'Orthopedic surgeon specializing in joint replacement and sports injuries.',
      services: ['Joint Replacement', 'Arthroscopy', 'Fracture Treatment', 'Sports Medicine']
    },
    {
      id: 4,
      name: 'Dr. Sunita Singh',
      specialization: 'pediatrics',
      rating: 4.6,
      reviewCount: 203,
      experience: 8,
      hospital: 'Safdarjung Hospital',
      location: 'Safdarjung, Delhi',
      distance: '4.8 km',
      consultationFee: 500,
      image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=200&h=200&fit=crop&crop=face',
      coordinates: { lat: 28.5706, lng: 77.2094 },
      availability: 'Available Today',
      nextSlot: '11:30 AM',
      education: ['MBBS, Lady Hardinge Medical College', 'MD Pediatrics, AIIMS'],
      languages: ['Hindi', 'English'],
      verified: true,
      about: 'Pediatrician with special interest in child development and vaccination.',
      services: ['Child Health Checkup', 'Vaccination', 'Growth Monitoring', 'Newborn Care']
    },
    {
      id: 5,
      name: 'Dr. Vikash Gupta',
      specialization: 'ophthalmology',
      rating: 4.5,
      reviewCount: 134,
      experience: 9,
      hospital: 'Centre for Sight',
      location: 'Lajpat Nagar, Delhi',
      distance: '3.7 km',
      consultationFee: 700,
      image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=200&h=200&fit=crop&crop=face',
      coordinates: { lat: 28.5658, lng: 77.2444 },
      availability: 'Available Tomorrow',
      nextSlot: '9:00 AM',
      education: ['MBBS, King George Medical College', 'MS Ophthalmology, AIIMS'],
      languages: ['Hindi', 'English'],
      verified: true,
      about: 'Eye specialist with expertise in cataract surgery and retinal diseases.',
      services: ['Cataract Surgery', 'LASIK', 'Retinal Treatment', 'Glaucoma Management']
    }
  ];

  const filteredDoctors = doctors.filter(doctor => {
    const specializationMatch = selectedSpecialization === 'all' || doctor.specialization === selectedSpecialization;
    const ratingMatch = selectedRating === 'all' || doctor.rating >= parseFloat(selectedRating);
    return specializationMatch && ratingMatch;
  });

  const MapComponent = () => (
    <div 
      className="relative w-full h-full rounded-xl overflow-hidden border"
      style={{
        background: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(16px)',
        borderColor: 'rgba(255, 255, 255, 0.1)',
      }}
    >
      {/* Mock Map Interface */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20">
        <div 
          className="absolute top-4 left-4 right-4 rounded-lg shadow-lg p-3 z-10"
          style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(16px)',
            borderColor: 'rgba(255, 255, 255, 0.2)',
          }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Navigation className="w-5 h-5 text-blue-400 mr-2" />
              <span className="text-sm font-medium text-white">Showing {filteredDoctors.length} doctors near you</span>
            </div>
            <button 
              onClick={() => setMapView(false)}
              className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors"
            >
              List View
            </button>
          </div>
        </div>
        
        {/* Mock Map with Doctor Pins */}
        <div className="absolute inset-0 pt-20">
          <div className="relative w-full h-full">
            {/* Map Grid Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="grid grid-cols-8 grid-rows-8 w-full h-full">
                {Array.from({ length: 64 }).map((_, i) => (
                  <div key={i} className="border border-white/20"></div>
                ))}
              </div>
            </div>
            
            {/* User Location Pin */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="bg-blue-500 rounded-full p-2 shadow-lg animate-pulse">
                <User className="w-4 h-4 text-white" />
              </div>
              <div className="bg-blue-500 text-white text-xs px-2 py-1 rounded mt-1 whitespace-nowrap">
                Your Location
              </div>
            </div>
            
            {/* Doctor Pins */}
            {filteredDoctors.slice(0, 5).map((doctor, index) => {
              const positions = [
                { top: '30%', left: '40%' },
                { top: '60%', left: '65%' },
                { top: '25%', left: '70%' },
                { top: '70%', left: '30%' },
                { top: '45%', left: '20%' }
              ];
              
              return (
                <div 
                  key={doctor.id}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                  style={positions[index]}
                  onClick={() => setSelectedDoctor(doctor)}
                >
                  <div className={`rounded-full p-2 shadow-lg transition-all hover:scale-110 ${
                    selectedDoctor?.id === doctor.id 
                      ? 'bg-red-500 scale-110' 
                      : 'bg-white/20 backdrop-blur-sm border border-red-400'
                  }`}>
                    <span className={selectedDoctor?.id === doctor.id ? 'text-white' : 'text-red-400'}>
                      {specializations.find(s => s.id === doctor.specialization)?.icon}
                    </span>
                  </div>
                  <div 
                    className="text-xs px-2 py-1 rounded mt-1 shadow-md whitespace-nowrap text-white"
                    style={{
                      background: 'rgba(255, 255, 255, 0.1)',
                      backdropFilter: 'blur(8px)',
                    }}
                  >
                    {doctor.name.split(' ')[1]}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Selected Doctor Info Card */}
        {selectedDoctor && (
          <div 
            className="absolute bottom-4 left-4 right-4 rounded-xl shadow-xl p-4 z-10 border"
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(16px)',
              borderColor: 'rgba(255, 255, 255, 0.2)',
            }}
          >
            <div className="flex items-center space-x-3">
              <img 
                src={selectedDoctor.image} 
                alt={selectedDoctor.name}
                className="w-16 h-16 rounded-full object-cover border-2 border-white/20"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-bold text-white">{selectedDoctor.name}</h3>
                  <button 
                    onClick={() => setSelectedDoctor(null)}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-sm text-gray-300 capitalize mb-2">{selectedDoctor.specialization}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                      <span className="text-sm font-medium text-white">{selectedDoctor.rating}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-300">
                      <MapPin className="w-4 h-4 mr-1" />
                      {selectedDoctor.distance}
                    </div>
                  </div>
                  <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-blue-600 hover:to-purple-700 transition-all">
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

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
                <button className="flex cursor-pointer items-center px-3 py-2 text-gray-300 hover:text-white transition-all duration-300 hover:scale-105">
                  <Home className="w-4 h-4 mr-2" />
                  Home
                </button>
                <button className="flex cursor-pointer items-center px-3 py-2 text-gray-300 hover:text-white transition-all duration-300 hover:scale-105">
                  <Bot className="w-4 h-4 mr-2" />
                  Symptom Checker
                </button>
                <button className="flex cursor-pointer items-center px-3 py-2 text-gray-300 hover:text-white transition-all duration-300 hover:scale-105">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Dashboard
                </button>
                <button className="flex cursor-pointer items-center px-3 py-2 text-white bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-lg border border-white/20">
                  <Stethoscope className="w-4 h-4 mr-2" />
                  Find Doctors
                </button>
              </nav>
              
              <div className="flex items-center space-x-4">
                <button className="relative cursor-pointer p-2 text-gray-300 hover:text-white transition-colors">
                  <Bell className="w-5 h-5" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-pink-500 rounded-full animate-pulse"></div>
                </button>
                <button className="p-2 cursor-pointer text-gray-300 hover:text-white transition-colors">
                  <Settings className="w-5 h-5" />
                </button>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    A
                  </div>
                  <span className="text-sm font-medium text-white">Aayush</span>
                </div>
              </div>
              
              <button className="md:hidden cursor-pointer text-gray-300 hover:text-white">
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-full shadow-xl">
              <Stethoscope className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Find Your Perfect Doctor</h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Discover qualified healthcare professionals near you with verified credentials, 
            real patient reviews, and instant appointment booking.
          </p>
        </div>

        {/* Search and Filters */}
        <div 
          className="rounded-2xl shadow-xl p-6 mb-8 border"
          style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(16px)',
            borderColor: 'rgba(255, 255, 255, 0.2)',
          }}
        >
          <div className="grid lg:grid-cols-4 gap-4">
            {/* Location Search */}
            <div className="lg:col-span-2">
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Enter your location or area"
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/10 text-white placeholder-gray-400 border-white/20 backdrop-blur-sm"
                />
              </div>
            </div>

            {/* Specialization Filter */}
            <div className="relative">
              <select
                value={selectedSpecialization}
                onChange={(e) => setSelectedSpecialization(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white/10 text-white border-white/20 backdrop-blur-sm"
              >
                {specializations.map(spec => (
                  <option key={spec.id} value={spec.id} className="bg-slate-800 text-white">{spec.name}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-3 h-5 w-5 text-gray-400 pointer-events-none" />
            </div>

            {/* Rating Filter */}
            <div className="relative">
              <select
                value={selectedRating}
                onChange={(e) => setSelectedRating(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white/10 text-white border-white/20 backdrop-blur-sm"
              >
                <option value="all" className="bg-slate-800 text-white">All Ratings</option>
                <option value="4.5" className="bg-slate-800 text-white">4.5+ Stars</option>
                <option value="4.0" className="bg-slate-800 text-white">4.0+ Stars</option>
                <option value="3.5" className="bg-slate-800 text-white">3.5+ Stars</option>
              </select>
              <ChevronDown className="absolute right-3 top-3 h-5 w-5 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Quick Filters */}
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="text-sm font-medium text-gray-300 mr-2">Quick Filters:</span>
            {['Available Today', 'Verified Doctors', 'Online Consultation', 'Female Doctors'].map((filter) => (
              <button
                key={filter}
                className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm hover:bg-blue-500/30 transition-colors border border-blue-400/20"
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Map/List View */}
          <div className="lg:col-span-2">
            <div 
              className="rounded-2xl shadow-xl overflow-hidden border"
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(16px)',
                borderColor: 'rgba(255, 255, 255, 0.2)',
              }}
            >
              <div 
                className="p-4 border-b"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                }}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-white">
                    {filteredDoctors.length} Doctors Found
                  </h3>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setMapView(true)}
                      className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        mapView 
                          ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white' 
                          : 'bg-white/10 text-gray-300 hover:bg-white/20'
                      }`}
                    >
                      <MapIcon className="w-4 h-4 mr-1" />
                      Map
                    </button>
                    <button
                      onClick={() => setMapView(false)}
                      className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        !mapView 
                          ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white' 
                          : 'bg-white/10 text-gray-300 hover:bg-white/20'
                      }`}
                    >
                      <Users className="w-4 h-4 mr-1" />
                      List
                    </button>
                  </div>
                </div>
              </div>

              <div style={{ height: '600px' }}>
                {mapView ? (
                  <MapComponent />
                ) : (
                  <div className="p-4 h-full overflow-y-auto">
                    <div className="space-y-4">
                      {filteredDoctors.map((doctor) => (
                        <div 
                          key={doctor.id} 
                          className="border rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
                          style={{
                            background: 'rgba(255, 255, 255, 0.05)',
                            backdropFilter: 'blur(8px)',
                            borderColor: 'rgba(255, 255, 255, 0.1)',
                          }}
                        >
                          <div className="flex items-start space-x-4">
                            <div className="relative">
                              <img 
                                src={doctor.image} 
                                alt={doctor.name}
                                className="w-20 h-20 rounded-xl object-cover border-2 border-white/20"
                              />
                              {doctor.verified && (
                                <div className="absolute -top-2 -right-2 bg-green-500 rounded-full p-1">
                                  <CheckCircle className="w-4 h-4 text-white" />
                                </div>
                              )}
                            </div>

                            <div className="flex-1">
                              <div className="flex items-start justify-between mb-2">
                                <div>
                                  <h3 className="text-xl font-bold text-white mb-1">{doctor.name}</h3>
                                  <p className="text-gray-300 capitalize flex items-center">
                                    <span className={specializations.find(s => s.id === doctor.specialization)?.color}>
                                      {specializations.find(s => s.id === doctor.specialization)?.icon}
                                    </span>
                                    <span className="ml-1">{specializations.find(s => s.id === doctor.specialization)?.name}</span>
                                    <span className="mx-2 text-gray-500">•</span>
                                    <span>{doctor.experience} years exp.</span>
                                  </p>
                                </div>
                                <div className="text-right">
                                  <div className="flex items-center justify-end mb-1">
                                    <Star className="w-5 h-5 text-yellow-400 fill-current mr-1" />
                                    <span className="text-lg font-bold text-white">{doctor.rating}</span>
                                    <span className="text-sm text-gray-300 ml-1">({doctor.reviewCount})</span>
                                  </div>
                                  <div className="flex items-center text-gray-300">
                                    <DollarSign className="w-4 h-4 mr-1" />
                                    <span className="font-semibold">₹{doctor.consultationFee}</span>
                                  </div>
                                </div>
                              </div>

                              <div className="grid grid-cols-2 gap-4 mb-4">
                                <div className="flex items-center text-gray-300">
                                  <MapPin className="w-4 h-4 mr-2" />
                                  <div>
                                    <p className="font-medium text-white">{doctor.hospital}</p>
                                    <p className="text-sm">{doctor.location} • {doctor.distance}</p>
                                  </div>
                                </div>
                                <div className="flex items-center text-gray-300">
                                  <Clock className="w-4 h-4 mr-2" />
                                  <div>
                                    <p className="font-medium text-green-400">{doctor.availability}</p>
                                    <p className="text-sm">Next: {doctor.nextSlot}</p>
                                  </div>
                                </div>
                              </div>

                              <div className="flex items-center justify-between">
                                <div className="flex flex-wrap gap-1">
                                  {doctor.languages.map((lang, idx) => (
                                    <span key={idx} className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded text-xs border border-blue-400/20">
                                      {lang}
                                    </span>
                                  ))}
                                </div>
                                <div className="flex space-x-2">
                                  <button className="flex items-center px-3 py-2 border border-blue-500 text-blue-400 rounded-lg hover:bg-blue-500/10 transition-colors">
                                    <MessageCircle className="w-4 h-4 mr-1" />
                                    Chat
                                  </button>
                                  <button className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-colors">
                                    <Calendar className="w-4 h-4 mr-1" />
                                    Book Appointment
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Featured Specializations */}
            <div 
              className="rounded-2xl shadow-xl p-6 border"
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(16px)',
                borderColor: 'rgba(255, 255, 255, 0.2)',
              }}
            >
              <h3 className="text-lg font-bold text-white mb-4">Popular Specializations</h3>
              <div className="space-y-3">
                {specializations.slice(1, 6).map((spec) => (
                  <button
                    key={spec.id}
                    onClick={() => setSelectedSpecialization(spec.id)}
                    className={`w-full flex items-center p-3 rounded-lg transition-all ${
                      selectedSpecialization === spec.id
                        ? 'bg-blue-500/20 border-2 border-blue-400/40'
                        : 'bg-white/5 hover:bg-white/10 border-2 border-transparent'
                    }`}
                  >
                    <span className={spec.color}>{spec.icon}</span>
                    <span className="ml-3 font-medium text-white">{spec.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Health Tips */}
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-xl p-6 text-white border border-white/20">
              <div className="flex items-center mb-4">
                <Shield className="w-6 h-6 mr-3" />
                <h3 className="text-lg font-bold">Health Tip of the Day</h3>
              </div>
              <p className="text-blue-100 mb-4">
                Regular health checkups can prevent 80% of premature heart diseases and strokes. 
                Schedule your annual wellness exam today!
              </p>
              <button className="bg-white/20 text-white px-4 py-2 rounded-lg font-medium hover:bg-white/30 transition-colors backdrop-blur-sm">
                Learn More
              </button>
            </div>

            {/* Emergency Contacts */}
            <div 
              className="rounded-2xl shadow-xl p-6 border"
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(16px)',
                borderColor: 'rgba(255, 255, 255, 0.2)',
              }}
            >
              <div className="flex items-center mb-4">
                <Phone className="w-6 h-6 text-red-400 mr-3" />
                <h3 className="text-lg font-bold text-white">Emergency Contacts</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-red-500/20 rounded-lg border border-red-400/20">
                  <div>
                    <p className="font-medium text-white">Emergency Services</p>
                    <p className="text-sm text-gray-300">24/7 Available</p>
                  </div>
                  <a href="tel:102" className="bg-red-500 text-white px-3 py-1 rounded font-medium hover:bg-red-600 transition-colors">
                    102
                  </a>
                </div>
                <div className="flex items-center justify-between p-3 bg-blue-500/20 rounded-lg border border-blue-400/20">
                  <div>
                    <p className="font-medium text-white">Medical Emergency</p>
                    <p className="text-sm text-gray-300">Ambulance Service</p>
                  </div>
                  <a href="tel:108" className="bg-blue-500 text-white px-3 py-1 rounded font-medium hover:bg-blue-600 transition-colors">
                    108
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorFinderPage