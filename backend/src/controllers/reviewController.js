const Review = require('../models/reviewModel');
const inMemoryDb = require('../config/inMemoryDb');

// GET /api/reviews/doctor/:doctorId
exports.getDoctorReviews = async (req, res, next) => {
  const { doctorId } = req.params;

  if (global.useInMemoryDb) {
    const filtered = inMemoryDb.reviews.filter(r => r.doctor === doctorId);
    const populated = filtered.map(r => {
      const patient = inMemoryDb.users.find(u => u._id === r.patient) || { _id: r.patient, name: 'Anonymous' };
      return { ...r, patient };
    });
    return res.json(populated);
  }

  try {
    const reviews = await Review.find({ doctor: doctorId })
      .populate('patient', 'name profileImage')
      .sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    next(err);
  }
};

// GET /api/reviews — all reviews
exports.getAllReviews = async (req, res, next) => {
  if (global.useInMemoryDb) {
    const populated = inMemoryDb.reviews.map(r => {
      const patient = inMemoryDb.users.find(u => u._id === r.patient) || { _id: r.patient, name: 'Anonymous' };
      const doctor = inMemoryDb.doctors.find(d => d._id === r.doctor) || { _id: r.doctor, doctorName: 'Unknown' };
      return { ...r, patient, doctor };
    });
    return res.json(populated);
  }

  try {
    const reviews = await Review.find()
      .populate('patient', 'name profileImage')
      .populate('doctor', 'doctorName specialization')
      .sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    next(err);
  }
};

// POST /api/reviews
exports.createReview = async (req, res, next) => {
  const { patient, patientId, doctor, doctorId, rating, review } = req.body;
  const patientRef = patient || patientId;
  const doctorRef = doctor || doctorId;

  if (global.useInMemoryDb) {
    const newReview = {
      _id: 'rev_' + Date.now(),
      patient: patientRef,
      doctor: doctorRef,
      rating: Number(rating),
      review,
      createdAt: new Date()
    };
    inMemoryDb.reviews.push(newReview);
    const patientObj = inMemoryDb.users.find(u => u._id === patientRef) || { _id: patientRef, name: 'Anonymous' };
    return res.status(201).json({ ...newReview, patient: patientObj });
  }

  try {
    const newReview = new Review({ patient: patientRef, doctor: doctorRef, rating: Number(rating), review });
    const saved = await newReview.save();
    const populated = await Review.findById(saved._id).populate('patient', 'name profileImage');
    res.status(201).json(populated);
  } catch (err) {
    next(err);
  }
};
