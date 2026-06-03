const User = require('../models/User');

exports.list = async (req, res, next) => {
  try {
    const users = await User.find().limit(100);
    res.json(users);
  } catch (err) { next(err); }
};

exports.create = async (req, res, next) => {
  try {
    const u = new User(req.body);
    await u.save();
    res.status(201).json(u);
  } catch (err) { next(err); }
};
