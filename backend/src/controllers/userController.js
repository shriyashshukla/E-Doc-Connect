const User = require('../models/userModel');
const inMemoryDb = require('../config/inMemoryDb');

// GET /api/users
exports.getAllUsers = async (req, res, next) => {
  const { search, role } = req.query;

  if (global.useInMemoryDb) {
    let filtered = [...inMemoryDb.users];
    if (search) {
      const s = search.toLowerCase();
      filtered = filtered.filter(u => u.name.toLowerCase().includes(s) || u.email.toLowerCase().includes(s));
    }
    if (role) filtered = filtered.filter(u => u.role === role);
    return res.json(filtered);
  }

  try {
    const filter = {};
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }
    if (role) filter.role = role;
    const users = await User.find(filter).sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    next(err);
  }
};

// GET /api/users/:id
exports.getUserById = async (req, res, next) => {
  if (global.useInMemoryDb) {
    const user = inMemoryDb.users.find(u => u._id === req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    return res.json(user);
  }

  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    next(err);
  }
};

// PUT /api/users/:id
exports.updateUser = async (req, res, next) => {
  const { name, email, phone, gender, address } = req.body;

  if (global.useInMemoryDb) {
    const idx = inMemoryDb.users.findIndex(u => u._id === req.params.id);
    if (idx === -1) return res.status(404).json({ error: 'User not found' });

    const existing = inMemoryDb.users[idx];
    const updated = {
      ...existing,
      name: name || existing.name,
      email: email || existing.email,
      phone: phone || existing.phone,
      gender: gender || existing.gender,
      address: address || existing.address
    };
    if (req.file) updated.profileImage = req.file.filename;
    inMemoryDb.users[idx] = updated;
    return res.json(updated);
  }

  try {
    const updateData = {};
    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (phone) updateData.phone = phone;
    if (gender) updateData.gender = gender;
    if (address) updateData.address = address;
    if (req.file) updateData.profileImage = req.file.filename;

    const user = await User.findByIdAndUpdate(req.params.id, updateData, { new: true, runValidators: true });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    next(err);
  }
};

// POST /api/users/mock-auth — Mock authentication for development
exports.mockAuth = async (req, res, next) => {
  const { email } = req.body;

  if (global.useInMemoryDb) {
    let user = inMemoryDb.users.find(u => u.email === email);
    if (!user) {
      const name = email.split('@')[0];
      user = {
        _id: 'user_' + Date.now(),
        name: name.charAt(0).toUpperCase() + name.slice(1),
        email,
        phone: '',
        gender: 'Male',
        address: '',
        role: email === 'shriyash@gmail.com' ? 'admin' : 'user',
        profileImage: '',
        createdAt: new Date()
      };
      inMemoryDb.users.push(user);
    }
    return res.json(user);
  }

  try {
    let user = await User.findOne({ email });
    if (!user) {
      const name = email.split('@')[0];
      user = await User.create({
        name: name.charAt(0).toUpperCase() + name.slice(1),
        email,
        role: email === 'shriyash@gmail.com' ? 'admin' : 'user'
      });
    }
    res.json(user);
  } catch (err) {
    next(err);
  }
};
