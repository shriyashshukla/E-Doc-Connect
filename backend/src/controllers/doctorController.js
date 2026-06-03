const Doctor = require('../models/doctorModel');
const inMemoryDb = require('../config/inMemoryDb');

// GET /api/doctors
exports.getAllDoctors = async (req, res, next) => {
  const { search, specialization } = req.query;

  if (global.useInMemoryDb) {
    let filtered = [...inMemoryDb.doctors];
    if (search) {
      const s = search.toLowerCase();
      filtered = filtered.filter(d =>
        d.doctorName.toLowerCase().includes(s) ||
        d.specialization.toLowerCase().includes(s) ||
        d.hospital.toLowerCase().includes(s)
      );
    }
    if (specialization && specialization !== 'All') {
      filtered = filtered.filter(d => d.specialization === specialization);
    }
    return res.json(filtered);
  }

  try {
    const filter = {};
    if (search) {
      filter.$or = [
        { doctorName: { $regex: search, $options: 'i' } },
        { specialization: { $regex: search, $options: 'i' } },
        { hospital: { $regex: search, $options: 'i' } }
      ];
    }
    if (specialization && specialization !== 'All') {
      filter.specialization = specialization;
    }
    const doctors = await Doctor.find(filter).sort({ createdAt: -1 });
    res.json(doctors);
  } catch (err) {
    next(err);
  }
};

// GET /api/doctors/:id
exports.getDoctorById = async (req, res, next) => {
  if (global.useInMemoryDb) {
    const doctor = inMemoryDb.doctors.find(d => d._id === req.params.id);
    if (!doctor) return res.status(404).json({ error: 'Doctor not found' });
    return res.json(doctor);
  }

  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) return res.status(404).json({ error: 'Doctor not found' });
    res.json(doctor);
  } catch (err) {
    next(err);
  }
};

// POST /api/doctors
exports.createDoctor = async (req, res, next) => {
  const { doctorName, specialization, experience, qualification, hospital, consultationFee, bio, availability } = req.body;

  let parsedAvailability = [];
  if (availability) {
    try {
      parsedAvailability = typeof availability === 'string' ? JSON.parse(availability) : availability;
    } catch (e) {
      parsedAvailability = [];
    }
  }

  if (global.useInMemoryDb) {
    const newDoctor = {
      _id: 'doc_' + Date.now(),
      doctorName,
      specialization,
      experience: Number(experience),
      qualification,
      hospital,
      consultationFee: Number(consultationFee),
      bio: bio || 'No bio provided.',
      availability: parsedAvailability,
      profileImage: req.file ? req.file.filename : '',
      createdAt: new Date()
    };
    inMemoryDb.doctors.push(newDoctor);
    return res.status(201).json(newDoctor);
  }

  try {
    const doctor = new Doctor({
      doctorName,
      specialization,
      experience: Number(experience),
      qualification,
      hospital,
      consultationFee: Number(consultationFee),
      bio,
      availability: parsedAvailability,
      profileImage: req.file ? req.file.filename : ''
    });
    const saved = await doctor.save();
    res.status(201).json(saved);
  } catch (err) {
    next(err);
  }
};

// PUT /api/doctors/:id
exports.updateDoctor = async (req, res, next) => {
  const { doctorName, specialization, experience, qualification, hospital, consultationFee, bio, availability } = req.body;

  let parsedAvailability;
  if (availability) {
    try {
      parsedAvailability = typeof availability === 'string' ? JSON.parse(availability) : availability;
    } catch (e) { /* ignore */ }
  }

  if (global.useInMemoryDb) {
    const idx = inMemoryDb.doctors.findIndex(d => d._id === req.params.id);
    if (idx === -1) return res.status(404).json({ error: 'Doctor not found' });

    const existing = inMemoryDb.doctors[idx];
    const updated = {
      ...existing,
      doctorName: doctorName || existing.doctorName,
      specialization: specialization || existing.specialization,
      experience: experience !== undefined ? Number(experience) : existing.experience,
      qualification: qualification || existing.qualification,
      hospital: hospital || existing.hospital,
      consultationFee: consultationFee !== undefined ? Number(consultationFee) : existing.consultationFee,
      bio: bio || existing.bio
    };

    if (parsedAvailability !== undefined) updated.availability = parsedAvailability;
    if (req.file) updated.profileImage = req.file.filename;

    inMemoryDb.doctors[idx] = updated;
    return res.json(updated);
  }

  try {
    const updateData = {};
    if (doctorName) updateData.doctorName = doctorName;
    if (specialization) updateData.specialization = specialization;
    if (experience !== undefined) updateData.experience = Number(experience);
    if (qualification) updateData.qualification = qualification;
    if (hospital) updateData.hospital = hospital;
    if (consultationFee !== undefined) updateData.consultationFee = Number(consultationFee);
    if (bio) updateData.bio = bio;
    if (parsedAvailability !== undefined) updateData.availability = parsedAvailability;
    if (req.file) updateData.profileImage = req.file.filename;

    const doc = await Doctor.findByIdAndUpdate(req.params.id, updateData, { new: true, runValidators: true });
    if (!doc) return res.status(404).json({ error: 'Doctor not found' });
    res.json(doc);
  } catch (err) {
    next(err);
  }
};

// DELETE /api/doctors/:id
exports.deleteDoctor = async (req, res, next) => {
  if (global.useInMemoryDb) {
    const idx = inMemoryDb.doctors.findIndex(d => d._id === req.params.id);
    if (idx === -1) return res.status(404).json({ error: 'Doctor not found' });
    inMemoryDb.doctors.splice(idx, 1);
    return res.json({ message: 'Doctor deleted successfully', id: req.params.id });
  }

  try {
    const doc = await Doctor.findByIdAndDelete(req.params.id);
    if (!doc) return res.status(404).json({ error: 'Doctor not found' });
    res.json({ message: 'Doctor deleted successfully', id: req.params.id });
  } catch (err) {
    next(err);
  }
};
