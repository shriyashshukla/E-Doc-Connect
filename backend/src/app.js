const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');

const doctorRoutes = require('./routes/doctorRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const userRoutes = require('./routes/userRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const contactRoutes = require('./routes/contactRoutes');
const cmsRoutes = require('./routes/cmsRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// --------------- Middleware ---------------
app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// --------------- API Routes ---------------
app.use('/api/doctors', doctorRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/users', userRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/cms', cmsRoutes);

// Base health-check
app.get('/', (req, res) => {
  res.json({
    message: 'E-Doc-Connect Backend API is running',
    version: '2.0.0',
    endpoints: ['/api/doctors', '/api/appointments', '/api/users', '/api/reviews', '/api/contact', '/api/cms']
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: `Route ${req.originalUrl} not found` });
});

// Global error handler
app.use(errorHandler);

module.exports = app;
