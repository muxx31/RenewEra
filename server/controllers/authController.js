const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Supplier = require('../models/Supplier');
const Startup = require('../models/Startup');

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// Supplier signup
const supplierSignup = async (req, res) => {
  try {
    const { name, email, password, companyName, contactNumber, address, materialsSupplied } = req.body;
    let existing = await Supplier.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Email already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const supplier = new Supplier({
      name,
      email,
      password: hashedPassword,
      companyName,
      contactNumber,
      address,
      materialsSupplied,
    });
    await supplier.save();

    const token = jwt.sign({ id: supplier._id, role: 'supplier' }, JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({ token, user: { id: supplier._id, name: supplier.name, email: supplier.email, role: 'supplier' } });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Startup signup
const startupSignup = async (req, res) => {
  try {
    const { name, email, password, founderName, contactNumber, address, industry } = req.body;
    let existing = await Startup.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Email already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const startup = new Startup({
      name,
      email,
      password: hashedPassword,
      founderName,
      contactNumber,
      address,
      industry,
    });
    await startup.save();

    const token = jwt.sign({ id: startup._id, role: 'startup' }, JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({ token, user: { id: startup._id, name: startup.name, email: startup.email, role: 'startup' } });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Login for both
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Try supplier first
    let user = await Supplier.findOne({ email });
    let role = 'supplier';

    // If not supplier, try startup
    if (!user) {
      user = await Startup.findOne({ email });
      role = 'startup';
    }

    if (!user) return res.status(400).json({ message: 'Invalid email or password' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid email or password' });

    const token = jwt.sign({ id: user._id, role }, JWT_SECRET, { expiresIn: '7d' });

    res.json({ token, user: { id: user._id, name: user.name, email: user.email, role } });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  supplierSignup,
  startupSignup,
  login,
};
