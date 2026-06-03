const mongoose = require('mongoose');
const User = require('../models/userModel');
const Doctor = require('../models/doctorModel');
const Appointment = require('../models/appointmentModel');
const Review = require('../models/reviewModel');
const ContactRequest = require('../models/contactModel');
const connectDB = require('../config/db');

const seedData = async () => {
  try {
    // Clear existing collections
    await User.deleteMany({});
    await Doctor.deleteMany({});
    await Appointment.deleteMany({});
    await Review.deleteMany({});
    await ContactRequest.deleteMany({});

    console.log('Cleared existing collections. Seeding fresh dummy data...');

    // 1. Create Users
    const admin = await User.create({
      name: 'Admin Shriyash',
      email: 'shriyash@gmail.com',
      phone: '+1 (555) 019-2834',
      gender: 'Male',
      address: '742 Evergreen Terrace, Healthcare City',
      role: 'admin',
      profileImage: 'default-patient.png'
    });

    const patient1 = await User.create({
      name: 'John Doe',
      email: 'john.doe@gmail.com',
      phone: '+1 (555) 123-4567',
      gender: 'Male',
      address: '123 Main St, Springfield',
      role: 'user',
      profileImage: 'default-patient.png'
    });

    const patient2 = await User.create({
      name: 'Jane Smith',
      email: 'jane.smith@gmail.com',
      phone: '+1 (555) 987-6543',
      gender: 'Female',
      address: '456 Elm St, Shelbyville',
      role: 'user',
      profileImage: 'default-patient.png'
    });

    console.log('Created Users.');

    // 2. Create Doctors
    const today = new Date().toISOString().split('T')[0];
    const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];
    const dayAfter = new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0];

    const doc1 = await Doctor.create({
      doctorName: 'Dr. Aisha Khan',
      specialization: 'Cardiology',
      experience: 12,
      qualification: 'MBBS, MD (Cardiology)',
      hospital: 'Metro Cardiac Institute',
      consultationFee: 150,
      bio: 'Dr. Aisha Khan is a leading cardiologist with over 12 years of experience. She specializes in interventional cardiology and preventative heart care.',
      profileImage: 'default-doctor.png',
      availability: [
        { date: today, timeSlots: ['09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM'] },
        { date: tomorrow, timeSlots: ['09:00 AM', '11:00 AM', '02:00 PM', '04:00 PM'] }
      ]
    });

    const doc2 = await Doctor.create({
      doctorName: 'Dr. Vikram Sharma',
      specialization: 'Pediatrics',
      experience: 8,
      qualification: 'MBBS, DCH (Pediatrics)',
      hospital: 'City Children Hospital',
      consultationFee: 100,
      bio: 'Dr. Vikram Sharma is dedicated to providing high-quality care for children from infancy through adolescence. Friendly and empathetic doctor.',
      profileImage: 'default-doctor.png',
      availability: [
        { date: today, timeSlots: ['10:00 AM', '11:30 AM', '01:00 PM', '03:30 PM'] },
        { date: dayAfter, timeSlots: ['09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM'] }
      ]
    });

    const doc3 = await Doctor.create({
      doctorName: 'Dr. Deepika Singh',
      specialization: 'Gynecology',
      experience: 15,
      qualification: 'MBBS, MS (Obstetrics & Gynecology)',
      hospital: 'Grace Women Hospital',
      consultationFee: 120,
      bio: 'Dr. Deepika Singh specializes in high-risk pregnancies, reproductive medicine, and general gynecological issues. A trusted womens wellness partner.',
      profileImage: 'default-doctor.png',
      availability: [
        { date: tomorrow, timeSlots: ['10:00 AM', '11:00 AM', '12:00 PM', '03:00 PM', '04:00 PM'] },
        { date: dayAfter, timeSlots: ['09:00 AM', '10:00 AM', '02:00 PM', '03:00 PM'] }
      ]
    });

    const doc4 = await Doctor.create({
      doctorName: 'Dr. Karthik Reddy',
      specialization: 'Neurology',
      experience: 10,
      qualification: 'MBBS, DM (Neurology)',
      hospital: 'Brain & Spine Care Center',
      consultationFee: 180,
      bio: 'Dr. Karthik Reddy treats complex neurological disorders, including stroke, migraines, epilepsy, and neuromuscular conditions with modern therapeutics.',
      profileImage: 'default-doctor.png',
      availability: [
        { date: today, timeSlots: ['02:00 PM', '03:00 PM', '04:00 PM'] },
        { date: tomorrow, timeSlots: ['09:30 AM', '10:30 AM', '11:30 AM'] }
      ]
    });

    console.log('Created Doctors.');

    // 3. Create Appointments
    await Appointment.create({
      patient: patient1._id,
      doctor: doc1._id,
      appointmentDate: today,
      appointmentTime: '10:00 AM',
      status: 'confirmed',
      notes: 'Routine cardiovascular check-up. Patient mentions mild shortness of breath during workouts.'
    });

    await Appointment.create({
      patient: patient1._id,
      doctor: doc2._id,
      appointmentDate: tomorrow,
      appointmentTime: '09:00 AM',
      status: 'pending',
      notes: 'Consultation for child flu symptoms.'
    });

    await Appointment.create({
      patient: patient2._id,
      doctor: doc3._id,
      appointmentDate: tomorrow,
      appointmentTime: '11:00 AM',
      status: 'confirmed',
      notes: 'Regular pregnancy check-up.'
    });

    console.log('Created Appointments.');

    // 4. Create Reviews
    await Review.create({
      patient: patient1._id,
      doctor: doc1._id,
      rating: 5,
      review: 'Dr. Aisha was extremely polite and explained my heart report details thoroughly. Highly recommended!'
    });

    await Review.create({
      patient: patient2._id,
      doctor: doc3._id,
      rating: 4,
      review: 'Great counseling and care at Grace Women Hospital. Dr. Deepika is very professional.'
    });

    console.log('Created Reviews.');

    // 5. Create Contact Request
    await ContactRequest.create({
      name: 'Sarah Connor',
      email: 'sarah.connor@gmail.com',
      phone: '+1 (555) 777-8888',
      message: 'Hello, I would like to inquire if you accept BlueShield health insurance for Dr. Aisha Khans appointments?'
    });

    console.log('Database seeded successfully.');
    
  } catch (error) {
    console.error('Error seeding database:', error.message);
  }
};

// Run if called directly
if (require.main === module) {
  connectDB().then(async () => {
    await seedData();
    mongoose.connection.close();
    process.exit(0);
  });
}

module.exports = seedData;
