const Contact = require('../models/contactModel');
const inMemoryDb = require('../config/inMemoryDb');

// GET /api/contact
exports.getAllContacts = async (req, res, next) => {
  if (global.useInMemoryDb) {
    return res.json(inMemoryDb.contacts);
  }

  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (err) {
    next(err);
  }
};

// POST /api/contact
exports.createContact = async (req, res, next) => {
  const { name, email, phone, message } = req.body;

  if (global.useInMemoryDb) {
    const newContact = {
      _id: 'con_' + Date.now(),
      name,
      email,
      phone: phone || '',
      message,
      createdAt: new Date()
    };
    inMemoryDb.contacts.push(newContact);
    return res.status(201).json(newContact);
  }

  try {
    const contact = new Contact({ name, email, phone, message });
    const saved = await contact.save();
    res.status(201).json(saved);
  } catch (err) {
    next(err);
  }
};

// DELETE /api/contact/:id
exports.deleteContact = async (req, res, next) => {
  if (global.useInMemoryDb) {
    const idx = inMemoryDb.contacts.findIndex(c => c._id === req.params.id);
    if (idx === -1) return res.status(404).json({ error: 'Contact not found' });
    inMemoryDb.contacts.splice(idx, 1);
    return res.json({ message: 'Contact deleted', id: req.params.id });
  }

  try {
    const c = await Contact.findByIdAndDelete(req.params.id);
    if (!c) return res.status(404).json({ error: 'Contact not found' });
    res.json({ message: 'Contact deleted', id: req.params.id });
  } catch (err) {
    next(err);
  }
};
