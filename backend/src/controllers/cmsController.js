const inMemoryDb = require('../config/inMemoryDb');

// GET /api/cms/services
exports.getServices = (req, res) => {
  res.json(inMemoryDb.cms.services);
};

// GET /api/cms/testimonials
exports.getTestimonials = (req, res) => {
  res.json(inMemoryDb.cms.testimonials);
};

// GET /api/cms/faqs
exports.getFaqs = (req, res) => {
  res.json(inMemoryDb.cms.faqs);
};

// PUT /api/cms/services
exports.updateServices = (req, res) => {
  if (req.body.services) {
    inMemoryDb.cms.services = req.body.services;
  }
  res.json(inMemoryDb.cms.services);
};

// PUT /api/cms/testimonials
exports.updateTestimonials = (req, res) => {
  if (req.body.testimonials) {
    inMemoryDb.cms.testimonials = req.body.testimonials;
  }
  res.json(inMemoryDb.cms.testimonials);
};

// PUT /api/cms/faqs
exports.updateFaqs = (req, res) => {
  if (req.body.faqs) {
    inMemoryDb.cms.faqs = req.body.faqs;
  }
  res.json(inMemoryDb.cms.faqs);
};

// GET /api/cms/stats — Dashboard analytics
exports.getStats = (req, res) => {
  const totalDoctors = inMemoryDb.doctors.length;
  const totalPatients = inMemoryDb.users.filter(u => u.role === 'user').length;
  const totalAppointments = inMemoryDb.appointments.length;
  const pendingAppointments = inMemoryDb.appointments.filter(a => a.status === 'pending').length;
  const confirmedAppointments = inMemoryDb.appointments.filter(a => a.status === 'confirmed').length;
  const cancelledAppointments = inMemoryDb.appointments.filter(a => a.status === 'cancelled').length;
  const totalReviews = inMemoryDb.reviews.length;
  const totalContacts = inMemoryDb.contacts.length;

  // Specialty distribution
  const specialtyMap = {};
  inMemoryDb.doctors.forEach(d => {
    specialtyMap[d.specialization] = (specialtyMap[d.specialization] || 0) + 1;
  });

  // Appointment status distribution
  const statusMap = {};
  inMemoryDb.appointments.forEach(a => {
    statusMap[a.status] = (statusMap[a.status] || 0) + 1;
  });

  res.json({
    totalDoctors,
    totalPatients,
    totalAppointments,
    pendingAppointments,
    confirmedAppointments,
    cancelledAppointments,
    totalReviews,
    totalContacts,
    specialtyDistribution: Object.entries(specialtyMap).map(([name, count]) => ({ name, count })),
    appointmentStatusDistribution: Object.entries(statusMap).map(([name, count]) => ({ name, count }))
  });
};
