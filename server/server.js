const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // for parsing application/json

// Import routes
const supplierRoutes = require('./routes/supplierRoutes');
const startupRoutes = require('./routes/startupRoutes');
const postRoutes = require('./routes/postRoutes');
const requestRoutes = require('./routes/requestRoutes');
const authRoutes = require('./routes/authRoutes');
const supplierMaterialRoutes = require('./routes/supplierMaterialRoutes');

// Mount routes with prefixes
app.use('/api/suppliers', supplierRoutes);
app.use('/api/startups', startupRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/requests', requestRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/supplier/materials', require('./routes/supplierMaterialRoutes'));
app.use('/api/supplier-materials', supplierMaterialRoutes);


// Basic error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Server Error' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
