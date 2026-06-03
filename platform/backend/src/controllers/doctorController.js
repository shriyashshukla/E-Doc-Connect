const Doctor = require('../models/Doctor');

exports.listDoctors = async (req, res, next) => {
  try {
    const docs = await Doctor.find().limit(50);
    res.json(docs);
  } catch (err) { next(err); }
};

exports.getDoctor = async (req, res, next) => {
  try {
    const doc = await Doctor.findById(req.params.id);
    if (!doc) return res.status(404).json({ error: 'Doctor not found' });
    res.json(doc);
  } catch (err) { next(err); }
};

exports.createDoctor = async (req, res, next) => {
  try {
    const doctor = new Doctor(req.body);
    await doctor.save();
    res.status(201).json(doctor);
  } catch (err) { next(err); }
};

exports.updateDoctor = async (req, res, next) => {
  try {
    const doc = await Doctor.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(doc);
  } catch (err) { next(err); }
};

exports.deleteDoctor = async (req, res, next) => {
  try {
    await Doctor.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) { next(err); }
};
