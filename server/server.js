const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const path = require('path');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// CORS middleware
app.use(cors({
  origin: 'http://localhost:5173', // React app URL
  credentials: true,
}));

// Parse JSON for other routes
app.use(express.json());

// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Import routes
const supplierRoutes = require('./routes/supplierRoutes');
const startupRoutes = require('./routes/startupRoutes');
const requestRoutes = require('./routes/requestRoutes');
const authRoutes = require('./routes/authRoutes');
const supplierMaterialRoutes = require('./routes/materialRoutes');

// Mount routes
app.use('/api/suppliers', supplierRoutes);
app.use('/api/startups', startupRoutes);
app.use('/api/requests', requestRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/supplier-materials', supplierMaterialRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Server Error' });
});

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
