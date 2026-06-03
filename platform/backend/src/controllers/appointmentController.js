const Appointment = require('../models/Appointment');

exports.list = async (req, res, next) => {
  try {
    const items = await Appointment.find().populate('patient doctor').limit(100);
    res.json(items);
  } catch (err) { next(err); }
};

exports.get = async (req, res, next) => {
  try {
    const item = await Appointment.findById(req.params.id).populate('patient doctor');
    if (!item) return res.status(404).json({ error: 'Not found' });
    res.json(item);
  } catch (err) { next(err); }
};

exports.create = async (req, res, next) => {
  try {
    const appt = new Appointment(req.body);
    await appt.save();
    res.status(201).json(appt);
  } catch (err) { next(err); }
};

exports.update = async (req, res, next) => {
  try {
    const a = await Appointment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(a);
  } catch (err) { next(err); }
};

exports.remove = async (req, res, next) => {
  try {
    await Appointment.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) { next(err); }
};
