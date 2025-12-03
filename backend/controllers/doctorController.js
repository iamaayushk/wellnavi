const Doctor = require('../models/Doctor');
const Appointment = require('../models/Appointment');

// @desc    Get all doctors with filters
// @route   GET /api/doctors
// @access  Public
exports.getDoctors = async (req, res) => {
  try {
    const { 
      specialization, 
      rating, 
      location, 
      maxDistance = 10000, // in meters
      verified,
      onlineConsultation,
      page = 1,
      limit = 10
    } = req.query;

    // Build query
    const query = {};
    
    if (specialization && specialization !== 'all') {
      query.specialization = specialization;
    }
    
    if (rating && rating !== 'all') {
      query.rating = { $gte: parseFloat(rating) };
    }
    
    if (verified === 'true') {
      query.verified = true;
    }
    
    if (onlineConsultation === 'true') {
      query.onlineConsultation = true;
    }

    // Location-based search
    if (location) {
      const [lng, lat] = location.split(',').map(Number);
      query['hospital.location'] = {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [lng, lat]
          },
          $maxDistance: parseInt(maxDistance)
        }
      };
    }

    // Execute query with pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const doctors = await Doctor.find(query)
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ rating: -1, reviewCount: -1 });

    const total = await Doctor.countDocuments(query);

    res.status(200).json({
      success: true,
      data: doctors,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit))
      }
    });

  } catch (error) {
    console.error('Get doctors error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching doctors',
      error: error.message
    });
  }
};

// @desc    Get single doctor
// @route   GET /api/doctors/:id
// @access  Public
exports.getDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    
    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: 'Doctor not found'
      });
    }

    res.status(200).json({
      success: true,
      data: doctor
    });

  } catch (error) {
    console.error('Get doctor error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching doctor',
      error: error.message
    });
  }
};

// @desc    Book appointment
// @route   POST /api/doctors/:id/book
// @access  Private
exports.bookAppointment = async (req, res) => {
  try {
    const { appointmentDate, timeSlot, type, reason, symptoms, notes } = req.body;
    const doctorId = req.params.id;

    // Validate doctor exists
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: 'Doctor not found'
      });
    }

    // Check if slot is available
    const existingAppointment = await Appointment.findOne({
      doctorId,
      appointmentDate,
      'timeSlot.startTime': timeSlot.startTime,
      status: { $nin: ['cancelled', 'completed'] }
    });

    if (existingAppointment) {
      return res.status(400).json({
        success: false,
        message: 'This time slot is already booked'
      });
    }

    // Create appointment
    const appointment = await Appointment.create({
      userId: req.user.id,
      doctorId,
      appointmentDate,
      timeSlot,
      type: type || 'in-person',
      reason,
      symptoms: symptoms || [],
      notes,
      amount: doctor.consultationFee,
      status: 'scheduled'
    });

    res.status(201).json({
      success: true,
      message: 'Appointment booked successfully',
      data: appointment
    });

  } catch (error) {
    console.error('Book appointment error:', error);
    res.status(500).json({
      success: false,
      message: 'Error booking appointment',
      error: error.message
    });
  }
};

// @desc    Get user appointments
// @route   GET /api/appointments
// @access  Private
exports.getUserAppointments = async (req, res) => {
  try {
    const { status, upcoming } = req.query;
    
    const query = { userId: req.user.id };
    
    if (status) {
      query.status = status;
    }
    
    if (upcoming === 'true') {
      query.appointmentDate = { $gte: new Date() };
    }

    const appointments = await Appointment.find(query)
      .populate('doctorId', 'name specialization hospital rating consultationFee profilePicture')
      .sort({ appointmentDate: 1 });

    res.status(200).json({
      success: true,
      data: appointments
    });

  } catch (error) {
    console.error('Get appointments error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching appointments',
      error: error.message
    });
  }
};

// @desc    Cancel appointment
// @route   PUT /api/appointments/:id/cancel
// @access  Private
exports.cancelAppointment = async (req, res) => {
  try {
    const { cancellationReason } = req.body;
    
    const appointment = await Appointment.findById(req.params.id);
    
    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found'
      });
    }

    // Check if user owns this appointment
    if (appointment.userId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to cancel this appointment'
      });
    }

    // Check if appointment can be cancelled
    if (appointment.status === 'completed' || appointment.status === 'cancelled') {
      return res.status(400).json({
        success: false,
        message: 'This appointment cannot be cancelled'
      });
    }

    appointment.status = 'cancelled';
    appointment.cancelledBy = 'user';
    appointment.cancellationReason = cancellationReason;
    appointment.paymentStatus = 'refunded';

    await appointment.save();

    res.status(200).json({
      success: true,
      message: 'Appointment cancelled successfully',
      data: appointment
    });

  } catch (error) {
    console.error('Cancel appointment error:', error);
    res.status(500).json({
      success: false,
      message: 'Error cancelling appointment',
      error: error.message
    });
  }
};

// @desc    Search doctors by location
// @route   POST /api/doctors/nearby
// @access  Public
exports.getNearbyDoctors = async (req, res) => {
  try {
    const { latitude, longitude, maxDistance = 10000, specialization } = req.body;

    const query = {
      'hospital.location': {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [longitude, latitude]
          },
          $maxDistance: maxDistance
        }
      }
    };

    if (specialization && specialization !== 'all') {
      query.specialization = specialization;
    }

    const doctors = await Doctor.find(query).limit(20);

    res.status(200).json({
      success: true,
      data: doctors,
      count: doctors.length
    });

  } catch (error) {
    console.error('Nearby doctors error:', error);
    res.status(500).json({
      success: false,
      message: 'Error finding nearby doctors',
      error: error.message
    });
  }
};
