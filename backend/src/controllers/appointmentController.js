const Appointment = require('../models/appointmentModel');
const inMemoryDb = require('../config/inMemoryDb');

// Helper: populate in-memory appointment with patient/doctor objects
const populateMemory = (appt) => {
  const patient = inMemoryDb.users.find(u => u._id === appt.patient) || { _id: appt.patient, name: 'Unknown' };
  const doctor = inMemoryDb.doctors.find(d => d._id === appt.doctor) || { _id: appt.doctor, doctorName: 'Unknown' };
  return { ...appt, patient, doctor };
};

// GET /api/appointments
exports.getAllAppointments = async (req, res, next) => {
  const { patient, patientId, doctor, doctorId, status } = req.query;
  const patientFilter = patient || patientId;
  const doctorFilter = doctor || doctorId;

  if (global.useInMemoryDb) {
    let filtered = [...inMemoryDb.appointments];
    if (patientFilter) filtered = filtered.filter(a => a.patient === patientFilter);
    if (doctorFilter) filtered = filtered.filter(a => a.doctor === doctorFilter);
    if (status) filtered = filtered.filter(a => a.status === status);
    return res.json(filtered.map(populateMemory));
  }

  try {
    const filter = {};
    if (patientFilter) filter.patient = patientFilter;
    if (doctorFilter) filter.doctor = doctorFilter;
    if (status) filter.status = status;

    const appointments = await Appointment.find(filter)
      .populate('patient')
      .populate('doctor')
      .sort({ createdAt: -1 });
    res.json(appointments);
  } catch (err) {
    next(err);
  }
};

// GET /api/appointments/:id
exports.getAppointmentById = async (req, res, next) => {
  if (global.useInMemoryDb) {
    const appt = inMemoryDb.appointments.find(a => a._id === req.params.id);
    if (!appt) return res.status(404).json({ error: 'Appointment not found' });
    return res.json(populateMemory(appt));
  }

  try {
    const appt = await Appointment.findById(req.params.id).populate('patient').populate('doctor');
    if (!appt) return res.status(404).json({ error: 'Appointment not found' });
    res.json(appt);
  } catch (err) {
    next(err);
  }
};

// POST /api/appointments
exports.createAppointment = async (req, res, next) => {
  const { patient, patientId, doctor, doctorId, appointmentDate, appointmentTime, notes } = req.body;
  const patientRef = patient || patientId;
  const doctorRef = doctor || doctorId;

  if (global.useInMemoryDb) {
    const newAppt = {
      _id: 'appt_' + Date.now(),
      patient: patientRef,
      doctor: doctorRef,
      appointmentDate,
      appointmentTime,
      notes: notes || '',
      status: 'pending',
      createdAt: new Date()
    };
    inMemoryDb.appointments.push(newAppt);
    return res.status(201).json(populateMemory(newAppt));
  }

  try {
    const appt = new Appointment({ patient: patientRef, doctor: doctorRef, appointmentDate, appointmentTime, notes, status: 'pending' });
    const saved = await appt.save();
    const populated = await Appointment.findById(saved._id).populate('patient').populate('doctor');
    res.status(201).json(populated);
  } catch (err) {
    next(err);
  }
};

// PUT /api/appointments/:id
exports.updateAppointment = async (req, res, next) => {
  const { status, appointmentDate, appointmentTime, notes } = req.body;

  if (global.useInMemoryDb) {
    const idx = inMemoryDb.appointments.findIndex(a => a._id === req.params.id);
    if (idx === -1) return res.status(404).json({ error: 'Appointment not found' });

    const existing = inMemoryDb.appointments[idx];
    const updated = {
      ...existing,
      status: status || existing.status,
      appointmentDate: appointmentDate || existing.appointmentDate,
      appointmentTime: appointmentTime || existing.appointmentTime,
      notes: notes !== undefined ? notes : existing.notes
    };
    inMemoryDb.appointments[idx] = updated;
    return res.json(populateMemory(updated));
  }

  try {
    const updateData = {};
    if (status) updateData.status = status;
    if (appointmentDate) updateData.appointmentDate = appointmentDate;
    if (appointmentTime) updateData.appointmentTime = appointmentTime;
    if (notes !== undefined) updateData.notes = notes;

    const appt = await Appointment.findByIdAndUpdate(req.params.id, updateData, { new: true })
      .populate('patient')
      .populate('doctor');
    if (!appt) return res.status(404).json({ error: 'Appointment not found' });
    res.json(appt);
  } catch (err) {
    next(err);
  }
};

// DELETE /api/appointments/:id
exports.deleteAppointment = async (req, res, next) => {
  if (global.useInMemoryDb) {
    const idx = inMemoryDb.appointments.findIndex(a => a._id === req.params.id);
    if (idx === -1) return res.status(404).json({ error: 'Appointment not found' });
    inMemoryDb.appointments.splice(idx, 1);
    return res.json({ message: 'Appointment deleted successfully', id: req.params.id });
  }

  try {
    const appt = await Appointment.findByIdAndDelete(req.params.id);
    if (!appt) return res.status(404).json({ error: 'Appointment not found' });
    res.json({ message: 'Appointment deleted successfully', id: req.params.id });
  } catch (err) {
    next(err);
  }
};
