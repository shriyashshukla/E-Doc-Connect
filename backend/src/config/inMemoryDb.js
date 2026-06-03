const today = new Date().toISOString().split('T')[0];
const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];
const dayAfter = new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0];
const dayAfter2 = new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0];

const inMemoryDb = {
  users: [
    {
      _id: 'user_admin',
      name: 'Admin Shriyash',
      email: 'shriyash@gmail.com',
      phone: '+1 (555) 019-2834',
      gender: 'Male',
      address: '742 Evergreen Terrace, Healthcare City',
      role: 'admin',
      profileImage: '',
      createdAt: new Date()
    },
    {
      _id: 'user_patient1',
      name: 'John Doe',
      email: 'john.doe@gmail.com',
      phone: '+1 (555) 123-4567',
      gender: 'Male',
      address: '123 Main St, Springfield',
      role: 'user',
      profileImage: '',
      createdAt: new Date()
    },
    {
      _id: 'user_patient2',
      name: 'Jane Smith',
      email: 'jane.smith@gmail.com',
      phone: '+1 (555) 987-6543',
      gender: 'Female',
      address: '456 Elm St, Shelbyville',
      role: 'user',
      profileImage: '',
      createdAt: new Date()
    },
    {
      _id: 'user_patient3',
      name: 'Robert Wilson',
      email: 'robert.wilson@gmail.com',
      phone: '+1 (555) 456-7890',
      gender: 'Male',
      address: '789 Oak Ave, Capital City',
      role: 'user',
      profileImage: '',
      createdAt: new Date()
    }
  ],

  doctors: [
    {
      _id: 'doc_1',
      doctorName: 'Dr. Aisha Khan',
      specialization: 'Cardiology',
      experience: 12,
      qualification: 'MBBS, MD (Cardiology)',
      hospital: 'Metro Cardiac Institute',
      consultationFee: 150,
      bio: 'Dr. Aisha Khan is a leading cardiologist with over 12 years of experience. She specializes in interventional cardiology and preventative heart care, helping patients achieve optimal cardiovascular health.',
      profileImage: '',
      availability: [
        { date: today, timeSlots: ['09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM'] },
        { date: tomorrow, timeSlots: ['09:00 AM', '11:00 AM', '02:00 PM', '04:00 PM'] },
        { date: dayAfter, timeSlots: ['10:00 AM', '11:00 AM', '03:00 PM'] }
      ],
      createdAt: new Date()
    },
    {
      _id: 'doc_2',
      doctorName: 'Dr. Vikram Sharma',
      specialization: 'Pediatrics',
      experience: 8,
      qualification: 'MBBS, DCH (Pediatrics)',
      hospital: 'City Children Hospital',
      consultationFee: 100,
      bio: 'Dr. Vikram Sharma is dedicated to providing high-quality care for children from infancy through adolescence. Known for his friendly and empathetic approach to young patients.',
      profileImage: '',
      availability: [
        { date: today, timeSlots: ['10:00 AM', '11:30 AM', '01:00 PM', '03:30 PM'] },
        { date: dayAfter, timeSlots: ['09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM'] }
      ],
      createdAt: new Date()
    },
    {
      _id: 'doc_3',
      doctorName: 'Dr. Deepika Singh',
      specialization: 'Gynecology',
      experience: 15,
      qualification: 'MBBS, MS (Obstetrics & Gynecology)',
      hospital: 'Grace Women Hospital',
      consultationFee: 120,
      bio: 'Dr. Deepika Singh specializes in high-risk pregnancies, reproductive medicine, and general gynecological issues. A trusted women\'s wellness partner with 15 years of experience.',
      profileImage: '',
      availability: [
        { date: tomorrow, timeSlots: ['10:00 AM', '11:00 AM', '12:00 PM', '03:00 PM', '04:00 PM'] },
        { date: dayAfter, timeSlots: ['09:00 AM', '10:00 AM', '02:00 PM', '03:00 PM'] }
      ],
      createdAt: new Date()
    },
    {
      _id: 'doc_4',
      doctorName: 'Dr. Karthik Reddy',
      specialization: 'Neurology',
      experience: 10,
      qualification: 'MBBS, DM (Neurology)',
      hospital: 'Brain & Spine Care Center',
      consultationFee: 180,
      bio: 'Dr. Karthik Reddy treats complex neurological disorders including stroke, migraines, epilepsy, and neuromuscular conditions with modern therapeutics and cutting-edge technology.',
      profileImage: '',
      availability: [
        { date: today, timeSlots: ['02:00 PM', '03:00 PM', '04:00 PM'] },
        { date: tomorrow, timeSlots: ['09:30 AM', '10:30 AM', '11:30 AM'] }
      ],
      createdAt: new Date()
    },
    {
      _id: 'doc_5',
      doctorName: 'Dr. Priya Mehta',
      specialization: 'Dermatology',
      experience: 9,
      qualification: 'MBBS, MD (Dermatology)',
      hospital: 'SkinCare Advanced Clinic',
      consultationFee: 130,
      bio: 'Dr. Priya Mehta is a board-certified dermatologist specializing in cosmetic dermatology, acne treatment, and skin cancer screening. She combines medical expertise with aesthetic sensibility.',
      profileImage: '',
      availability: [
        { date: today, timeSlots: ['09:00 AM', '10:00 AM', '11:00 AM', '01:00 PM'] },
        { date: tomorrow, timeSlots: ['10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM'] },
        { date: dayAfter2, timeSlots: ['09:00 AM', '11:00 AM'] }
      ],
      createdAt: new Date()
    },
    {
      _id: 'doc_6',
      doctorName: 'Dr. Arjun Patel',
      specialization: 'Orthopedics',
      experience: 14,
      qualification: 'MBBS, MS (Orthopedics)',
      hospital: 'Joint & Bone Specialty Hospital',
      consultationFee: 160,
      bio: 'Dr. Arjun Patel is a renowned orthopedic surgeon with expertise in joint replacement, sports injuries, and spinal disorders. He has performed over 3000 successful surgeries.',
      profileImage: '',
      availability: [
        { date: today, timeSlots: ['10:00 AM', '11:00 AM', '02:00 PM'] },
        { date: dayAfter, timeSlots: ['09:00 AM', '10:00 AM', '11:00 AM', '03:00 PM'] }
      ],
      createdAt: new Date()
    }
  ],

  appointments: [
    {
      _id: 'appt_1',
      patient: 'user_patient1',
      doctor: 'doc_1',
      appointmentDate: today,
      appointmentTime: '10:00 AM',
      status: 'confirmed',
      notes: 'Routine cardiovascular check-up. Patient mentions mild shortness of breath during workouts.',
      createdAt: new Date()
    },
    {
      _id: 'appt_2',
      patient: 'user_patient1',
      doctor: 'doc_2',
      appointmentDate: tomorrow,
      appointmentTime: '09:00 AM',
      status: 'pending',
      notes: 'Consultation for child flu symptoms and vaccination schedule.',
      createdAt: new Date()
    },
    {
      _id: 'appt_3',
      patient: 'user_patient2',
      doctor: 'doc_3',
      appointmentDate: tomorrow,
      appointmentTime: '11:00 AM',
      status: 'confirmed',
      notes: 'Regular pregnancy check-up. Third trimester follow-up.',
      createdAt: new Date()
    },
    {
      _id: 'appt_4',
      patient: 'user_patient3',
      doctor: 'doc_4',
      appointmentDate: today,
      appointmentTime: '02:00 PM',
      status: 'confirmed',
      notes: 'Follow-up for recurring migraine treatment.',
      createdAt: new Date()
    },
    {
      _id: 'appt_5',
      patient: 'user_patient2',
      doctor: 'doc_5',
      appointmentDate: dayAfter,
      appointmentTime: '09:00 AM',
      status: 'pending',
      notes: 'Skin rash evaluation and allergy testing.',
      createdAt: new Date()
    }
  ],

  reviews: [
    {
      _id: 'rev_1',
      patient: 'user_patient1',
      doctor: 'doc_1',
      rating: 5,
      review: 'Dr. Aisha was extremely polite and explained my heart report details thoroughly. Highly recommended for anyone with cardiac concerns!',
      createdAt: new Date()
    },
    {
      _id: 'rev_2',
      patient: 'user_patient2',
      doctor: 'doc_3',
      rating: 4,
      review: 'Great counseling and care at Grace Women Hospital. Dr. Deepika is very professional and made me feel comfortable throughout.',
      createdAt: new Date()
    },
    {
      _id: 'rev_3',
      patient: 'user_patient3',
      doctor: 'doc_4',
      rating: 5,
      review: 'Dr. Karthik is an exceptional neurologist. He diagnosed my condition accurately and the treatment plan has been very effective.',
      createdAt: new Date()
    },
    {
      _id: 'rev_4',
      patient: 'user_patient1',
      doctor: 'doc_6',
      rating: 4,
      review: 'Had a great experience with Dr. Arjun for my knee issue. Very thorough examination and clear explanation of treatment options.',
      createdAt: new Date()
    }
  ],

  contacts: [
    {
      _id: 'con_1',
      name: 'Sarah Connor',
      email: 'sarah.connor@gmail.com',
      phone: '+1 (555) 777-8888',
      message: 'Hello, I would like to inquire if you accept BlueShield health insurance for Dr. Aisha Khan\'s appointments?',
      createdAt: new Date()
    },
    {
      _id: 'con_2',
      name: 'Mike Johnson',
      email: 'mike.j@gmail.com',
      phone: '+1 (555) 333-4444',
      message: 'Can I book an appointment for my elderly mother who has mobility issues? Do you offer home visits?',
      createdAt: new Date()
    }
  ],

  // CMS content for homepage
  cms: {
    services: [
      { _id: 'svc_1', title: 'Cardiology', description: 'Expert heart care with advanced diagnostic and treatment facilities.', icon: 'heart' },
      { _id: 'svc_2', title: 'Pediatrics', description: 'Comprehensive healthcare for infants, children, and adolescents.', icon: 'baby' },
      { _id: 'svc_3', title: 'Gynecology', description: 'Complete women\'s health services from adolescence through menopause.', icon: 'female' },
      { _id: 'svc_4', title: 'Neurology', description: 'Diagnosis and treatment of nervous system disorders.', icon: 'brain' },
      { _id: 'svc_5', title: 'Dermatology', description: 'Skin care solutions including cosmetic and medical dermatology.', icon: 'skin' },
      { _id: 'svc_6', title: 'Orthopedics', description: 'Bone and joint care, sports medicine, and surgical treatments.', icon: 'bone' }
    ],
    testimonials: [
      { _id: 'test_1', name: 'Maria Garcia', role: 'Patient', text: 'E-DocConnect made it incredibly easy to find the right specialist. The booking process was seamless and the doctor was excellent!', rating: 5 },
      { _id: 'test_2', name: 'David Chen', role: 'Patient', text: 'I was able to book an appointment within minutes. The platform is intuitive and the doctors are top-notch professionals.', rating: 5 },
      { _id: 'test_3', name: 'Lisa Thompson', role: 'Patient', text: 'Finally a healthcare platform that respects my time. Quick booking, friendly doctors, and great follow-up care.', rating: 4 }
    ],
    faqs: [
      { _id: 'faq_1', question: 'How do I book an appointment?', answer: 'Browse our doctor directory, select your preferred doctor, choose an available time slot, and confirm your booking. It takes less than 2 minutes!' },
      { _id: 'faq_2', question: 'Can I cancel or reschedule my appointment?', answer: 'Yes, you can cancel or reschedule your appointment from your dashboard at any time before the scheduled date.' },
      { _id: 'faq_3', question: 'Is my medical information secure?', answer: 'Absolutely. We use industry-standard encryption and comply with healthcare data protection regulations to keep your information safe.' },
      { _id: 'faq_4', question: 'Do you accept insurance?', answer: 'We work with most major insurance providers. Please contact us or check with your specific doctor for insurance acceptance details.' },
      { _id: 'faq_5', question: 'How can I contact support?', answer: 'You can reach our support team through the Contact page, by email at support@edocconnect.com, or by calling our 24/7 helpline.' }
    ]
  }
};

module.exports = inMemoryDb;
