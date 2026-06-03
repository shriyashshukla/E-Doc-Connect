const Review = require('../models/Review');

exports.list = async (req, res, next) => {
  try {
    const items = await Review.find().populate('patient doctor').limit(100);
    res.json(items);
  } catch (err) { next(err); }
};

exports.create = async (req, res, next) => {
  try {
    const r = new Review(req.body);
    await r.save();
    res.status(201).json(r);
  } catch (err) { next(err); }
};
