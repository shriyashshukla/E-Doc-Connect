import { Router } from 'express';
const router = Router();
import { create, find } from '../models/User';
import { create as _create, find as _find } from '../models/Doctor';
import { create as __create, find as __find } from '../models/Appointment';

// User Routes
router.post('/users', async (req, res) => {
    try {
        const user = await create(req.body);
        res.status(201).json(user);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.get('/users', async (req, res) => {
    try {
        const users = await find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Doctor Routes
router.post('/doctors', async (req, res) => {
    try {
        const doctor = await _create(req.body);
        res.status(201).json(doctor);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.get('/doctors', async (req, res) => {
    try {
        const doctors = await _find();
        res.json(doctors);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Appointment Routes
router.post('/appointments', async (req, res) => {
    try {
        const appointment = await __create(req.body);
        res.status(201).json(appointment);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.get('/appointments', async (req, res) => {
    try {
        const appointments = await __find();
        res.json(appointments);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;
