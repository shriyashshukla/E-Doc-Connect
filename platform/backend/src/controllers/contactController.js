const Contact = require('../models/Contact');

exports.create = async (req, res, next) => {
  try {
    const c = new Contact(req.body);
    await c.save();
    res.status(201).json(c);
  } catch (err) { next(err); }
};

exports.list = async (req, res, next) => {
  try {
    const items = await Contact.find().limit(100);
    res.json(items);
  } catch (err) { next(err); }
};
