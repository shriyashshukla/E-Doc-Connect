const mongoose = require('mongoose');
const connectDB = require('./config/db');
const Doctor = require('./models/Doctor');
const User = require('./models/User');
const Appointment = require('./models/Appointment');

async function seed() {
  await connectDB();
  await Doctor.deleteMany();
  await User.deleteMany();
  await Appointment.deleteMany();

  const doc1 = await Doctor.create({ doctorName: 'Dr. Alice Smith', specialization: 'Cardiology', experience: 10, qualification: 'MD', hospital: 'City Hospital', consultationFee: 80, availability: ['Mon 10:00','Wed 14:00'], bio: 'Experienced cardiologist.' });
  const doc2 = await Doctor.create({ doctorName: 'Dr. Bob Lee', specialization: 'Dermatology', experience: 6, qualification: 'MBBS', hospital: 'Downtown Clinic', consultationFee: 50, availability: ['Tue 11:00','Thu 15:00'], bio: 'Skin specialist.' });

  const user = await User.create({ name: 'Jane Patient', email: 'jane@example.com', phone: '1234567890' });

  await Appointment.create({ patient: user._id, doctor: doc1._id, appointmentDate: new Date(), appointmentTime: '10:00', status: 'confirmed' });

  console.log('Seed completed');
  process.exit(0);
}

seed().catch(err => { console.error(err); process.exit(1); });
